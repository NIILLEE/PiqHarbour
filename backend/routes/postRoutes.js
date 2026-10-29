/* Shariff Muhammad u23611732 */

const express = require('express');
const router = express.Router();

const uploadImage = require('../middleware/upload');

const {
    getAllPosts,
    getPostById,
    getPostsByUser,
    createPost,
    updatePost,
    deletePost,
    addComment,
    reportPost
} = require('../controllers/postController');

router.get('/', getAllPosts);
router.get('/user/:userId', getPostsByUser);
router.get('/:id', getPostById);
router.post('/', uploadImage, createPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);
router.post('/:id/comments', addComment);
router.post('/:id/report', reportPost);

module.exports = router;

