import mongoose from "mongoose";

const koreanTime = new Date();

const commentSchema = new mongoose.Schema({
    post_id: {
        type: String,
        required: true
    },
    user_id: {
        type: String
    },
    comment: {
        type: String,
        length: 500
    },
    comment_date: {
        type: Date,
        default: koreanTime.setUTCHours(koreanTime.getUTCHours() + 9)
    }
})

mongoose.model('Comment', commentSchema).updateMany({}, { $set: { isAdmin: false } }).exec();

export default mongoose.model('Comment', commentSchema)