/* Shariff Muhammad u23611732 */

const Post = require('../models/Post');
const fs = require('fs');
const path = require('path');
const Album = require('../models/Album');
const Reason = require('../models/Reason');

async function getAllPosts(req, res){

    try {
        const posts = await Post.find()
            .populate('owner', 'username avatarUrl')
            .sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            posts
        });
    } catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        });
    }

}

async function getPostById(req, res){

    try {
        const post = await Post.findById(req.params.id)
            .populate('owner', 'username avatarUrl')
            .populate('comments.user', 'username avatarUrl');
        
        if (!post){
            return res.status(404).json({
                success: false,
                message: 'Post not found.'
            });
        }

        res.status(200).json({
            success: true,
            post
        });
    } catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        });
    }

}

async function getPostsByUser(req, res){

    try {
        const posts = await Post.find({ owner: req.params.userId })
            .populate('owner', 'username avatarUrl')
            .sort({ createdAt: -1 });
        
        res.status(200).json({
            success: true,
            posts
        });
    } catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        });
    }

}

async function createPost(req, res) {

  try {
    const { owner, description } = req.body;

    if (!req.file){
      return res.status(400).json({ 
        success: false,
        message: 'An image is required.'
      });
    }

    let hashtags = [];

    if (req.body.hashtags){
      try {
        hashtags = JSON.parse(req.body.hashtags);
      } catch {
        hashtags = [];
      }
    }

    const newPost = await Post.create({
      owner,
      imageUrl: `/uploads/${req.file.filename}`,
      description,
      hashtags,
    });

    res.status(201).json({ 
        success: true, 
        post: newPost 
    });
  } catch (err) {
    res.status(500).json({ 
        success: false, 
        message: err.message 
    });
  }

}

async function updatePost(req, res){

    try {
        const { description, hashtags } = req.body;

        const updatePost = await Post.findByIdAndUpdate(
            req.params.id,
            { description, hashtags },
            { new: true }
        );

        if (!updatePost){
            return res.status(404).json({
                success: false,
                message: 'Post not found.'
            });
        }

        res.status(200).json({
            success: true,
            post: updatePost
        });
    } catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        });
    }

}

async function deletePost(req, res){

  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);

    if (!deletedPost){
      return res.status(404).json({
        success: false, 
        message: 'Post not found.' 
      });
    }

    await Album.updateMany({ posts: deletedPost._id }, { $pull: { posts: deletedPost._id } });

    if (deletedPost.imageUrl.startsWith('/uploads/')) {
      fs.unlink(path.join(__dirname, '..', deletedPost.imageUrl), () => {});
    }

    res.status(200).json({
        success: true, 
        message: 'Post deleted.' 
    });
  } catch (err) {
    res.status(500).json({ 
        success: false, 
        message: err.message 
    });
  }

}

async function addComment(req, res){

    try {
        const { user, text } = req.body;
        const post = await Post.findById(req.params.id);

        if (!post){
            return res.status(404).json({
                success: false,
                message: 'Post not found.'
            });
        }

        post.comments.push({ user, text });
        await post.save();

        res.status(201).json({
            success: true,
            post
        });
    } catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        });
    }

}

async function reportPost(req, res){

  try {
    const { user, reason } = req.body;
    const post = await Post.findById(req.params.id);

    if (!post){
      return res.status(404).json({ 
        success: false, 
        message: 'Post not found.' 
      });
    }

    if (post.owner.toString() === user){
      return res.status(400).json({ 
        success: false, 
        message: 'You cannot report your own post.' 
      });
    }

    if (post.reports.some((r) => r.user.toString() === user)){
      return res.status(400).json({ 
        success: false, 
        message: 'You have already reported this post.' 
      });
    }

    const validReason = await Reason.findOne({ label: reason });

    if (!validReason){
      return res.status(400).json({ 
        success: false, 
        message: 'Please choose a valid reason.' 
      });
    }

    post.reports.push({ user, reason });
    await post.save();

    res.status(201).json({ 
        success: true, 
        message: 'Post reported.' 
    });
  } catch (err) {
    res.status(500).json({ 
        success: false, 
        message: err.message 
    });
  }

}

module.exports = {

    getAllPosts,
    getPostById,
    getPostsByUser,
    createPost,
    updatePost,
    deletePost,
    addComment,
    reportPost

};
