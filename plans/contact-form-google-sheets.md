# Contact Form Data Saving Plan - Google Sheets Integration

## Overview
Save contact form submissions from your portfolio website to a Google Sheet for easy access and management.

## Architecture
```
Contact Form → Express API → Google Sheets API → Google Sheet (in Drive)
```

## Implementation Steps

### Step 1: Google Cloud Setup (You need to do this)
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable **Google Sheets API**:
   - Navigate to API & Services → Library
   - Search for "Google Sheets API"
   - Click Enable
4. Create a **Service Account**:
   - Go to IAM & Admin → Service Accounts
   - Click Create Service Account
   - Name: "Contact Form Service"
   - Role: Editor
   - Create and download JSON key
5. Create a **Google Sheet**:
   - Go to Google Sheets and create a new sheet
   - Add headers in row 1: `Timestamp | First Name | Last Name | Email | Phone | Message`
   - Copy the Sheet ID from the URL (between `/d/` and `/edit`)
6. Share the sheet with the service account email:
   - Open the Google Sheet
   - Click Share → Add the service account email (from JSON file)
   - Give Editor access

### Step 2: Environment Variables
Add these to `server/.env`:
```env
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour Private Key Here\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=your-spreadsheet-id-from-url
```

### Step 3: Backend Code Changes

#### Install dependency:
```bash
cd server && npm install googleapis
```

#### Create contact route: `routes/contacts.js`
```javascript
const express = require('express');
const { google } = require('googleapis');
require('dotenv').config();

const router = express.Router();

// Google Sheets setup
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const auth = new google.auth.JWT(
  process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  null,
  process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  SCOPES
);
const sheets = google.sheets({ version: 'v4', auth });

// POST /api/contacts - Save contact form data
router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, message } = req.body;
    const timestamp = new Date().toISOString();

    // Validate required fields
    if (!firstName || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide first name, email, and message'
      });
    }

    // Append row to Google Sheet
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Sheet1!A:A',
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [[timestamp, firstName, lastName, email, phoneNumber, message]]
      }
    });

    res.json({
      success: true,
      message: 'Contact form submitted successfully!',
      data: response.data
    });
  } catch (error) {
    console.error('Error saving contact form:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit contact form. Please try again.'
    });
  }
});

module.exports = router;
```

#### Update `server/server.js`:
Add this line after the project routes:
```javascript
const contactRoutes = require('../routes/contacts');
// ... later in the file
app.use('/api/contacts', contactRoutes);
```

### Step 4: Frontend Updates

#### Update form submission in `index.html`:
Replace the existing form submit handler (around line 547) with:
```javascript
contactForm.addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;
  
  const formData = new FormData(contactForm);
  const data = Object.fromEntries(formData.entries());
  
  try {
    const response = await fetch('/api/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    
    const result = await response.json();
    
    if (result.success) {
      alert('Thank you for your message! We will get back to you soon.');
      contactForm.reset();
    } else {
      alert('Error: ' + result.message);
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    alert('Failed to submit form. Please try again.');
  } finally {
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }
});
```

## Google Sheet Format
Your Google Sheet should have these column headers in row 1:
| A | B | C | D | E | F |
|---|---|---|---|---|---|
| Timestamp | First Name | Last Name | Email | Phone | Message |

## Security Notes
- Never commit the `server/.env` file to version control
- Add `.env` to `.gitignore`
- The service account should have minimal permissions (just Editor for the specific sheet)
