/* Shariff Muhammad u23611732 */

const Post = require('../models/Post');
const Album = require('../models/Album');
const User = require('../models/User');

const MAX_ITEMS = 50;

async function getFeed(req, res){

  try {

    const { userId, scope = 'local', sort = 'newest' } = req.query;

    let ownerFilter = {};

    if (scope === 'local'){
      const user = await User.findById(userId).select('friends');
      if (!user){
        return res.status(404).json({ 
            success: false, 
            message: 'User not found.' 
        });
      }
      ownerFilter = { owner: { $in: [user._id, ...user.friends] } };
    }

    const [posts, albums] = await Promise.all([
      Post.find(ownerFilter)
        .populate('owner', 'username fullName avatarUrl')
        .populate('comments.user', 'username')
        .lean(),
      Album.find(ownerFilter)
        .populate('owner', 'username fullName avatarUrl')
        .populate('posts', 'imageUrl')
        .lean(),
    ]);

    const postItems = posts.map((post) => ({
      type: 'post',
      date: post.createdAt,
      post: {
        _id: post._id,
        owner: post.owner,
        imageUrl: post.imageUrl,
        description: post.description,
        hashtags: post.hashtags,
        createdAt: post.createdAt,
        comments: post.comments.slice(-2),
        commentCount: post.comments.length,
        reportCount: post.reports.length,
      },
    }));

    const albumItems = albums.map((album) => ({
      type: 'album',
      date: album.createdAt,
      album,
    }));

    const popularity = (item) => (item.type === 'post' ? item.post.commentCount : 0);

    const items = [...postItems, ...albumItems]
      .sort((a, b) => {
        if (sort === 'comments' && popularity(b) !== popularity(a)) {
          return popularity(b) - popularity(a);
        }
        return new Date(b.date) - new Date(a.date);
      })
      .slice(0, MAX_ITEMS);

    res.status(200).json({ 
        success: true, items 
    });
  } catch (err) {
    res.status(500).json({ 
        success: false, 
        message: err.message 
    });
  }
  
}

module.exports = { getFeed };