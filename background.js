chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'showNotification') {
        // Ensure the notifications permission is granted
        chrome.permissions.contains({ permissions: ["notifications"] }, (granted) => {
            if (granted) {
                // Show the notification
                chrome.notifications.create({
                    type: 'basic',
                    iconUrl: 'icon.png', // Make sure you have the icon in the correct path
                    title: 'Malicious URL Detected',
                    message: 'This URL is flagged as suspicious or harmful. Proceed with caution.',
                    priority: 2
                });
            } else {
                console.error('Notifications permission is not granted.');
            }
        });
    }
});
