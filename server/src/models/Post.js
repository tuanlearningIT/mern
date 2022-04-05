import mongoose from "mongoose";

const Schema = mongoose.Schema

const PostSchema = new Schema({
    title: {
        type: String,
        required: true,

    },
    description: {
        type: String,

    },
    url: {
        type: String,
    },
    status: {
        type: String,
        enum: ['TO LEARN', 'LEARNING', 'LEARNED']
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
})

module.exports = mongoose.model('posts', PostSchema)
