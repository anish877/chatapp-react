import e from "express"
import { protectRoute } from "../middleware/auth.middleware.js"
import { getUsersForSideBar } from "../controllers/message.controllers.js"
import { getMessages } from "../controllers/message.controllers.js"
import { sendMessage } from "../controllers/message.controllers.js"

const router = e.Router()

router.get("/users",protectRoute,getUsersForSideBar)
router.get("/:id",protectRoute,getMessages)
router.post("/send/:id",protectRoute,sendMessage)

export default router