/* Shariff Muhammad u23611732 */

const User = require('../models/User');

async function signup(req, res){
    
    try {
        const { username, email, password } = req.body;
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });

        if (existingUser){
            return res.status(400).json({ 
                success: false,
                message: 'Username or email address already exist!'
            });
        }

        const newUser = await User.create({ username, email, password });
        const { password: _pw, ...safeUser } = newUser.toObject();

        res.status(201).json({
            success: true,
            message: 'Account created successfully.',
            user: safeUser,
        });
    } catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        });
    }

}

async function login(req, res){

    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || user.password !== password){
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password.'
            });
        }

        const { password: _pw, ...safeUser } = user.toObject();

        res.status(200).json({
            success: true,
            message: 'Logged in successfully.',
            user: safeUser,
        });
    } catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        });
    }

}

module.exports = { signup, login };