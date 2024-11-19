// Google Client Config
const CLIENT_ID = '825538423774-seramrvgddmil226bdmsguii9hnu7gn9.apps.googleusercontent.com';
const API_KEY = 'AIzaSyCvd2tJiLia280MuWpa6EZm29kdeyIU3C8';
const SPREADSHEET_ID = '1UGn5QjkFzyjeXeLWpfW1jQEL-9_UyvPJlx2bzQF6XmE';
const DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
const SCOPES = "https://www.googleapis.com/auth/spreadsheets";

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded.");

    // Buttons
    const newGameButton = document.getElementById("new-game");
    const resumeGameButton = document.getElementById("resume-game");
    const googleSignInButton = document.getElementById("google-sign-in");

    // New Game Button
    if (newGameButton) {
        newGameButton.addEventListener("click", () => {
            console.log("New Game clicked");
            window.location.href = "newGame.html";
        });
    } else {
        console.error("New Game button not found in the DOM!");
    }

    // Resume Game Button
    if (resumeGameButton) {
        resumeGameButton.addEventListener("click", () => {
            console.log("Resume Game clicked");
            window.location.href = "resumeGame.html";
            handleResumeGame();
        });
    } else {
        console.error("Resume Game button not found in the DOM!");
    }

    // Google Sign-In Button
    if (googleSignInButton) {
        googleSignInButton.addEventListener("click", () => {
            google.accounts.oauth2.initTokenClient({
                client_id: CLIENT_ID, // Replace with your actual client ID
                scope: 'https://www.googleapis.com/auth/spreadsheets',
                callback: (response) => {
                    console.log("Access Token:", response.access_token);
                    // Store the token to use later for API calls
                    localStorage.setItem("googleAccessToken", response.access_token);
                    // Now you can make the API calls
                    handleResumeGame();
                },
            }).requestAccessToken();
        });
    } else {
        console.error("Google Sign-In button not found in the DOM!");
    }

    // Handle Resume Game
    function handleResumeGame() {
        const accessToken = localStorage.getItem("googleAccessToken");

        if (!accessToken) {
            console.error("No access token found. Please sign in.");
            return;
        }

        // Google Sheets API URL to fetch data
        const sheetId = SPREADSHEET_ID; // Replace with your Google Sheets ID
        const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1?access_token=${accessToken}`;

        // Fetch game data from Google Sheets
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                console.log("Fetched game data:", data);
                // If data exists, go to the edit page (e.g., based on player status)
                if (data && data.values) {
                    window.location.href = "edit_game.html"; // Redirect to the edit game page
                } else {
                    console.error("No data found.");
                }
            })
            .catch(error => {
                console.error("Error fetching data from Google Sheets:", error);
            });
    }

    // Handle New Game (Add new player)
    function handleNewGame(playerName, contactInfo, playerImage) {
        const accessToken = localStorage.getItem("googleAccessToken");

        if (!accessToken) {
            console.error("No access token found. Please sign in.");
            return;
        }

        // Prepare new player data (replace with actual form data from your page)
        const newPlayerData = [
            [playerName, contactInfo, playerImage, 'Alive'] // Example format for new data
        ];

        const sheetId = SPREADSHEET_ID; // Replace with your Google Sheets ID
        const range = "Sheet1!A1:D1"; // Define where to insert new data

        const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}:append?valueInputOption=RAW&access_token=${accessToken}`;

        // Make the API request to add a new row
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                values: newPlayerData
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log("Added new player data:", data);
                // Optionally redirect or show a success message
                alert("New player added successfully!");
            })
            .catch(error => {
                console.error("Error adding new player data:", error);
            });
    }
});

