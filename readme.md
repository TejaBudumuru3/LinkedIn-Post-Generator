# 🚀 LinkedIn Post Generator

A modern web application that generates engaging LinkedIn posts using AI (Google Gemini). Create professional, shareable content with just a few clicks!

## ✨ Features

- **AI-Powered Content Generation**: Uses Google Gemini AI to create engaging LinkedIn posts
- **Customizable Tone**: Choose from professional, casual, enthusiastic, thoughtful, or humorous tones
- **Industry-Specific Content**: Tailor posts for different industries (tech, marketing, finance, etc.)
- **Structured Output**: Posts are organized with hooks, content, call-to-action, and hashtags
- **Character Count Tracking**: Ensures posts stay within LinkedIn's optimal length
- **Copy-to-Clipboard**: Easy copying of full posts or just hashtags
- **Modern UI**: Beautiful, responsive design that works on all devices

## 🏗️ Project Structure

```
LinkedIn-Post-Generator/
├── client/                 # React frontend
│   ├── src/
│   │   ├── App.jsx        # Main application component
│   │   ├── App.css        # Styling
│   │   └── main.jsx       # React entry point
│   └── package.json       # Frontend dependencies
├── server/                 # Express.js backend
│   ├── index.js           # Server with AI integration
│   └── package.json       # Backend dependencies
└── README.md              # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Google Gemini API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd LinkedIn-Post-Generator
   ```

2. **Install backend dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Set up environment variables**
   
   Create a `.env` file in the `server` directory:
   ```env
   Gemini_Apikey=your_gemini_api_key_here
   ```
   
   You can get a Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey).

### Running the Application

1. **Start the backend server**
   ```bash
   cd server
   npm start
   ```
   The server will run on `http://localhost:5000`

2. **Start the frontend development server**
   ```bash
   cd client
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

3. **Open your browser** and navigate to `http://localhost:5173`

## 📝 How to Use

1. **Enter your topic**: Describe what you want to post about
2. **Choose tone**: Select the appropriate tone for your audience
3. **Select industry**: Pick the most relevant industry for better targeting
4. **Generate**: Click "Generate Post" and wait for AI to create your content
5. **Review**: Check the generated post structure:
   - **Hook**: Attention-grabbing opening line
   - **Content**: Main body with valuable insights
   - **Call-to-Action**: Engagement prompt
   - **Hashtags**: Relevant tags for discoverability
6. **Copy**: Use the copy buttons to copy the full post or just hashtags
7. **Post**: Paste into LinkedIn and share!

## 🎯 LinkedIn Post Structure

The AI generates posts with this optimal structure:

1. **Hook** (First line) - Grabs attention immediately
2. **Content** (2-3 paragraphs) - Provides value and insights
3. **Call-to-Action** - Encourages engagement (comments, shares, etc.)
4. **Hashtags** (3-5 tags) - Improves discoverability
5. **Character Count** - Keeps posts under 1,300 characters for optimal engagement

## 🔧 API Endpoints

### POST `/api/generate-post`

Generates a LinkedIn post based on user input.

**Request Body:**
```json
{
  "topic": "string (required)",
  "tone": "string (optional, default: 'professional')",
  "industry": "string (optional, default: 'general')"
}
```

**Response:**
```json
{
  "hook": "string",
  "content": "string",
  "callToAction": "string",
  "hashtags": ["string"],
  "characterCount": number,
  "fullPost": "string"
}
```

## 🎨 Available Options

### Tones
- Professional
- Casual
- Enthusiastic
- Thoughtful
- Humorous

### Industries
- General
- Technology
- Marketing
- Finance
- Healthcare
- Education
- Sales
- Design

## 🛠️ Technologies Used

- **Frontend**: React, Vite, CSS3
- **Backend**: Node.js, Express.js
- **AI**: Google Gemini API
- **Styling**: Custom CSS with responsive design

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Google Gemini AI for providing the AI capabilities
- LinkedIn for the platform that inspired this tool
- The React and Express.js communities for excellent documentation

## 📞 Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

**Happy posting! 🎉**
