import express from 'express';
const router = express.Router();
import { likeProject, createComment, getComments, incrementViewCount } from '../controllers/userCtrl.js'
import { isAuthenticated } from '../middleware/authMiddleware.js'


router.post('/like-project', isAuthenticated, likeProject)
router.post('/increment-view', isAuthenticated, incrementViewCount)
router.get('/get-comments', getComments)
router.post('/create-comment', isAuthenticated, createComment)


export default router