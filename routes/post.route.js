'use strict';

const express = require('express');
const router = express.Router();

const { Post } = require('../models/index');

router.get('/post', getAllPosts);
router.get('/post/:id', getOnePost);
router.post('/post', addPost);
router.put('/post/:id', updatePost);
router.delete('/post/:id', deletePost);


async function getAllPosts(req, res) {
    let post = await Post.findAll();
    res.status(200).json({
        post
    });
}

async function getOnePost(req, res) {
    const id = req.params.id;
    let post = await Post.findOne({
        where: { id: id }
    });
    res.status(200).json(post);
}

async function addPost(req, res) {
    let newPost = req.body;
    let post = await Post.create(newPost);
    res.status(201).json(post);
}

async function updatePost(req, res) {
    let id = req.params.id;
    const obj = req.body;

    let post = await Post.findOne({
        where: { id: id }
    });

    const updatedPost = await post.update(obj);

    // // another way for updating 
    // const updatedPost = Post.update(
    //     obj,
    //     {where: {id: id}}
    // )

    res.status(200).json(updatedPost)
}

async function deletePost(req, res) {
    const id = req.params.id;
    let deletedPost = await Post.destroy({
        where: { id: id }
    });
    res.status(204).json({deletedPost})
}

module.exports = router;