// Google Client Config
const CLIENT_ID = '825538423774-seramrvgddmil226bdmsguii9hnu7gn9.apps.googleusercontent.com';
const API_KEY = 'AIzaSyCvd2tJiLia280MuWpa6EZm29kdeyIU3C8';
const SPREADSHEET_ID = '1UGn5QjkFzyjeXeLWpfW1jQEL-9_UyvPJlx2bzQF6XmE';
const DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
const SCOPES = "https://www.googleapis.com/auth/spreadsheets";

document.addEventListener("DOMContentLoaded", () => {
    const newGameButton = document.getElementById("new-game");
    const resumeGameButton = document.getElementById("resume-game");

    if (!newGameButton || !resumeGameButton) {
        console.error("Buttons not found in the DOM!");
        return;
    }

    // Add event listeners to buttons
    newGameButton.addEventListener("click", () => {
        console.log("New game started.");
        window.location.href = "new_game.html";
    });

    resumeGameButton.addEventListener("click", resumeGame);
});

// Resume Game function
function resumeGame() {
    console.log("Resuming game...");
    gapi.load("client:auth2", () => {
        gapi.auth2.init({
            client_id: CLIENT_ID,
        }).then(() => {
            const authInstance = gapi.auth2.getAuthInstance();
            if (authInstance.isSignedIn.get()) {
                console.log("User signed in. Fetching game data...");
                window.location.href = "edit_game.html";
            } else {
                console.log("User not signed in. Prompting login...");
                authInstance.signIn().then(() => {
                    window.location.href = "edit_game.html";
                });
            }
        }).catch(error => {
            console.error("Error initializing Google API client:", error);
        });
    });
}
