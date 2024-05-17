import express from 'express';
import { acceptrequest, sendFriendRequest,rejectrequest, getFriendRequests } from '../Controllers/userController.js';
import jwtVerify from '../Middleware/jwtVerify.js';
const router=express.Router();

router.post('/sendrequest',jwtVerify,sendFriendRequest);
router.post('/acceptrequest',jwtVerify,acceptrequest);
router.post('/rejectrequest',jwtVerify,rejectrequest);
router.get('/getfriendrequests',jwtVerify,getFriendRequests);

export default router;  