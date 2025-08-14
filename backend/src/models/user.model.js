import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        require: true,
        minlength: 6
    },
    profilePic: {
        type: String,
        default: ''
    }
}, {timestamps: true});

export default mongoose.model('User', userSchema);