require("dotenv").config();
const  express = require('express');
const { UserModel } = require('../models/userSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios  = require("axios");
const { GoogleGenAI } = require('@google/genai');
const { authMiddleware } = require("../middleware/auth");
const { json } = require("body-parser");
const { OtpModel } = require("../models/OtpSchema");
const sendEmail = require("../utils/sendMail");


const UserRouter = express.Router();


UserRouter.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    try{
    const EmailCheck = await UserModel.findOne({
        email
    })
    if (EmailCheck) {
       return  res.status(400).json(
            {
                message: "email already exsists try with a different one "
            }
        )
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    UserModel.create({
        username: name,
        email,
        password: hashedPassword
    })
    // console.log("Account sign up successfull ")
     return res.status(201).json({ message: "user created successfully" });
    }catch(error)
    {
        console.log(error)
    }
})

UserRouter.get('/auth/linkedin', (req, res) => {
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: process.env.LINKEDIN_CLIENT_ID,
      redirect_uri: process.env.LINKEDIN_REDIRECT_URI,
      scope: 'r_liteprofile r_emailaddress w_member_social'
    });
    const authUrl = 'https://www.linkedin.com/oauth/v2/authorization?' + params.toString();
    console.log('LinkedIn Auth URL:', authUrl); 
    res.redirect(authUrl);
  });

UserRouter.post("/login",async (req,res)=>{
    const { email,password } = req.body;
    try{
        const user = await UserModel.findOne({ email });
        if(!user)
            return res.status(400).json({ message: "User not found" });
        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch)
            return res.status(400).json({ message: "invalid password" });
        else{
            // return res.status(200).json({ message: "Login success", user: user})
            const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, {expiresIn: '1d' });

            res.cookie("token",token,{
                httpOnly: true,
                secure: false,
                sameSite:"none",
                maxAge: 24 * 60 * 60 * 1000 // 1 day
            })
            return res.status(200).json({ message: "Login sucess", username: user.username, email:user.email, token: token})
        }
    }
    catch(e)
    {
        return res.status(500).json({ message: "INternal server error" });
    }
})

  
  UserRouter.get('/auth/linkedin/callback', async (req, res) => {
    const code = req.query.code;
    if (!code) {
      return res.status(400).send('No code provided');
    }
  
    try {
      console.log({
        code,
        redirect_uri: process.env.LINKEDIN_REDIRECT_URI,
        client_id: process.env.LINKEDIN_CLIENT_ID,
        client_secret: process.env.LINKEDIN_CLIENT_SECRET
      });
  
      const params = new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: process.env.LINKEDIN_REDIRECT_URI,
        client_id: process.env.LINKEDIN_CLIENT_ID,
        client_secret: process.env.LINKEDIN_CLIENT_SECRET
      });
  
      const tokenResponse = await axios.post(
        'https://www.linkedin.com/oauth/v2/accessToken',
        params.toString(),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      );
  
      const accessToken = tokenResponse.data.access_token;
      // You can now store accessToken in your database for this user
  
      res.send('Access token received!'); // For testing, you can send the token or a success message
    } catch (error) {
      console.log(error.response ? error.response.data : error.message);
      res.status(500).send('Error exchanging code for access token');
    }
  });

UserRouter.post("/send-otp", async (req,res)=>{
  const { email } = req.body;
  try{
    const user = await UserModel.findOne({ email });
    if(!user)
      return res.status(400).json({ message : "User not found" });
    else{
      const otp = Math.floor(100000 + Math.random() * 900000).toString();

      await OtpModel.create({
        email,
        otp
      })


      await sendEmail(
        email,
        "Your OTP for LinkedIn Post Generation",
        `Your OTP is ${otp}. It is valid for 5 minutes.`
      )
      res.status(200).json({ message: "OTP sent sucessfully" });
    }
  }catch(e){
    console.error("Error sending OTP:", e);
    res.status(500).json({ message: "Internal server error" }); 
  }
})

UserRouter.post("/verify-otp", async (req,res)=>{
    const { email,otp } = req.body;
    try{
        const otpRecord = await OtpModel.findOne({ email});
        if(!otpRecord)
          return res.status(400).json({ message: " no OTPs" });
        else{
          const fetchOtp = await OtpModel.findOne({ email });
          if(otp.equals(fetchOtp.otp)){
            await UserModel.updateOne({ email }, { isVerified: true });
            res.status(200).json({ message: "OTP verified successfully" });
          }
          else{
            return res.status(400).json({ message: "Invalid OTP" });
          }
        }
      }
        catch(e){
          res.status(500).json({ message: "Internal server error" });
        }
    });


UserRouter.get("/generate-post", authMiddleware, async (req,res)=>{
    const GEMINI_API_KEY = process.env.Gemini_Apikey;
    const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
    const { topic, tone } = req.body;
    const prompt = `Generate a LinkedIn post about: "${topic}"
            Requirements:
            - Tone: ${tone}
            - Structure:
            1. Hook (first line should grab attention)
            2. 2-3 paragraphs of valuable content
            3. Call-to-action for engagement
            4. 3-5 relevant hashtags
            - Keep under 1,300 characters
            - Make it engaging and shareable
            - Include personal insights or experiences if relevant
            - Use bullet points or emojis sparingly but effectively

            Format the response as:
            {
            "hook": "attention-grabbing first line",
            "content": "main content paragraphs",
            "callToAction": "engagement prompt",
            "hashtags": ["#hashtag1", "#hashtag2", "#hashtag3"],
            "characterCount": 1234,
            "fullPost": "complete formatted post"
            }`;

    try{
        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash-001',
            contents: prompt
        });
        const responseText = response.text;
        console.log(`response text: ${responseText}`);
        try {
        console.log(JSON.parse(responseText));
        res.status(200).json(JSON.parse(responseText));
        } catch (parseError) {
        // If JSON parsing fails, return a formatted structure
        return {
            hook: "Generated LinkedIn Post",
            content: responseText,
            callToAction: "What are your thoughts on this? Share below! 👇",
            hashtags: ["#LinkedIn", "#Professional", "#Networking"],
            characterCount: responseText.length,
            fullPost: responseText
        };
        }
    }
    catch(e){
        console.error("Error generating LinkedIn post:", error);
        throw error;
    }
})

  


module.exports = { UserRouter };