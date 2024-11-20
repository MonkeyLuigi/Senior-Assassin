// Initialize the API client
function initClient() {
    // Load the Sheets API client
    gapi.client.init({
        apiKey: 'AIzaSyCvd2tJiLia280MuWpa6EZm29kdeyIU3C8', // Replace with your API key
        clientId: '825538423774', // Replace with your Client ID
        scope: 'https://www.googleapis.com/auth/spreadsheets',
        discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    }).then(() => {
        console.log('Google API client initialized');
        // You can add any other logic needed after the API client is initialized
    }).catch((error) => {
        console.error('Error initializing Google API client', error);
    });
}

document.addEventListener('DOMContentLoaded', (event) => {
    // Ensure gapi is loaded before using it
    if (typeof gapi !== 'undefined') {
        gapi.load('client:auth2', initClient);
    } else {
        console.error('Google API client library is not loaded');
    }

    // Ensure the button exists before trying to add an event listener
    const startGameButton = document.getElementById('start-game');
    const resumeGameButton = document.getElementById('resume-game');

    if (startGameButton) {
        // Add the event listener for starting a new game
        startGameButton.addEventListener('click', () => {
            console.log('Starting a new game');

            // Create a new Google Sheet to store the player's data for a new game
            createNewGameSheet().then(sheetId => {
                console.log(`New game created with Sheet ID: ${sheetId}`);
                // Redirect to the new game page or open the new sheet for player details
                window.location.href = `newGamePage.html?sheetId=${sheetId}`;
            }).catch(error => {
                console.error('Error creating new game sheet:', error);
            });
        });
    }

    if (resumeGameButton) {
        // Add event listener for resuming a game
        resumeGameButton.addEventListener('click', () => {
            const userEmail = 'user@example.com'; // You should dynamically get the user's email after they sign in
            console.log('Resuming game for:', userEmail);

            resumeGame(userEmail).then(() => {
                console.log('Resumed game successfully');
                // Redirect to the existing game page (using the user's sheet ID)
                window.location.href = `resumeGamePage.html?sheetId=${userEmail}`;
            }).catch(error => {
                console.error('Error resuming game:', error);
            });
        });
    }
});

// Function to create a new Google Sheet for a new game
function createNewGameSheet() {
    return new Promise((resolve, reject) => {
        const spreadsheet = {
            properties: {
                title: 'Senior Assassin Game'
            },
            sheets: [{
                properties: {
                    title: 'Players'
                }
            }]
        };

        // Make an API request to Google Sheets API to create a new sheet
        gapi.client.sheets.spreadsheets.create(spreadsheet).then(response => {
            const sheetId = response.result.spreadsheetId;
            resolve(sheetId);
        }).catch(error => {
            reject(error);
        });
    });
}

// Function to resume an existing game using the player's email
function resumeGame(userEmail) {
    return new Promise((resolve, reject) => {
        // Get the sheet ID based on the player's email
        // For this example, you would need to manage or store the sheet IDs per user (this part would be in your server or database)
        // Here, we just simulate it by checking against a sample condition
        const sampleSheetId = '1UGn5QjkFzyjeXeLWpfW1jQEL-9_UyvPJlx2bzQF6XmE'; // Replace with logic to get the correct sheet ID for the user

        if (sampleSheetId) {
            resolve();
        } else {
            reject('No game found for this user');
        }
    });
}
