import React, { useState } from 'react';
import './index.css';

function App() {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAnalyzeClick = () => {
    // Placeholder for analyze image logic
    console.log('Analyze:', inputValue);
  };

  const handleGenerateClick = () => {
    // Placeholder for generate image logic
    console.log('Generate:', inputValue);
  };

  return (
    <div className="app">
      <h1>Computer Vision</h1>
      <div className="input-section">
        <label htmlFor="image-input">Insert URL or type prompt:</label>
        <input
          id="image-input"
          type="text"
          placeholder="Enter URL to analyze or textual prompt to generate an image"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button onClick={handleAnalyzeClick}>Analyze</button>
        <button onClick={handleGenerateClick}>Generate</button>
      </div>
    </div>
  );
}

export default App;
