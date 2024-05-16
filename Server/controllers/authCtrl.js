// controllers/authController.js
import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();

export const signUp = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword });
        const savedUser = await newUser.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const signIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        //create a token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {

        });

        //store in cookies
        res.cookie('accessToken', token, {
            httpOnly: true,
            secure: true,
        });

        res.status(200).json({ message: 'Login successful', user, token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Add Google authentication logic here
export const googleAuth = async (req, res) => { }