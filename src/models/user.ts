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
        minlength: 5
    },
    profile_image: {
        type: String
    },
    social_id: {
        type: Number
    },
    social_type_id: {
        type: Number
    },
    isAdmin: { 
        type: Boolean, 
        default: false 
    }
})

mongoose.model('User', userSchema).updateMany({}, { $set: { isAdmin: false } }).exec();

export default mongoose.model('User', userSchema)