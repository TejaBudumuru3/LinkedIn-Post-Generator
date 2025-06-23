const express = require("express");
require("dotenv").config();
const cors = require("cors")
const {GoogleGenAI} = require('@google/genai')
const app = express()
const mongoose = require("mongoose");
const Router = require("./router/user");
require("dotenv").config( {path:"../.env" });
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const GEMINI_API_KEY = process.env.Gemini_Apikey;
const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});

// LinkedIn Post Generation Function
async function generateLinkedInPost(topic, tone) {
  const prompt = `
Generate a LinkedIn post about: "${topic}"

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
}
`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-001',
      contents: prompt,
    });
    
    // Parse the response to extract structured data
    const responseText = response.text;
    console.log(responseText);
    
    // Try to parse as JSON, if not, format it manually
    try {
      console.log(JSON.parse(responseText));
      return JSON.parse(responseText);
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
  } catch (error) {
    console.error("Error generating LinkedIn post:", error);
    throw error;
  }
}

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
// Root route
app.get("/", (req, res) => {
    res.send("server running");
});

app.use("/user", Router)

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server started and running at ${PORT}`);
});

// Test the function
generateLinkedInPost("Generate a post on the score between England vs India first test match 2025 at Headingley", "informative");

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`server started and running at ${PORT}`);
        });
    } catch (e) {
        console.error("Error connecting to MongoDB:", e);
        process.exit(1); // Exit the process if DB connection fails
    }
}

connectDB();