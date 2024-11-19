// Ensure the Google API client is loaded and authenticated
function onClientLoad() {
  gapi.load('client:auth2', initClient);
}

function initClient() {
  gapi.client.init({
    apiKey: 'AIzaSyCvd2tJiLia280MuWpa6EZm29kdeyIU3C8', // Replace with your API key
    clientId: '825538423774-seramrvgddmil226bdmsguii9hnu7gn9.apps.googleusercontent.com', // Replace with your Client ID
    scope: 'https://www.googleapis.com/auth/spreadsheets',
    discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
  }).then(function () {
    console.log("Google API Client Initialized");
  }).catch(function (error) {
    console.error("Error initializing Google API client:", error);
  });
}

// Append new player data to the Google Sheet
function addNewPlayer(name, contactInfo, imageUrl, status = "Alive") {
  const spreadsheetId = '1UGn5QjkFzyjeXeLWpfW1jQEL-9_UyvPJlx2bzQF6XmE'; // Replace with your Google Sheet ID
  const range = 'Sheet1!A:D'; // Adjust the range based on your sheet structure
  const values = [[name, contactInfo, imageUrl, status]]; // Player data

  const request = gapi.client.sheets.spreadsheets.values.append({
    spreadsheetId: spreadsheetId,
    range: range,
    valueInputOption: 'RAW',
    resource: { values: values },
  });

  request.then(function (response) {
    console.log('New player added successfully:', response);
    alert("Player added successfully!");
  }).catch(function (error) {
    console.error("Error adding new player:", error);
    alert("Failed to add player. Check console for details.");
  });
}

// Handle form submission
document.getElementById('player-form').addEventListener('submit', function (event) {
  event.preventDefault();

  const name = document.getElementById('player-name').value;
  const contactInfo = document.getElementById('player-contact').value;
  const imageUrl = document.getElementById('player-image').value;

  if (name && contactInfo) {
    addNewPlayer(name, contactInfo, imageUrl);
  } else {
    alert("Name and contact info are required!");
  }
});

// Call this function when the page loads to initiate the Google API client
window.onload = onClientLoad;
