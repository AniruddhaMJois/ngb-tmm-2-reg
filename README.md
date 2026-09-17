# NextGen Build-A-Thon Registration

A clean, responsive registration webpage designed for the NextGen Build-A-Thon. It captures team details and directly syncs the submissions to a Google Spreadsheet via Google Apps Script.

## Features
- **Responsive UI:** Dark blue and white theme with clean form fieldsets.
- **Direct Database Sync:** Uses the Fetch API to post form data directly to Google Sheets without needing a backend server.
- **Asynchronous Submission:** Users aren't redirected upon submission; success/error messages appear inline.

## Google Sheets Integration
To connect this form to your Google Spreadsheet:
1. Open the included `google-apps-script.js` file.
2. Follow the steps inside to deploy the script as a Web App on your Google Sheet.
3. Paste the generated Web App URL into `script.js` (line 18).

## Local Development
Run a local server to view the webpage:
```bash
python -m http.server
```
Then visit `http://localhost:8000` in your browser.
