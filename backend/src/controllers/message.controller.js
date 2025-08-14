import User from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js";
import Message from "../models/message.model.js";
import mongoose from "mongoose";

export const getUsersForSidebar = async (req, res) => {
    try {
        const userId = req.user._id;
        const users = await User.find({ _id: { $ne: userId } }).select('-password');
        res.status(200).json(users);
    } catch (error) {
        console.log('Error in getUsersForSidebar', error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getMessages = async (req, res) => {
    try {
        let loggedInUserId = req.user._id;
        let { id: receiverUserId } = req.params;

        const messages = await Message.find({
            $or: [
                {
                    senderId: loggedInUserId,
                    receiverId: receiverUserId
                },
                {
                    senderId: receiverUserId,
                    receiverId: loggedInUserId
                }
            ]
        });

        return res.status(200).json(messages);
    } catch (error) {
        console.log('Error in getMessages', error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const sendMessage = async (req, res) => {
    try {
        const { image, text } = req.body;
        const senderId = req.user._id;
        const { id: receiverId } = req.params;

        let imageUrl;
        if (image) {
            const upladerResponse = await cloudinary.uploader.upload(image);
            imageUrl = upladerResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl
        });

        await newMessage.save();

        //todo : realtime functionality goes here => soket.io

        return res.status(200).json(newMessage);

    } catch (error) {
        console.log('Error in sendMessage', error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
