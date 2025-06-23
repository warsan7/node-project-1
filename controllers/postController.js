const Post = require('../models/Post');

// Create a new post
exports.createPost = async (req, res) => {
    try {
        const { title, body, author } = req.body;
        const post = new Post({ title, body, author });
        await post.save();
        res.status(201).json(post);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all posts
exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('author', 'email name') // populate() is used to automatically include author details from the User collection.
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};