import { generateToken } from "../lib/utils.js"
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import cloudinary from "../lib/cloudinary.js"

export const login = async (req,res)=>{
    try {
    const {email,password} = req.body
    const user  = await User.findOne({email})
    if(!user){
        return res.status(400).json({message: "invalid email"})
    }
    const isCorrectPassword = bcrypt.compare(password,user.password)
    if(!isCorrectPassword){
        return res.status(400).json({message: "invalid password"})
    }
    generateToken(user._id,res)
    return res.status(200).json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        profilePic: user.profilePic
    })
}
    catch (error) {
        return res.status(500).json({message: "Server error"})
    }
}

export const signup = async (req,res)=>{
    const {fullName,email,password} = req.body
    try {
        if(email==='' || fullName === ''){
            return res.status(400).json({message: "All fields are required"})
        }
        if(password.length < 6){
            return res.status(400).json({message: "password should be more than 6"})
        }
        const user  = await User.findOne({email})
        if(user){
            return res.status(400).json({message:"Email already exists"})
        }
        else{
            const hashedPassword = await bcrypt.hash(password,10)
            const newUser = new User({
                email: email,
                fullName: fullName,
                password: hashedPassword
            })

            if(newUser){
                generateToken(newUser._id,res)
                await newUser.save()
                return res.status(201).json({message:{
                    id: newUser._id,
                    fullName: newUser.fullName,
                    email: newUser.email,
                    password: newUser.password
                }})
            }
            else{
                return res.status(400).json({
                    message: "Invalid user data"
                })
            }
        }
    } catch (error) {
        return res.status(500).json({message: "Server Error"})
    }
    
}

export const logout = (req,res)=>{
    try {
        res.cookie('jwt','',{maxAge:0})
        res.status(200).json({message:"User logged out"})
    } catch (error) {
        res.status(500).json({message:  "Server Error"})
    }
}

export const updateProfile = async (req,res)=>{
    try {
        const {profilePic} = req.body
        const userID = req.user._id
        if(!profilePic){
            return res.status(400).json({message: "Profile pic is required"})
        }
        const uploadedResponse = await cloudinary.uploader.upload(profilePic)
        const updatedUser = await User.findByIdAndUpdate(userID,{profilePic: uploadedResponse.secure_url},{new: true})
        return res.status(200).json(updatedUser)
    } catch (error) {
        return es.status(500).json({message: "internal server error"}) 
    }
}

export const checkAuth = (req,res)=>{
    try {
        res.status(200).json(req.user)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal Server Error"})
    }
}