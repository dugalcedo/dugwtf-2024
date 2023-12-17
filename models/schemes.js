import { Schema } from "mongoose"

const schemes = {}

schemes.vld = {
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    },
    views: {
        type: Number,
        default: 0
    }
}

schemes.authorId = {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
}

schemes.avld = {
    authorId: schemes.authorId,
    ...schemes.vld
}

export default schemes