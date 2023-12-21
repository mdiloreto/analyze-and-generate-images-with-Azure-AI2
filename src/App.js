import React, { useState } from 'react';
import './index.css'; // Make sure this is the correct path to your CSS file
import analyzeImage from './azure-image-analysis';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAnalyzeClick = async () => {
    try {
      setLoading(true);
      const results = await analyzeImage(inputValue);
      setAnalysisResults(results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // This ensures we set loading to false even if there's an error
    }
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
        <button onClick={handleAnalyzeClick} disabled={loading}>Analyze</button>
        <button onClick={handleGenerateClick}>Generate</button>
      </div>
      {loading ? <p>Loading...</p> : <DisplayResults results={analysisResults} />}
    </div>
  );
}

export default App; // This marks the end of the App component

export function DisplayResults({ results }) {
  if (!results) {
    return null;
  }
  
  // Assuming 'results' has 'url' and 'description' fields as per Azure API response
  return (
    <div>
      <h2>Computer Vision Analysis</h2>
      {results.url && <img src={results.url} alt="Analysis result" />}
      {results.description && (
        <p>
          <strong>Description:</strong> {results.description.captions[0].text} 
          (Confidence: {results.description.captions[0].confidence.toFixed(2)})
        </p>
      )}
      {/* Display additional results if needed */}
    </div>
  );
}
