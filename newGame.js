document.addEventListener('DOMContentLoaded', (event) => {
    // Ensure the button exists before trying to add an event listener
    const startGameButton = document.getElementById('start-game');
    const resumeGameButton = document.getElementById('resume-game');

    // Add the event listener for starting a new game
    if (startGameButton) {
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
    } else {
        console.error('Start game button not found!');
    }

    // Add the event listener for resuming an existing game
    if (resumeGameButton) {
        resumeGameButton.addEventListener('click', () => {
            console.log('Resuming the game');

            // Check if the user is signed in and can access their Google Sheets
            if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
                const userEmail = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getEmail();
                resumeGame(userEmail).then(() => {
                    console.log('Game resumed successfully');
                    // Redirect to the game page where they can continue editing their data
                    window.location.href = 'editGamePage.html';
                }).catch(error => {
                    console.error('Error resuming game:', error);
                });
            } else {
                console.log('User is not signed in.');
            }
        });
    } else {
        console.error('Resume game button not found!');
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
