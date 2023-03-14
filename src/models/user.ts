import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    profile_image: String,
    social_id: {
        type: Number
    },
    social_type_id: {
        type: Number
    }
})

export default mongoose.model('User', userSchema)