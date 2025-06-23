
const { Router } = require('express');
const { UserModel } = require('../models/userSchema');
const bcrypt = require('bcryptjs');
const { message } = require('statuses');
// const UserModel = require("../mode")

const UserRouter = Router();
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

module.exports = { UserRouter };