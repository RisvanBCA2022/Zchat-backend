import express from 'express'
import { sendMessage } from "../Controllers/messagesController.js";


const router = express.Router()

router.post('/sendmessage',sendMessage)

export default router