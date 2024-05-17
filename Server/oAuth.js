// auth.js
require('dotenv').config();
const express = require('express');
const router = express.Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// Import your User model
const User = require('./models/User');

// Configure Passport with Google Strategy
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: '/auth/google/callback',
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // Find or create a user in your database
                let user = await User.findOne({ googleId: profile.id });
                if (!user) {
                    user = await User.create({
                        googleId: profile.id,
                        email: profile.emails[0].value,
                    });
                }
                return done(null, user);
            } catch (err) {
                return done(err, null);
            }
        }
    )
);

// Google authentication routes
router.get(
    '/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        // Successful authentication, generate a JWT or handle the user session as needed
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {

        });

        //store in cookies
        res.cookie('accessToken', token, {
            httpOnly: true,
            secure: true,
        });
        res.redirect('/'); // Redirect to the desired route after successful authentication
    }
);

module.exports = router;