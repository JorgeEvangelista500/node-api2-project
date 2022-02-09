// implement your posts router here
const { Router } = require('express');

const Post = require('./posts-model');

const postRouter = Router();

postRouter.get('/',(req, res) => {
    Post.find(req.query)
        .then(posts => {
            console.log(posts)
            res.status(200).json(posts)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                message: "The posts information could not be retrieved",
            })
        })
})

postRouter.get('/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            if (post) {
                res.status(200).json(post)
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist" })
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "The post information could not be retrieved"
            })
        })
})

postRouter.get('/', (req, res) => {
    Post.add(req.body)
        .then(post => {
            res.status(201).json({post})
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "There was an error while saving the post to the database",
            })
        })
})
postRouter.put('/:id', (req, res) => {
    const changes = req.body;
    Post.update(req.params.id, changes)
        .then(post => {
            if(post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({message: "The post with the specified ID does not exist"})
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "The post information could not be modified",
            })
        })
})

postRouter.delete('/:id', (req, res) => {
    Post.remove(req.params.id)
        .then(post => {
                if(post > 0) {
                    res.status(200).json({ message: 'The adopter has been deleted' })
                } else {
                    res.status(404).json({ message: "The post with the specified ID does not exist" })
                }
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({
                    message: "The post could not be removed"
                })
            })
})

postRouter.get('./:id/comments', (req, res) => {
    Post.findById(req.params.id)
        .then(comment => {
            if (comment.length > 0) {
                res.status(200).json(comment)
            } else {
                res.status(404).json({  message: "The post with the specified ID does not exist"})
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "The comments information could not be retrieved"
            })
        })
})

module.exports = postRouter;