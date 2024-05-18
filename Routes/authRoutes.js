import express from 'express'
import { login, signup, verifyEmail } from '../Controllers/authControllers.js'

const router=express.Router()

router.post('/signup',signup)
router.post('/login',login)
router.post('/verify-email', verifyEmail);
export default router