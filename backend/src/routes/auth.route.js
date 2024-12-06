import e from "express"
import { checkAuth, login,logout,signup, updateProfile } from "../controllers/auth.controllers.js"
import { protectRoute } from "../middleware/auth.middleware.js"

const router = e.Router()

router.post('/login',(req,res)=>login(req,res))
router.post('/logout',(req,res)=>logout(req,res))
router.post('/signup',(req,res)=>signup(req,res))

router.put('/update-profile',protectRoute,updateProfile)
router.get('/check',protectRoute,checkAuth)

export default router