// azure-image-analysis.js
const subscriptionKey = process.env.REACT_APP_AZURE_SUBSCRIPTION_KEY;
const endpoint = process.env.REACT_APP_AZURE_ENDPOINT;

async function analyzeImage(imageUrl) {
  const response = await fetch(`${endpoint}/vision/v3.2/analyze?visualFeatures=Description`, {
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
