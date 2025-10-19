import mongoose from "mongoose";

const userSchema = new mongoose.schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    phoneNo: {
        type: Number,
        required: true,
        trim: true,
        length: 10,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    confirmPsd: {
        type: String, 
        required: true
    },
    profilePic: {
        type: String,
        default: ''
    },
    token: {
        type: String
    }
});

const User = mongoose.model("User", userSchema);

export default User;