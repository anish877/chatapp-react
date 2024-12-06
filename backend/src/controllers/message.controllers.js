import cloudinary from "../lib/cloudinary.js"
import { getReceiverSocketId, io } from "../lib/socket.js"
import Message from "../models/message.model.js"
import User from "../models/user.model.js"

export const getUsersForSideBar = async (req,res)=>{
    try {
        const loggedInUserID = req.user._id
        const filteredUsers = await User.find({_id:{$ne:loggedInUserID}}).select("-password")
        res.status(200).json(filteredUsers)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal Server Error"})
    }
}

export const getMessages = async (req,res)=>{
    try {
        const myId = req.user._id
        const senderId = req.params.id
        const messages = await Message.find({$or:[
            {senderId:myId,receiverId:senderId},{senderId:senderId, receiverId:myId}
        ]})
        res.status(200).json(messages) 
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal Server Error"})
    }

}

export const sendMessage = async (req,res)=>{
    try {
        const {text,image} = req.body
        const senderId = req.user._id
        const receiverId = req.params.id
        let imageURL
        if(image){
            const uploadedResponse = await cloudinary.uploader.upload(image)
            imageURL = uploadedResponse.secure_url
        }
        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageURL
        })
        await newMessage.save()

        const receiverSocketId = getReceiverSocketId(receiverId)
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage",newMessage)
        }

        res.status(200).json(newMessage)
    } catch (error) {
        res.status(500).json({message:"Server error"})
    }
}