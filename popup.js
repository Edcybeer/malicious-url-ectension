// Event listener for checking URL entered manually in the popup
document.getElementById('checkButton').addEventListener('click', function () {
    const url = document.getElementById('urlInput').value.trim();

    if (!url) {
      document.getElementById('result').textContent = "Please enter a URL.";
      document.getElementById('result').className = "error";
      return;
    }

    // Show the loader while checking
    document.getElementById('loader').classList.remove('hidden');
    document.getElementById('result').classList.add('hidden');

    // Encode URL to Base64 format and call the API
    const base64Url = btoa(url);
    checkPhishing(base64Url);
});

// Function to call the VirusTotal API for URL check
function checkPhishing(base64Url) {
    fetch(`https://www.virustotal.com/api/v3/urls/${base64Url}`, {
        method: 'GET',
        headers: {
            'x-apikey': ''  // Replace with your actual API key
        }
    })
    .then(response => response.json())
    .then(data => {
        // Log the response to debug
        console.log('API Response:', data);

        // Hide the loader after the API call completes
        document.getElementById('loader').classList.add('hidden');

        if (data.data) {
            const isPhishing = data.data.attributes.last_analysis_stats.malicious > 0;
            displayResult(isPhishing);
        } else {
            displayResult(false);  // If no data or an error occurs
        }
    })
    .catch(error => {
        document.getElementById('loader').classList.add('hidden');
        console.error('Error:', error);
        displayResult(false);
    });
}

// Function to update the result display
function displayResult(isPhishing) {
    const resultText = isPhishing ? "Suspicious URL (Phishing Detected)" : "Safe URL";
    const resultClass = isPhishing ? "suspicious" : "safe";

    document.getElementById('result').textContent = resultText;
    document.getElementById('result').className = resultClass;
    document.getElementById('result').classList.remove('hidden');

    // If the URL is suspicious, send a message to background to show the notification
    if (isPhishing) {
        showMaliciousNotification();
    }
}

// Function to send a message to the background to show the notification
function showMaliciousNotification() {
    chrome.runtime.sendMessage({ type: 'showNotification' });
}
