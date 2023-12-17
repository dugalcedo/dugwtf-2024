import { Schema, model } from "mongoose"
import schemes from "./schemes.js"

const PostSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    hidden: {
        type: Boolean,
        default: false
    },
    replies: {
        type: [Schema.Types.ObjectId],
        ref: 'post'
    },
    ...schemes.avld
}, {
    timestamps: true
})
const Post = model('post', PostSchema, 'posts')

export {
    Post,
    PostSchema
}