const express = require('express');
const router = express.Router();
const {
    getAllPosts, 
    addPost,
    getAPost,
    updatePost,
} = require('../controller/post.js');

router.route('/').get(getAllPosts).post(addPost);
router.route('/:id').get(getAPost).patch(updatePost);

module.exports = router;

