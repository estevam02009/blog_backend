const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { authenticate, isAdmin } = require('../middleware/auth');

router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPost);

// Protected routes
router.post('/', authenticate, isAdmin, postController.createPost);
router.put('/:id', authenticate, isAdmin, postController.updatePost);
router.delete('/:id', authenticate, isAdmin, postController.deletePost);

module.exports = router;