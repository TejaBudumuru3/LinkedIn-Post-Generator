require("dotenv").config();
const  express = require('express');
const { UserModel } = require('../models/userSchema');
const bcrypt = require('bcryptjs');
const axios  = require("axios")
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
  


module.exports = { UserRouter };