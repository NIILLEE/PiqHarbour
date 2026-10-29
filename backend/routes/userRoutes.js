// Shariff Muhammad u23611732

const express = require('express');
const router = express.Router();

const {
    getUserById,
    updateUser,
    sendFriendRequest,
    acceptFriendRequest,
    declineFriendRequest,
    unfriend,
} = require('../controllers/userController');


router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.post('/:id/friend-requests/:targetId', sendFriendRequest);
router.post('/:id/friend-requests/:requesterId/accept', acceptFriendRequest);
router.delete('/:id/friend-requests/:requesterId', declineFriendRequest);
router.delete('/:id/friends/:friendId', unfriend);

module.exports = router;