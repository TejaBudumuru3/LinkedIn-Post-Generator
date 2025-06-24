require("dotenv").config({ path: "../.env" });
const express = require("express");
const cors = require("cors")
const mongoose = require("mongoose");
const { UserRouter } = require("./router/user");
const cookieParser = require('cookie-parser');
const axios = require('axios');
const app = express();

app.use(cors({
  origin : "http://localhost:5173/"}
));
app.use(express.json());
app.use(cookieParser())


app.get("/", (req, res) => {
  res.send("LinkedIn Post Generator Server Running");
});

app.use("/user", UserRouter)


// Test the function
// generateLinkedInPost("Generate a post on the score between England vs India first test match 2025 at Headingley", "informative");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`server started and running at ${PORT}`);
      console.log('CLIENT_ID:', process.env.LINKEDIN_CLIENT_ID);
      console.log('CLIENT_SECRET:', process.env.LINKEDIN_CLIENT_SECRET);
    });
  } catch (e) {
    console.error("Error connecting to MongoDB:", e);
    process.exit(1); // Exit the process if DB connection fails
  }
}
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server started and running at ${PORT}`);
  console.log('CLIENT_ID:', process.env.LINKEDIN_CLIENT_ID);
  console.log('CLIENT_SECRET:', process.env.LINKEDIN_CLIENT_SECRET);
});
connectDB();