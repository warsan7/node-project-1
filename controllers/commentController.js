const Comment = require('../models/Comment');

// Create comment API
exports.createComment = async (req, res) => {
    try {
        const { body, post, author } = req.body;
        const comment = new Comment({ body, post, author });
        await comment.save();
        res.status(201).json(comment);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all comments API
exports.getComments = async (req, res) => {
    try {
        const comments = await Comment.find()
            .populate('author', 'name email')
            .populate('post', 'title body author');
        res.json(comments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Get comments API
exports.getCommentsByPost = async (req, res) => {
    try {
        const { postId } = req.params;
        const comments = await Comment.find({ post: postId })
            .populate('author', 'name email')
            .sort({ createdAt: -1 });
        res.json(comments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};