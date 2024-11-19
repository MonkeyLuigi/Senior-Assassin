document.getElementById('newPlayerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const playerName = document.getElementById('name').value;
    const contactInfo = document.getElementById('contact').value;
    const imageUrl = document.getElementById('image').value;

    if (playerName && contactInfo) {
        // Add player to Google Sheets
        addPlayerToGoogleSheets(playerName, contactInfo, imageUrl);
    } else {
        alert('Please fill in all required fields');
    }
});

function addPlayerToGoogleSheets(name, contact, imageUrl) {
    // Your code for interacting with Google Sheets API to add data
    console.log(`Adding player: ${name}, ${contact}, ${imageUrl}`);
    // You would typically use the Google Sheets API here to save data
}
