'use strict';

const express = require('express');
const router = express.Router();

const { Comment } = require('../models/index');

router.get('/comment', getAllComments);
router.get('/comment/:id', getOneComment);
router.post('/comment', addComment);
router.put('/comment/:id', updateComment);
router.delete('/comment/:id', deleteComment);


async function getAllComments(req, res) {
    let comment = await Comment.read();
    res.status(200).json({
        comment
    });
}

async function getOneComment(req, res) {
    const id = req.params.id;
    let comment = await Comment.read(id);
    res.status(200).json(comment);
}

async function addComment(req, res) {
    let newComment = req.body;
    let comment = await Comment.create(newComment);
    res.status(201).json(comment);
}

async function updateComment(req, res) {
    let id = req.params.id;
    const obj = req.body;

    const updatedComment = await Comment.update(id, obj);

    res.status(202).json("Comment Updated Successfully");
}

async function deleteComment(req, res) {
    const id = req.params.id;
    let deletedComment = await Comment.delete(id);
    res.status(204).json("Comment Deleted Successfully");
}

module.exports = router;
