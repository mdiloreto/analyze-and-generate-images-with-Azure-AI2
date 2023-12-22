// azure-image-analysis.js
const subscriptionKey = process.env.REACT_APP_AZURE_SUBSCRIPTION_KEY;
const endpoint = process.env.REACT_APP_AZURE_ENDPOINT;

async function analyzeImage(imageUrl) {
  // API version and query parameters for the features you want to analyze
  const apiVersion = '2023-10-01';
  const features = 'denseCaptions';

  const response = await fetch(`${endpoint}computervision/imageanalysis:analyze?api-version=${apiVersion}&features=${features}`, {
    method: 'POST',
    body: JSON.stringify({ url: imageUrl }),
    headers: {
      'Ocp-Apim-Subscription-Key': subscriptionKey,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error('Image analysis failed:', response.statusText);
  }

  return response.json();
}

export default analyzeImage;
