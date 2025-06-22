const express = require("express");
require("dotenv").config();
const cors = require("cors")
const  {GoogleGenAI} =  require( '@google/genai')
const app = express()

app.use(cors());
app.use(express.json())



const GEMINI_API_KEY =process.env.Gemini_Apikey;

const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});

async function main() {
  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash-001',
    contents: 'Why is the sky blue?',
  });
  console.log(response.text);
}

main();


app.get("/",(req,res)=>{
    res.send("server running")
});

const PORT = 5000;
app.listen(PORT,()=>{
    console.log(`server started and running at ${PORT}` )
})