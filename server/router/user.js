// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/userSchema');
// const Otp = require('../models/OtpSchema');
// const sendEmail = require('../utils/sendEmail');

// // Registration: send OTP
// router.post('/register', async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     let user = await User.findOne({ email });
//     if (user) return res.status(400).json({ message: 'User already exists'});

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

//     await Otp.deleteMany({ email }); // remove old OTPs if any
//     await Otp.create({ email, otp: otpCode });

//     await sendEmail(email, 'Your OTP Code', `Your OTP code is: ${otpCode}`);

//     // Temporarily store email & hashed password in memory or cache in production
//     res.json({ message: 'OTP sent to your email' });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // OTP Verification & Create User
// router.post('/verify-otp', async (req, res) => {
//   const { email, password, otp } = req.body;
//   try {
//     const validOtp = await Otp.findOne({ email, otp });
//     if (!validOtp) return res.status(400).json({ message: 'Invalid or expired OTP' });

//     let user = await User.findOne({ email });
//     if (user) return res.status(400).json({ message: 'User already exists' });

//     const hashedPassword = await bcrypt.hash(password, 10);
//     user = new User({ email, password: hashedPassword, isVerified: true });
//     await user.save();
//     await Otp.deleteMany({ email });

//     res.json({ message: 'Registration successful. Please login.' });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Login
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user || !user.isVerified) return res.status(400).json({ message: 'Email not verified or user not found' });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
//     res.json({ token });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Protected test route
// router.get('/profile', async (req, res) => {
//   const token = req.headers['authorization']?.split(' ')[1];
//   if (!token) return res.status(401).json({ message: 'No token provided' });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.userId).select('-password');
//     res.json(user);
//   } catch (err) {
//     res.status(401).json({ message: 'Invalid token' });
//   }
// });

// module.exports = router;


const { Router } = require('express');
const User = require('../models/userSchema');
const bcrypt = require('bcryptjs');


const UserRouter = Router();
UserRouter.post("/register", async (req,res)=>{
    const { name, email, password } = req.body;
    try{
        const userMail = await User.findOne({ email });
        if(userMail){
            return res.status(400).json({ message: "user already exists" });
        }
        else{
            const hashedPassword = await bcrypt.hash(password, 10);
            User.create({
                username: name,
                email,
                password : hashedPassword
            })
            return res.status(201).json({ message: "user created successfully" });
        }
    }
    catch(e){
        console.log(e)
    }
})

module.exports = UserRouter;