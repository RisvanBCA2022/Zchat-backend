import express from 'express';
import { sendFriendRequest } from '../Controllers/userController.js';
import jwtVerify from '../Middleware/jwtVerify.js';
const router=express.Router();

router.post('/sendrequest',jwtVerify,sendFriendRequest);

export default router;  