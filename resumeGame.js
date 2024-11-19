// Ensure the Google API client is loaded and authenticated
function onClientLoad() {
  gapi.load('client:auth2', initClient);
}

function initClient() {
  gapi.client.init({
    apiKey: 'AIzaSyCvd2tJiLia280MuWpa6EZm29kdeyIU3C8', // Replace with your API key
    clientId: '825538423774-seramrvgddmil226bdmsguii9hnu7gn9.apps.googleusercontent.com', // Replace with your Client ID
    scope: 'https://www.googleapis.com/auth/spreadsheets.readonly',
    discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
  }).then(function () {
    console.log("Google API Client Initialized");
  }).catch(function (error) {
    console.error("Error initializing Google API client:", error);
  });
}

// Check if user is signed in
function checkSignInStatus() {
  if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
    fetchPlayerData(); // If signed in, fetch player data
  } else {
    console.log('User not signed in.');
  }
}

// Fetch player data from the Google Sheet
function fetchPlayerData() {
  const spreadsheetId = '1UGn5QjkFzyjeXeLWpfW1jQEL-9_UyvPJlx2bzQF6XmE'; // Replace with your Google Sheet ID
  const range = 'Sheet1!A2:D'; // Adjust the range based on where your player data is

  gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: spreadsheetId,
    range: range,
  }).then(function (response) {
    const data = response.result.values;
    if (data && data.length > 0) {
      displayPlayerData(data); // Call a function to display data
    } else {
      console.log('No player data found.');
    }
  }).catch(function (error) {
    console.error("Error fetching player data:", error);
  });
}

// Display player data in a table or a list on the page
function displayPlayerData(players) {
  const table = document.getElementById('player-data');
  players.forEach(function(player) {
    const row = table.insertRow();
    player.forEach(function(cellData) {
      const cell = row.insertCell();
      cell.textContent = cellData;
    });
  });
}

// Listen for the sign-in status
document.getElementById('sign-in').addEventListener('click', function() {
  gapi.auth2.getAuthInstance().signIn().then(checkSignInStatus);
});

// Call this function when the page loads to initiate the Google API client
window.onload = onClientLoad;
