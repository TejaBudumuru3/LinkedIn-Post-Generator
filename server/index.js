const express = require("express");
require("dotenv").config();
const cors = require("cors")

const app = express()

app.use(cors());
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("server running")
});

const PORT = 5000;
app.listen(PORT,()=>{
    console.log(`server started and running at ${PORT}` )
})