import express from 'express';
import { acceptrequest, sendFriendRequest } from '../Controllers/userController.js';
import jwtVerify from '../Middleware/jwtVerify.js';
const router=express.Router();

router.post('/sendrequest',jwtVerify,sendFriendRequest);
router.post('/acceptrequest',jwtVerify,acceptrequest);

export default router;  