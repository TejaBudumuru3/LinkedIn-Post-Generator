import { useState } from 'react'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    topic: '',
    tone: 'professional',
    industry: 'general'
  });
  const [generatedPost, setGeneratedPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generatePost = async () => {
    if (!formData.topic.trim()) {
      setError('Please enter a topic');
      return;
    }

    setLoading(true);
    setError('');
    setGeneratedPost(null);

    try {
      const response = await fetch('http://localhost:5000/api/generate-post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to generate post');
      }

      const data = await response.json();
      setGeneratedPost(data);
    } catch (err) {
      setError('Error generating post. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div className="app">
      <header className="header">
        <h1>🚀 LinkedIn Post Generator</h1>
        <p>Create engaging LinkedIn posts with AI assistance</p>
      </header>

      <main className="main">
        <div className="form-container">
          <h2>Generate Your Post</h2>
          
          <div className="form-group">
            <label htmlFor="topic">Topic/Subject *</label>
            <textarea
              id="topic"
              name="topic"
              value={formData.topic}
              onChange={handleInputChange}
              placeholder="What would you like to post about? (e.g., 'The future of remote work', 'My experience with AI tools', 'Tips for better productivity')"
              rows="3"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="tone">Tone</label>
              <select
                id="tone"
                name="tone"
                value={formData.tone}
                onChange={handleInputChange}
              >
                <option value="professional">Professional</option>
                <option value="casual">Casual</option>
                <option value="enthusiastic">Enthusiastic</option>
                <option value="thoughtful">Thoughtful</option>
                <option value="humorous">Humorous</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="industry">Industry</label>
              <select
                id="industry"
                name="industry"
                value={formData.industry}
                onChange={handleInputChange}
              >
                <option value="general">General</option>
                <option value="technology">Technology</option>
                <option value="marketing">Marketing</option>
                <option value="finance">Finance</option>
                <option value="healthcare">Healthcare</option>
                <option value="education">Education</option>
                <option value="sales">Sales</option>
                <option value="design">Design</option>
              </select>
            </div>
          </div>

          <button 
            className="generate-btn" 
            onClick={generatePost}
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Generate Post'}
          </button>

          {error && <div className="error">{error}</div>}
        </div>

        {generatedPost && (
          <div className="result-container">
            <h2>Your LinkedIn Post</h2>
            
            <div className="post-preview">
              <div className="post-section">
                <h3>📌 Hook</h3>
                <p>{generatedPost.hook}</p>
              </div>

              <div className="post-section">
                <h3>📝 Content</h3>
                <p>{generatedPost.content}</p>
              </div>

              <div className="post-section">
                <h3>🎯 Call to Action</h3>
                <p>{generatedPost.callToAction}</p>
              </div>

              <div className="post-section">
                <h3>🏷️ Hashtags</h3>
                <div className="hashtags">
                  {generatedPost.hashtags.map((tag, index) => (
                    <span key={index} className="hashtag">{tag}</span>
                  ))}
                </div>
              </div>

              <div className="post-stats">
                <span>Character count: {generatedPost.characterCount}</span>
                <span>Status: {generatedPost.characterCount <= 1300 ? '✅ Good length' : '⚠️ Too long'}</span>
              </div>
            </div>

            <div className="action-buttons">
              <button 
                className="copy-btn"
                onClick={() => copyToClipboard(generatedPost.fullPost)}
              >
                📋 Copy Full Post
              </button>
              <button 
                className="copy-btn"
                onClick={() => copyToClipboard(generatedPost.hashtags.join(' '))}
              >
                🏷️ Copy Hashtags
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
