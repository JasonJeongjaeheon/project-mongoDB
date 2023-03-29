import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    post_id: {
        type: String,
        required: true
    },
    like_users: {
        type: Array
    }
})

mongoose.model('Like', likeSchema).updateMany({}, { $set: { isAdmin: false } }).exec();

export default mongoose.model('Like', likeSchema)