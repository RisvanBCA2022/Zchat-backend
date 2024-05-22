import express from 'express'
import { sendMessage,getMessages, deleteMessage } from '../Controllers/messagesController.js'
import jwtVerify from '../Middleware/jwtVerify.js'
const router=express.Router()

router.post('/sendmessage',jwtVerify,sendMessage)
router.get('/getmessages/:id',jwtVerify,getMessages)
router.delete('/deletemessage/:id',jwtVerify,deleteMessage)

export default router