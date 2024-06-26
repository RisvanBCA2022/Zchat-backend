import express from 'express';
import { acceptrequest, sendFriendRequest,rejectrequest, getFriendRequests } from '../Controllers/userController.js';
import jwtVerify from '../Middleware/jwtVerify.js';
import { uploadMedia } from '../Controllers/mediaController.js';
import { getNotification, markAsRead } from '../Controllers/notificationController.js';
const router=express.Router();

router.post('/sendrequest',jwtVerify,sendFriendRequest);
router.post('/acceptrequest',jwtVerify,acceptrequest);
router.post('/rejectrequest',jwtVerify,rejectrequest);
router.get('/getfriendrequests',jwtVerify,getFriendRequests);
router.post('/uploadmedia',jwtVerify,uploadMedia)
router.get('/notifications',jwtVerify,getNotification)
router.post('/nofications/read',jwtVerify, markAsRead)



export default router;  