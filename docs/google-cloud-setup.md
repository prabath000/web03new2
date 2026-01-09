# Google Cloud Setup Guide for Contact Form

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click **"Select a project"** at the top (next to Google Cloud logo)
3. Click **"New Project"**
4. Enter project name: `Contact Form API`
5. Select a location (you can leave as "No organization")
6. Click **"Create"**
7. Wait for the project to be created (this may take a few seconds)

## Step 2: Enable Google Sheets API

1. In the Google Cloud Console, make sure your new project is selected
2. In the left sidebar, go to **APIs & Services** → **Library**
3. In the search box, type **"Google Sheets API"**
4. Click on **Google Sheets API** from the results
5. Click **"Enable"**
6. Wait for the API to be enabled

## Step 3: Create a Service Account

1. In the left sidebar, go to **IAM & Admin** → **Service Accounts**
2. Click **"Create Service Account"**
3. Fill in the details:
   - **Service account name**: `contact-form-service`
   - **Service account ID**: This will auto-generate (you can leave it)
   - **Description**: `Service account for contact form to write to Google Sheets`
4. Click **"Create and Continue"**
5. In the "Grant this service account access to project" section:
   - Select role: **Basic** → **Editor**
6. Click **"Continue"**
7. Click **"Done"** (you don't need to grant users access to this service account)

## Step 4: Generate Service Account Key (JSON)

1. In the Service Accounts list, find your newly created service account
2. Click on the **email address** (it looks like `contact-form-service@your-project.iam.gserviceaccount.com`)
3. Click on the **"Keys"** tab
4. Click **"Add Key"** → **"Create new key"**
5. Select **"JSON"** as the key type
6. Click **"Create"**
7. A JSON file will be downloaded to your computer - **save this file securely!**

## Step 5: Create Google Sheet for Contacts

1. Go to [Google Sheets](https://sheets.google.com/)
2. Click **"Blank"** to create a new spreadsheet
3. Rename the sheet (click on "Untitled spreadsheet" at the top) to `Contact Form Data`
4. In row 1, add these column headers:
   - **A1**: `Timestamp`
   - **B1**: `First Name`
   - **C1**: `Last Name`
   - **D1**: `Email`
   - **E1**: `Phone`
   - **F1**: `Message`
5. Save the spreadsheet (File → Save, or Ctrl+S)
6. Copy the spreadsheet ID from the URL:
   - The URL looks like: `https://docs.google.com/spreadsheets/d/YOUR_SPREADSHEET_ID/edit`
   - Copy the part between `/d/` and `/edit` - this is your **SPREADSHEET_ID**

## Step 6: Share Google Sheet with Service Account

1. In your Google Sheet, click the **"Share"** button (top right)
2. In the "Add people and groups" field, paste the service account email address:
   - This is the email from Step 3 (e.g., `contact-form-service@your-project.iam.gserviceaccount.com`)
3. Click the dropdown and select **"Editor"**
4. Click **"Send"** (or **"Share"**)

## Step 7: Configure Environment Variables

1. Open the downloaded JSON key file in a text editor (like Notepad)
2. Copy these values:
   - **`client_email`**: The service account email (looks like `...@your-project.iam.gserviceaccount.com`)
   - **`private_key`**: The long private key string (starts with `-----BEGIN PRIVATE KEY-----`)
3. Open `server/.env` file in your project
4. Update these lines with your actual values:

```env
# Google Sheets Configuration (for contact form)
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account-email@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----
your-very-long-private-key-here
-----END PRIVATE KEY-----
"
GOOGLE_SHEET_ID=your-spreadsheet-id-from-url
```

**Important Notes:**
- The `private_key` should have `\n` characters preserved for line breaks
- Keep your JSON key file secure - don't commit it to GitHub
- Add `server/.env` to your `.gitignore` file

## Step 8: Install Dependencies and Test

1. Open terminal in the `server` folder:
   ```bash
   cd server
   npm install
   ```

2. Start the server:
   ```bash
   npm start
   ```

3. Test the contact form on your website - it should now save data to your Google Sheet!

## Troubleshooting

**Error: "Service account not authorized"**
- Make sure you enabled the Google Sheets API (Step 2)
- Make sure you shared the Google Sheet with the service account email (Step 6)

**Error: "Private key not valid"**
- The private key in `.env` must include the `\n` characters
- Copy exactly from the JSON file, including all line breaks

**Error: "Spreadsheet not found"**
- Check that your `GOOGLE_SHEET_ID` is correct from the URL
- Make sure the service account email has access to the sheet

**Data not appearing in sheet:**
- Wait a few seconds after form submission
- Check the server console for error messages
- Make sure the sheet has headers in row 1 exactly as shown in Step 5
