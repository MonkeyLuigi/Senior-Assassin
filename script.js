let currentUser = null; // To store the current user details

// Function to initialize the Google API client
function initClient() {
    gapi.load('client:auth2', () => {
        gapi.auth2.init({
            client_id: '825538423774-seramrvgddmil226bdmsguii9hnu7gn9.apps.googleusercontent.com',  // Replace with your Google Client ID
            scope: 'https://www.googleapis.com/auth/spreadsheets'
        }).then(() => {
            updateUI();
        }).catch((error) => {
            console.error('Error initializing Google API client:', error);
        });
    });
}

// Function to update UI after successful sign-in
function updateUI() {
    const auth2 = gapi.auth2.getAuthInstance();
    if (auth2.isSignedIn.get()) {
        currentUser = auth2.currentUser.get();
        console.log('User signed in:', currentUser.getBasicProfile().getName());
        document.getElementById('signOutButton').style.display = 'inline-block';
    } else {
        document.getElementById('signOutButton').style.display = 'none';
    }
}

// Function to handle Google Sign-In success
function onSignIn(googleUser) {
    currentUser = googleUser.getBasicProfile();
    console.log("ID Token: " + googleUser.getAuthResponse().id_token);
    updateUI();
}

// Function to handle Sign-Out
function signOut() {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
        console.log("User signed out.");
        currentUser = null;
        updateUI();
    });
}

// Event listeners for New Game and Resume Game buttons
document.getElementById('newGameButton').addEventListener('click', () => {
    if (currentUser) {
        window.location.href = "newGame.html"; // Redirect to new game page
    } else {
        alert('Please sign in first');
    }
});

document.getElementById('resumeGameButton').addEventListener('click', () => {
    if (currentUser) {
        window.location.href = "resumeGame.html"; // Redirect to resume game page
    } else {
        alert('Please sign in first');
    }
});

// Load the Google API client after the page loads
window.onload = function() {
    initClient();
};
