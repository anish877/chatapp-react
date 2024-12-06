import mongoose from "mongoose"

export const connectDB = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONOGODB_URI)
        console.log("database connected " + conn.connection.host)
    } catch (error) {
        console.log(error)
    }
}