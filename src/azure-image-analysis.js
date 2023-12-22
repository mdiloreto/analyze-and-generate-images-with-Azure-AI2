// azure-image-analysis.js
const subscriptionKey = process.env.REACT_APP_AZURE_SUBSCRIPTION_KEY;
const endpoint = process.env.REACT_APP_AZURE_ENDPOINT;

async function analyzeImage(imageUrl) {
  // Update the URL to the v4.0 API
  const response = await fetch(`${endpoint}/vision/v4.0/analyze?visualFeatures=Categories,Description,Tags`, {
    method: 'POST',
    body: JSON.stringify({
      url: imageUrl,
      // Include new options for v4.0 here if needed
    }),
    headers: {
      'Ocp-Apim-Subscription-Key': subscriptionKey,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    // The API call was unsuccessful
    throw new Error(`Image analysis failed: ${response.statusText}`);
  }

  // The API call was successful
  return response.json();
}

export default analyzeImage;
