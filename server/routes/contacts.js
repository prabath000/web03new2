const express = require('express');
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const router = express.Router();

// Google Sheets setup
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

// Helper function to get auth client
const getAuth = () => {
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  return new google.auth.JWT(
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    null,
    privateKey,
    SCOPES
  );
};

// Helper function to save to local JSON file
const saveToLocalFile = (data) => {
  const contactsFile = path.join(__dirname, '..', 'data', 'contacts.json');
  let contacts = [];
  
  // Read existing data
  if (fs.existsSync(contactsFile)) {
    try {
      const fileContent = fs.readFileSync(contactsFile, 'utf8');
      contacts = JSON.parse(fileContent);
    } catch (e) {
      contacts = [];
    }
  }
  
  // Add new contact
  contacts.push(data);
  
  // Save to file
  fs.writeFileSync(contactsFile, JSON.stringify(contacts, null, 2));
  return contacts.length;
};

// POST /api/contacts - Save contact form data
router.post('/', async (req, res) => {
  console.log('Received contact form submission:', req.body);
  
  try {
    const { firstName, lastName, email, phoneNumber, message } = req.body;
    const timestamp = new Date().toISOString();

    // Validate required fields
    if (!firstName || !email || !message) {
      console.log('Validation failed: missing required fields');
      return res.status(400).json({
        success: false,
        message: 'Please provide first name, email, and message'
      });
    }

    const contactData = { timestamp, firstName, lastName, email, phoneNumber, message };

    // Check if Google Sheets credentials are configured
    const hasGoogleConfig = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && 
                            process.env.GOOGLE_PRIVATE_KEY && 
                            process.env.GOOGLE_SHEET_ID;

    if (hasGoogleConfig) {
      try {
        console.log('Attempting to save to Google Sheets...');
        const auth = getAuth();
        const sheets = google.sheets({ version: 'v4', auth });

        // Append row to Google Sheet
        const response = await sheets.spreadsheets.values.append({
          spreadsheetId: process.env.GOOGLE_SHEET_ID,
          range: 'Sheet1!A:A',
          valueInputOption: 'USER_ENTERED',
          resource: {
            values: [[timestamp, firstName, lastName, email, phoneNumber, message]]
          }
        });

        console.log('Successfully saved to Google Sheets');
        res.json({
          success: true,
          message: 'Contact form submitted successfully!',
          source: 'google-sheets',
          data: response.data
        });
      } catch (googleError) {
        console.error('Google Sheets error, saving locally:', googleError.message);
        // Fallback to local file
        const count = saveToLocalFile(contactData);
        res.json({
          success: true,
          message: 'Contact form submitted! (Saved locally - Google Sheets unavailable)',
          source: 'local-file',
          totalContacts: count
        });
      }
    } else {
      // Save to local JSON file
      console.log('Google Sheets not configured, saving contact to local file...');
      const count = saveToLocalFile(contactData);
      console.log('Successfully saved to local file. Total contacts:', count);
      res.json({
        success: true,
        message: 'Contact form submitted successfully! (Saved to local file)',
        source: 'local-file',
        totalContacts: count
      });
    }
  } catch (error) {
    console.error('Error saving contact form:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit contact form. Please try again.',
      error: error.message
    });
  }
});

module.exports = router;
