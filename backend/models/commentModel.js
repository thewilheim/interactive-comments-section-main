import mongoose from 'mongoose'

const replySchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    score:{
        type: Number,
        required: true,
        default: 0
    },
    content:{
        type: String,
        required: true
    },
    replyingTo:{
        type: String,
        required: true,
    }
},{timestamps: true})

const commentSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"User"
    },
    content:{
        type: String,
        required: true
    },
    replies: [replySchema],
    score: {
        type: Number,
        required: true,
        default: 0
    }
},{timestamps:true})

const Comment = mongoose.model("Comment",commentSchema)

export default Comment