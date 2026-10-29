// Shariff Muhammad u23611732

const User = require('../models/User');

async function getUserById(req, res){

    try {
        const user = await User.findById(req.params.id)
            .select('-password')
            .populate('friends', 'username fullName avatarUrl')
            .populate('friendRequests', 'username fullName avatarUrl');
        if (!user){
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            user
        });
    } catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        });
    }

}

async function updateUser(req, res){

    try {
        const { username, fullName, bio, avatarUrl, links } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { username, fullName, bio, avatarUrl, links },
            { new: true, runValidators: true }
        ).select('-password');

        if (!updatedUser){
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            user: updatedUser
        })
    } catch(err){
        if (err.code === 11000){
            return res.status(400).json({
                success: false,
                message: 'Username already exists'
            });
        }
        
        res.status(500).json({
            success: false,
            message: err.message
        });
    }

}

async function sendFriendRequest(req, res){

    try {
        const { id, targetId } = req.params;

        if (id === targetId){
            return res.status(400).json({
                success: false,
                message: 'You cannot send a friend request to yourself.'
            });
        }

        const target = await User.findById(targetId);

        if (!target){
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        if (target.friends.includes(id)){
            return res.status(400).json({
                success: false,
                message: 'You are already friends with this user.'
            });
        }

        if (target.friendRequests.includes(id)){
            return res.status(400).json({
                success: false,
                message: 'Already sent a friend request to this user.'
            });
        }

        target.friendRequests.push(id);
        await target.save();

        res.status(200).json({
            success: true,
            message: 'Friend request sent successfully.'
        });
    } catch (err){
        res.status(500).json({
            success: false,
            message: err.message
        });
    }

}

async function acceptFriendRequest(req, res){

    try {
        const { id, requesterId } = req.params;
        const user = await User.findById(id);
        const requester = await User.findById(requesterId);

        if (!user || !requester){
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        if (!user.friendRequests.includes(requesterId)){
            return res.status(400).json({
                success: false,
                message: 'No friend request from this user.'
            });
        }

        user.friendRequests = user.friendRequests.filter((r) => r.toString() !== requesterId);

        if (!user.friends.includes(requesterId)){
            user.friends.push(requesterId);
        }

        if (!requester.friends.includes(id)){
            requester.friends.push(id);
        }

        await user.save();
        await requester.save();

        res.status(200).json({
            success: true,
            message: 'Friend request accepted.'
        });
    } catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
    
}

async function declineFriendRequest(req, res){

    try {
        const { id, requesterId } = req.params;
        const user = await User.findById(id);

        if (!user){
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        user.friendRequests = user.friendRequests.filter((r) => r.toString() !== requesterId);
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Friend request declined.'
        });
    } catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        });
    }

}

async function unfriend(req, res){

    try {
        const { id, friendId } = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        if (!user || !friend){
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        user.friends = user.friends.filter((f) => f.toString() !== friendId);
        friend.friends = friend.friends.filter((f) => f.toString() !== id);

        await user.save();
        await friend.save();

        res.status(200).json({
            success: true,
            message: 'Unfriended successfully.'
        });
    } catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        });
    }

}

module.exports = {
    getUserById,
    updateUser,
    sendFriendRequest,
    acceptFriendRequest,
    declineFriendRequest,
    unfriend,
};