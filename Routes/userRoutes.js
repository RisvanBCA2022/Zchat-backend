import express from 'express';
import { acceptrequest, sendFriendRequest,rejectrequest } from '../Controllers/userController.js';
import jwtVerify from '../Middleware/jwtVerify.js';
const router=express.Router();

router.post('/sendrequest',jwtVerify,sendFriendRequest);
router.post('/acceptrequest',jwtVerify,acceptrequest);
router.post('/rejectrequest',jwtVerify,rejectrequest);

export default router;  