/* Shariff Muhammad u23611732 */

const Album = require('../models/Album');

async function getAllAlbums(req, res){
    
    try {
        const albums = await Album.find()
            .populate('owner', 'username avatarUrl')
            .populate('posts', 'imageUrl')
            .sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            albums
        });
    } catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        });
    }

}

async function getAlbumById(req, res){

    try {
        const album = await Album.findById(req.params.id)
            .populate('owner', 'username avatarUrl')
            .populate('posts');
        
        if (!album){
            return res.status(404).json({
                success: false,
                message: 'Album not found.'
            });
        }

        res.status(200).json({
            success: true,
            album
        });
    } catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        });
    }

}

async function getAlbumsByUser(req, res){

    try {
        const albums = await Album.find({ owner: req.params.userId })
            .populate('posts', 'imageUrl')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            albums
        });
    } catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        });
    }

}

async function createAlbum(req, res){

    try {
        const { owner, name, description, hashtags } = req.body;
        const newAlbum = await Album.create({
            owner,
            name,
            description,
            hashtags
        });

        res.status(201).json({
            success: true,
            album: newAlbum
        });
    } catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        });
    }

}

async function updateAlbum(req, res){

    try {
        const { name, description, hashtags } = req.body;
        const updatedAlbum = await Album.findByIdAndUpdate(
            req.params.id,
            { name, description, hashtags },
            { new: true }
        );

        if (!updatedAlbum){
            return res.status(404).json({
                success: false,
                message: 'Album not found.'
            });
        }

        res.status(200).json({
            success: true,
            album: updatedAlbum
        });
    } catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        });
    }

}

async function deleteAlbum(req, res){

    try {
        const deletedAlbum = await Album.findByIdAndDelete(req.params.id);

        if (!deletedAlbum){
            return res.status(404).json({
                success: false,
                message: 'Album not found.'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Album deleted successfully.'
        });
    } catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        });
    }

}

async function addPostToAlbum(req, res){

    try {
        const { postId } = req.body;
        const album = await Album.findById(req.params.id);

        if (!album){
            return res.status(404).json({
                success: false,
                message: 'Album not found.'
            });
        }

        if (!album.posts.includes(postId)){
            album.posts.push(postId);
            await album.save();
        }

        res.status(200).json({
            success: true,
            album
        });
    } catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        });
    }

}

async function removePostFromAlbum(req, res){

    try {
        const album = await Album.findById(req.params.id);

        if (!album){
            return res.status(404).json({
                success: false,
                message: 'Album not found.'
            });
        }

        album.posts = album.posts.filter((p) => p.toString() !== req.params.postId);
        await album.save();

        res.status(200).json({
            success: true,
            album
        });
    } catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        });
    }

}

async function getAlbumsByPost(req, res){

  try {
    const albums = await Album.find({ posts: req.params.postId })
      .populate('owner', 'username')
      .select('name owner');
    res.status(200).json({ 
        success: 
        true, albums 
    });
  } catch (err) {
    res.status(500).json({ 
        success: false, 
        message: err.message 
    });
  }

}

module.exports = {

    getAllAlbums,
    getAlbumById,
    getAlbumsByUser,
    createAlbum,
    updateAlbum,
    deleteAlbum,
    addPostToAlbum,
    removePostFromAlbum,
    getAlbumsByPost

};