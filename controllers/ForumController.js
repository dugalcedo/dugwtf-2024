import { Router } from "express"
import { Thread } from "../models/Thread.js"
import { Post } from "../models/Post.js"
import { serverError } from "../lib/util.js"

const ForumController = Router()

ForumController.post('/post', async (req, res) => {
    const {
        authorId,
        replyTo,
        content,
        threadId
    } = req.body

    try { // to create post
        var post = new Post({content, authorId, replyTo})
    } catch (error) {
        serverError(req, res, error, "Could not create post.")
    }

    try { // to save post
        await post.save()
        res.send("Post created")
    } catch (error) {
        serverError(req, res, error, "Could not save post.")
    }
})

export default ForumController