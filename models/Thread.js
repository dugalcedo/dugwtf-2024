import { Schema, model } from "mongoose"
import schemes from "./schemes.js"
import { PostSchema } from "./Post.js"

const ThreadSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    ...schemes.avld,
    posts: {
        type: [PostSchema],
        default: []
    }
},
{
    timestamps: true
})

const Thread = model('thread', ThreadSchema, 'threads')

export {
    Thread,
    ThreadSchema
}