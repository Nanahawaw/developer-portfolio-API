import express from 'express';
import { signIn, signUp, googleAuth } from '../controllers/authCtrl.js';

const router = express.Router();
router.post('/signup', signUp)
router.post('/signIn', signIn)
router.post('/google-auth', googleAuth)

export default router