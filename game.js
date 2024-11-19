// Google Sheets API Configuration
const apiKey = "AIzaSyCvd2tJiLia280MuWpa6EZm29kdeyIU3C8";  // Replace with your Google API key

// Buttons and inputs
const submitIdButton = document.getElementById('submitId');
const submitFileButton = document.getElementById('submitFile');
const sheetIdInput = document.getElementById('sheetId');
const fileUploadInput = document.getElementById('fileUpload');

// Listen for user input or file upload

// 1. Handle the manual Google Sheets ID input
submitIdButton.addEventListener('click', function() {
    const sheetId = sheetIdInput.value.trim();

    if (sheetId) {
        console.log('Using Google Sheets ID:', sheetId);
        fetchSheetData(sheetId);  // Call the function to fetch data from Google Sheets
    } else {
        alert("Please enter a valid Google Sheets ID.");
    }
});

// 2. Handle the file upload (Note: This would require file parsing/conversion to a Google Sheet)
submitFileButton.addEventListener('click', function() {
    const file = fileUploadInput.files[0];
    
    if (file) {
        console.log('File selected:', file);
        // You would need logic to upload the file to Google Drive and convert it to a Google Sheet.
        alert("File upload functionality to convert to Google Sheet is not yet implemented.");
    } else {
        alert("Please select a file to upload.");
    }
});

// Function to fetch data from Google Sheets
function fetchSheetData(sheetId) {
    const sheetUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1?key=${apiKey}`;

    fetch(sheetUrl)
        .then(response => response.json())
        .then(data => {
            console.log('Fetched data:', data);
            if (data.values) {
                processSheetData(data.values);  // Handle the sheet data
            } else {
                alert("No data found in the sheet.");
            }
        })
        .catch(error => {
            console.error('Error fetching data from Google Sheets:', error);
            alert('Failed to fetch Google Sheets data.');
        });
}

// Function to process and display sheet data (This is a placeholder for actual logic)
function processSheetData(data) {
    console.log("Processing data...", data);
    // Add your custom logic to handle and display the sheet data
}
