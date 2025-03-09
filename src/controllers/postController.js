const Post = require('../models/Post');

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate('author', 'username email')
            .populate('categories', 'name')
            .sort({ createdAt: -1 });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createPost = async (req, res) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        author: req.user.id,
        categories: req.body.categories
    });

    try {
        const newPost = await post.save();
        await newPost.populate('author', 'username email');
        await newPost.populate('categories', 'name');
        res.status(201).json(newPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        if (req.body.title) post.title = req.body.title;
        if (req.body.content) post.content = req.body.content;
        if (req.body.categories) post.categories = req.body.categories;

        const updatedPost = await post.save();
        await updatedPost.populate('author', 'username email');
        await updatedPost.populate('categories', 'name');
        res.json(updatedPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post) {
            res.json(post);
        } else {
            res.status(404).json({ message: 'Post não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post) {
            post.title = req.body.title || post.title;
            post.content = req.body.content || post.content;
            post.author = req.body.author || post.author;

            const updatedPost = await post.save();
            res.json(updatedPost);
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post) {
            await Post.findByIdAndDelete(req.params.id);
            res.json({ message: 'Post deletado' });
        } else {
            res.status(404).json({ message: 'Post não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};