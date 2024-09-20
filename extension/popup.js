// extension/popup.js

document.getElementById('refresh').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.scripting.executeScript(
        {
          target: { tabId: tabs[0].id },
          function: getSummaryFromPage
        },
        (results) => {
          if (results && results[0].result) {
            document.getElementById('summary').innerText = results[0].result;
          } else {
            document.getElementById('summary').innerText = 'No summary available.';
          }
        }
      );
    });
  });
  
  function getSummaryFromPage() {
    const summaryDiv = document.getElementById('tcs-summary-div');
    return summaryDiv ? summaryDiv.innerText : 'No summary available.';
  }
  
  // Initial load
  document.addEventListener('DOMContentLoaded', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.scripting.executeScript(
        {
          target: { tabId: tabs[0].id },
          function: getSummaryFromPage
        },
        (results) => {
          if (results && results[0].result) {
            document.getElementById('summary').innerText = results[0].result;
          } else {
            document.getElementById('summary').innerText = 'No summary available.';
          }
        }
      );
    });
  });
  