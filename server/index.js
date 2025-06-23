require("dotenv").config({ path: "../.env" });
const express = require("express");
const cors = require("cors")
const mongoose = require("mongoose");
const { UserRouter } = require("./router/user");
const cookieParser = require('cookie-parser');
const axios = require('axios');
// const cors = require("cors");

const app = express();

app.use(cors({
  origin : "http://localhost:5173/"}
));
app.use(express.json());
app.use(cookieParser())



// LinkedIn Post Generation Function
// async function generateLinkedInPost(topic, tone) {
  

//   try {
//     const response = await ai.models.generateContent({
//       model: 'gemini-2.0-flash-001',
//       contents: prompt,
//     });

//     // Parse the response to extract structured data
//     const responseText = response.text;
//     console.log(responseText);

//     // Try to parse as JSON, if not, format it manually
//     try {
//       console.log(JSON.parse(responseText));
//       return JSON.parse(responseText);
//     } catch (parseError) {
//       // If JSON parsing fails, return a formatted structure
//       return {
//         hook: "Generated LinkedIn Post",
//         content: responseText,
//         callToAction: "What are your thoughts on this? Share below! 👇",
//         hashtags: ["#LinkedIn", "#Professional", "#Networking"],
//         characterCount: responseText.length,
//         fullPost: responseText
//       };
//     }
//   } catch (error) {
//     console.error("Error generating LinkedIn post:", error);
//     throw error;
//   }
// }

// app.post("/api/generate-post", async (req, res) => {
//   try {
//     const { topic, tone, industry } = req.body;

//     if (!topic) {
//       return res.status(400).json({ error: "Topic is required" });
//     }

//     const post = await generateLinkedInPost(topic, tone);
//     res.json(post);
//   } catch (error) {
//     console.error("Error in generate-post endpoint:", error);
//     res.status(500).json({ error: "Failed to generate LinkedIn post" });
//   }
// });

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