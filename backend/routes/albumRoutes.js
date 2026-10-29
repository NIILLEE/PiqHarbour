/* Shariff Muhammad u23611732 */

const express = require('express');
const router = express.Router();

const {
    getAllAlbums,
    getAlbumById,
    getAlbumsByUser,
    getAlbumsByPost,
    createAlbum,
    updateAlbum,
    deleteAlbum,
    addPostToAlbum,
    removePostFromAlbum,
} = require('../controllers/albumController');

router.get('/', getAllAlbums);
router.get('/user/:userId', getAlbumsByUser);
router.get('/post/:postId', getAlbumsByPost);
router.get('/:id', getAlbumById);
router.post('/', createAlbum);
router.put('/:id', updateAlbum);
router.delete('/:id', deleteAlbum);
router.post('/:id/posts', addPostToAlbum);
router.delete('/:id/posts/:postId', removePostFromAlbum);

module.exports = router;

