// extension/content.js

// Function to identify terms and conditions content
function findTermsAndConditions() {
    const termsKeywords = ['terms of service', 'terms & conditions', 'terms', 'agreement', 'legal agreement'];
    const elements = document.querySelectorAll('p, div, section, article, span, li');
  
    let termsText = '';
  
    elements.forEach(element => {
      const text = element.innerText.toLowerCase();
      if (termsKeywords.some(keyword => text.includes(keyword))) {
        termsText += element.innerText + '\n';
      }
    });
  
    return termsText.trim() || null;
  }
  
  // Function to send text to the backend server for summarization
  async function summarizeText(text) {
    try {
      const response = await fetch('http://localhost:3000/summarize', { // Ensure this matches your backend server URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text })
      });
  
      if (!response.ok) {
        console.error('Error summarizing text:', response.statusText);
        return null;
      }
  
      const data = await response.json();
      return data.summary;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  }
  
  // Function to display summary
  function displaySummary(summary) {
    // Remove existing summary if any
    const existingDiv = document.getElementById('tcs-summary-div');
    if (existingDiv) {
      existingDiv.remove();
    }
  
    // Create summary div
    const summaryDiv = document.createElement('div');
    summaryDiv.id = 'tcs-summary-div';
    summaryDiv.style.position = 'fixed';
    summaryDiv.style.bottom = '10px';
    summaryDiv.style.right = '10px';
    summaryDiv.style.width = '300px';
    summaryDiv.style.maxHeight = '400px';
    summaryDiv.style.overflowY = 'auto';
    summaryDiv.style.padding = '15px';
    summaryDiv.style.backgroundColor = '#f9f9f9';
    summaryDiv.style.border = '1px solid #ccc';
    summaryDiv.style.borderRadius = '5px';
    summaryDiv.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    summaryDiv.style.zIndex = '10000';
  
    // Close button
    const closeButton = document.createElement('span');
    closeButton.innerHTML = '&times;';
    closeButton.style.float = 'right';
    closeButton.style.cursor = 'pointer';
    closeButton.style.fontSize = '16px';
    closeButton.onclick = () => summaryDiv.remove();
  
    // Summary content
    const summaryContent = document.createElement('div');
    summaryContent.innerHTML = `<h3>Summary of Terms and Conditions:</h3><p>${summary}</p>`;
  
    summaryDiv.appendChild(closeButton);
    summaryDiv.appendChild(summaryContent);
    document.body.appendChild(summaryDiv);
  }
  
  // Main function
  (async function() {
    const termsText = findTermsAndConditions();
    if (termsText) {
      // Check if summary already exists to prevent multiple summaries
      if (!document.getElementById('tcs-summary-div')) {
        const summary = await summarizeText(termsText);
        if (summary) {
          displaySummary(summary);
        }
      }
    }
  })();
  