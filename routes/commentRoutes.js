const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

// POST /api/comments
router.post('/', commentController.createComment);

// GET /api/comments
router.get('/', commentController.getComments);

// GET /api/comments/post/:postId
router.get('/post/:postId', commentController.getCommentsByPost);


module.exports = router;