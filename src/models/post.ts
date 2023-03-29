import mongoose from "mongoose";

const koreanTime = new Date();

const postSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    user_email: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image_url: {
        type: String,
        required: true
    },
    post_date: {
        type: Date,
        default: koreanTime.setUTCHours(koreanTime.getUTCHours() + 9)
    }
})

mongoose.model('Post', postSchema).updateMany({}, { $set: { isAdmin: false } }).exec();

export default mongoose.model('Post', postSchema)