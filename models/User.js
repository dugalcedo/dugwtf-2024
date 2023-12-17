import {Schema, model} from 'mongoose'
const UserSchema = new Schema({
    u: {
        type: String,
        unique: true,
        required: true
    },
    p: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user',
        enum: {
            values: ['admin', 'user', 'mod']
        }
    }
}, {
    timestamps: true
})
const User = model("user", UserSchema, "users")
export {
    UserSchema,
    User
}