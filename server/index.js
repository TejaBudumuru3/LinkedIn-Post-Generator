require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { UserRouter } = require("./router/user");
const cookieParser = require('cookie-parser');

const app = express();

// CORS Configuration
app.use(cors({
  origin: "http://localhost:5173", // Allow requests from your frontend
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("LinkedIn Post Generator Server Running");
});

app.use("/user", UserRouter);

// Test the function
// generateLinkedInPost("Generate a post on the score between England vs India first test match 2025 at Headingley", "informative");

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    // 1. Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("✅ Connected to MongoDB");

    // 2. Start the Express server
    app.listen(PORT, () => {
      console.log(`🚀 Server started and running at http://localhost:${PORT}`);
      console.log('CLIENT_ID:', process.env.LINKEDIN_CLIENT_ID);
      console.log('CLIENT_SECRET:', process.env.LINKEDIN_CLIENT_SECRET);
    });

  } catch (e) {
    console.error("❌ Error starting server:", e);
    process.exit(1); // Exit the process if unable to start
  }
}

// Start the server
startServer();