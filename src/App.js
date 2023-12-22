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
      {loading ? <p>Loading...</p> : <DisplayResults results={analysisResults} />}
    </div>
  );
}

export default App; // This marks the end of the App component

export function DisplayResults({ results, setInputValue }) {
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
      <img src={setInputValue} alt="<Error Displaying capture from url...>"/>
      {results.description?.captions && (
        <div>
          <h3>Description:</h3>
          <p>{results.description.captions[0]?.text}</p>
        </div>
      )}

      {results.description?.tags && (
        <div>
          <h3>Tags:</h3>
          <ul>
            {results.description.tags.map((tag, index) => (
              <li key={index}>{tag}</li>
            ))}
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



// export function DisplayResults({ results }) {
//   if (!results) {
//     return null;
//   }
  
//   // Assuming 'results' has 'url' and 'description' fields as per Azure API response
//   return (
//     <div>
//       <h2>Computer Vision Analysis</h2>
//       {inputValue && <img src={inputValue} alt="Analyzed result" />}
//       {results && (
//         <p>
//           <strong>Description:</strong> {results.description.captions[0].text} 
//           (Confidence: {results.description.captions[0].confidence.toFixed(2)})
//         </p>
//       )}
//       {/* Display additional results if needed */}
//     </div>
//   );
// }
