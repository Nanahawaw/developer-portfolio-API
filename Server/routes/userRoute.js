import express from 'express';
const router = express.Router();
import { likeProject, createComment, getComments } from '../controllers/userCtrl.js'
import { isAuthenticated } from '../middleware/authMiddleware.js'


router.post('/like-project', isAuthenticated, likeProject)
router.get('/get-comments', getComments)
router.post('/create-comment', isAuthenticated, createComment)


export default router