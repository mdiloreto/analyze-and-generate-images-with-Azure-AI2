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

  return (
    <div className="app">
      <h1>Computer Vision</h1>
      <div className="input-section">
        <label htmlFor="image-input">Insert URL </label>
        <input
          id="image-input"
          type="text"
          placeholder="Enter Image URL to analyze"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button onClick={handleAnalyzeClick} disabled={loading}>Analyze</button>
      </div>
      {loading ? <p>Loading...</p> : <DisplayResults results={analysisResults} inputValue={inputValue} />}
    </div>
  );
}

export default App; // This marks the end of the App component

export function DisplayResults({ results, inputValue }) {
  const [showJson, setShowJson] = useState(false);

  const toggleJsonDisplay = () => {
    setShowJson(!showJson);
  };

  if (!results) {
    return null;
  }

  return (
    <div>
      <h2>Computer Vision Analysis Results</h2>
      <img src={inputValue} alt="Analyzed content" style={{ maxWidth: '100%' }} />
      {results.captionResult && (
        <div>
          <h3>Description:</h3>
          <p>{results.captionResult.text}</p>
        </div>
      )}

      {results.tagsResult && (
        <div>
          <h3>Tags:</h3>
          <ul>
            {results.tagsResult.values.map((tag, index) => (
              <li key={index}>{tag.name}</li>
            ))}
          </ul>
        </div>
      )}

      {results.readResult && (
        <div>
          <h3>Read Text:</h3>
          <ul>
            {results.readResult.blocks.map((block, blockIndex) => 
              block.lines.map((line, lineIndex) => (
                <li key={`${blockIndex}-${lineIndex}`}>{line.text}</li>
              ))
            )}
          </ul>
        </div>
      )}


      <button onClick={toggleJsonDisplay}>
        {showJson ? 'Hide full JSON' : 'Show full JSON'}
      </button>

      {showJson && (
        <div>
          <h3>Full JSON:</h3>
          <pre>{JSON.stringify(results, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
