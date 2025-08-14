import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema({
    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    receiverId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    text: {
        type: String,
    },
    image:{
        type: String,
    }

}, {timestamps: true});

// const Messsage = 
export default mongoose.model('Message', messageSchema);