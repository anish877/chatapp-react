import e from 'express'
import appRouter from './routes/auth.route.js'
import dotenv from 'dotenv'
import { connectDB } from './lib/db.js'
import cookieparser from 'cookie-parser'
import messageRouter from './routes/message.route.js'
import cors from "cors"
import { app,server,io } from './lib/socket.js'
import path from 'path'

dotenv.config()
const port  = process.env.PORT
const __dirname = path.resolve()
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(e.json())
app.use(cookieparser())
app.use('/api/auth',appRouter)
app.use('/api/messages',messageRouter)

if (process.env.NODE_ENV === "production") {
    app.use(e.static(path.join(__dirname, "../frontend/dist")));
  
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
  }

server.listen(port,()=>{
    console.log(`Server started at port ${port}`)
    connectDB()
})