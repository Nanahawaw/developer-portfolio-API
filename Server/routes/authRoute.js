import express from 'express';
import { signIn, signUp } from '../controllers/authCtrl.js';

const router = express.Router();
router.post('/signup', signUp)
router.post('/signIn', signIn)

export default router