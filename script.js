// Google Client Config
const CLIENT_ID = '825538423774-seramrvgddmil226bdmsguii9hnu7gn9.apps.googleusercontent.com';
const API_KEY = 'AIzaSyCvd2tJiLia280MuWpa6EZm29kdeyIU3C8';
const SPREADSHEET_ID = '1UGn5QjkFzyjeXeLWpfW1jQEL-9_UyvPJlx2bzQF6XmE';
const DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
const SCOPES = "https://www.googleapis.com/auth/spreadsheets";

function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
    }).then(() => {
        const authInstance = gapi.auth2.getAuthInstance();
        const signInDiv = document.getElementById('g-signin2');

        // Render Google Sign-In Button
        gapi.signin2.render(signInDiv, {
            scope: SCOPES,
            width: 240,
            height: 50,
            longtitle: true,
            theme: "dark",
        });

        authInstance.isSignedIn.listen(updateSigninStatus);
        updateSigninStatus(authInstance.isSignedIn.get());
    }).catch(error => {
        console.error("Error initializing Google API client:", error);
    });
}

function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        console.log("User signed in!");
    } else {
        console.log("User not signed in!");
    }
}

// Load the Google API library and initialize the client
function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

// Attach handlers to buttons
document.getElementById("new-game").addEventListener("click", () => {
    if (!gapi.auth2.getAuthInstance().isSignedIn.get()) {
        alert("Please sign in first!");
        return;
    }
    window.location.href = "new-game.html";
});

document.getElementById("resume-game").addEventListener("click", () => {
    if (!gapi.auth2.getAuthInstance().isSignedIn.get()) {
        alert("Please sign in first!");
        return;
    }
    window.location.href = "edit-game.html";
});

// Ensure the Google API is loaded
window.addEventListener('load', handleClientLoad);
