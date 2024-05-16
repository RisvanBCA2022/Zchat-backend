import express from 'express';
import { sendFriendRequest } from '../Controllers/userController';
const router=express.Router();

router.post('/sendrequest',sendFriendRequest);

export default router;  