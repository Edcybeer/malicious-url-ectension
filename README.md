

This script is designed to analyze URLs for phishing threats by leveraging an external API. It operates based on a dataset and predefined threat indicators.  

### **Key Functionalities:**  

1. **Event Listener for URL Check Button:**  
   - Listens for user clicks on the check button.  
   - Retrieves and processes the inputted URL.  
   - Displays a loading animation while verifying the URL.  
   - Converts the URL to Base64 format before sending it to the API.  

2. **Phishing Detection via API:**  
   - Uses the VirusTotal API to analyze the URL against a dataset of known threats.  
   - Parses the API response to determine if the URL is malicious.  
   - Hides the loader and updates the UI based on the analysis results.  

3. **Result Display & Notification:**  
   - Updates the page with a security status (Safe or Suspicious).  
   - Triggers a browser notification if a phishing attempt is detected.  

This implementation ensures real-time phishing detection by referencing a continuously updated dataset of malicious URLs.
