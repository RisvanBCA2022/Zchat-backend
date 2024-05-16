import express from 'express';
import { sendFriendRequest } from '../Controllers/userController';
const router=express.Router();

router.post('/message',sendFriendRequest);

export default router;  