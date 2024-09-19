const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// GET all posts
router.get('/', async (req, res) => {
   try {
      const posts = await Post.find();
      res.json(posts);
   } catch (err) {
      res.status(500).json({ message: err.message });
   }
});

// GET a single post by ID
router.get('/:id', async (req, res) => {
   try {
      const post = await Post.findById(req.params.id);
      if (post == null) {
         return res.status(404).json({ message: 'Post not found' });
      }
      res.json(post);
   } catch (err) {
      res.status(500).json({ message: err.message });
   }
});

// CREATE a new post
router.post('/', async (req, res) => {
   const post = new Post({
      title: req.body.title,
      content: req.body.content,
   });
   try {
      const newPost = await post.save();
      res.status(201).json(newPost);
   } catch (err) {
      res.status(400).json({ message: err.message });
   }
});

// UPDATE a post by ID
router.put('/:id', async (req, res) => {
   try {
      const post = await Post.findById(req.params.id);
      if (post == null) {
         return res.status(404).json({ message: 'Post not found' });
      }

      post.title = req.body.title || post.title;
      post.content = req.body.content || post.content;

      const updatedPost = await post.save();
      res.json(updatedPost);
   } catch (err) {
      res.status(400).json({ message: err.message });
   }
});

// DELETE a post by ID
router.delete('/:id', async (req, res) => {
   try {
      const post = await Post.findById(req.params.id);
      if (post == null) {
         return res.status(404).json({ message: 'Post not found' });
      }

      await post.remove();
      res.json({ message: 'Post deleted' });
   } catch (err) {
      res.status(500).json({ message: err.message });
   }
});

module.exports = router;
