
const { Router } = require('express');
const {UserModel} = require('../models/userSchema');
const bcrypt = require('bcryptjs');
// const UserModel = require("../mode")

const UserRouter = Router();
UserRouter.post("/register", async (req,res)=>{
    const { name, email, password } = req.body;
    try{
        const userMail = await UserModel.find({ email });
        if(userMail){
            return res.status(400).json({ message: "user already exists" });
        }
        else{
            const hashedPassword = await bcrypt.hash(password, 10);
            UserModel.create({
                username: name,
                email,
                password : hashedPassword
            })
            console.log("Account sign up successfull ")
            return res.status(201).json({ message: "user created successfully" });
        }
    }
    catch(e){
        console.log(e)
    }
})

module.exports = {UserRouter};