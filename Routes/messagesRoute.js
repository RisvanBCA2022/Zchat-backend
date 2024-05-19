import express from 'express'
import { sendMessage,getMessages } from '../Controllers/messagesController.js'
import jwtVerify from '../Middleware/jwtVerify.js'
const router=express.Router()

router.post('/sendmessage',jwtVerify,sendMessage)
router.get('/getmessages/:id',jwtVerify,getMessages)

export default router