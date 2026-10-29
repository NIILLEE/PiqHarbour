/* Shariff Muhammad 23611732 */

const User = require('../models/User');
const Post = require('../models/Post');
const Album = require('../models/Album');

const LIMIT = 30;

function escapeRegex(text){

  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

}

async function findHashtags(pattern){

  const countTags = (Model) =>
    Model.aggregate([
      { $unwind: '$hashtags' },
      { $match: { hashtags: pattern } },
      { $group: { _id: '$hashtags', count: { $sum: 1 } } },
    ]);

  const [postTags, albumTags] = await Promise.all([countTags(Post), countTags(Album)]);

  const counts = {};
  [...postTags, ...albumTags].forEach(({ _id, count }) => {
    const tag = _id.replace(/^#+/, '');
    counts[tag] = (counts[tag] || 0) + count;
  });

  return Object.entries(counts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, LIMIT);

}

async function search(req, res){

  try {
    const q = (req.query.q || '').trim();
    if (!q) {
      return res.status(400).json({ success: false, message: 'Please enter a search term.' });
    }

    if (q.startsWith('#')){
      const tag = q.replace(/^#+/, '').toLowerCase();
      if (!tag){
        return res.status(400).json({ success: false, message: 'Please enter a search term.' });
      }

      const tagFilter = { hashtags: { $in: [tag, `#${tag}`] } };

      const [posts, albums] = await Promise.all([
        Post.find(tagFilter)
          .populate('owner', 'username avatarUrl')
          .sort({ createdAt: -1 })
          .limit(LIMIT),
        Album.find(tagFilter)
          .populate('owner', 'username avatarUrl')
          .populate('posts', 'imageUrl')
          .sort({ createdAt: -1 })
          .limit(LIMIT),
      ]);

      return res.status(200).json({
        success: true,
        users: [],
        posts,
        albums,
        hashtags: [{ tag, count: posts.length + albums.length }],
      });

    }

    const pattern = new RegExp(escapeRegex(q), 'i');

    const [users, posts, albums, hashtags] = await Promise.all([
      User.find({ $or: [{ username: pattern }, { fullName: pattern }, { email: pattern }] })
        .select('username fullName avatarUrl') 
        .limit(LIMIT),
      Post.find({ description: pattern })
        .populate('owner', 'username avatarUrl')
        .sort({ createdAt: -1 })
        .limit(LIMIT),
      Album.find({ $or: [{ name: pattern }, { description: pattern }] })
        .populate('owner', 'username avatarUrl')
        .populate('posts', 'imageUrl')
        .sort({ createdAt: -1 })
        .limit(LIMIT),
      findHashtags(pattern),
    ]);

    res.status(200).json({ success: true, users, posts, albums, hashtags });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
  
}

module.exports = { search };