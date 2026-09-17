// 1. Create a new Google Sheet
// 2. Add headers to the first row matching these exactly:
// SL NO | TEAM NAME | TEAM LEADER'S NAME | LEADER'S EMAIL | LEADER'S PHONE NUMBER | TEAM LEADER COLLEGE | TEAM MEMBER 2 | TEAM MEMBER 2 EMAIL | TEAM MEMBER 2 PHONE NUMBER | TEAM MEMBER 2 COLLEGE | TEAM MEMBER 3 | TEAM MEMBER 3 EMAIL | TEAM MEMBER 3 PHONE NUMBER | TEAM MEMBER 3 COLLEGE | TEAM MEMBER 4 | TEAM MEMBER 4 EMAIL | TEAM MEMBER 4 PHONE NUMBER | TEAM MEMBER 4 COLLEGE | DOMAIN | TIMESTAMP
// 3. Go to Extensions > Apps Script
// 4. Paste this entire code into Code.gs (replace any existing code)
// 5. Click Deploy > New Deployment
// 6. Select Type: Web App
// 7. Execute as: Me
// 8. Who has access: Anyone
// 9. Click Deploy, Authorize access, and copy the Web App URL
// 10. Paste the URL into the script.js file in your code!

const sheetName = 'Sheet1'; // Change this if your sheet name is different

function doPost(e) {
  try {
    const doc = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = doc.getSheetByName(sheetName);
    
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    // Get the next row number
    const nextRow = sheet.getLastRow() + 1;
    
    // Auto-generate SL NO (Serial Number) based on the row number
    const slNo = nextRow - 1;
    
    // Build the row data based on the headers
    const newRow = headers.map(function(header) {
      if (header === 'TIMESTAMP') return new Date();
      if (header === 'SL NO') return slNo;
      
      // Map sheet headers to form input names
      switch(header) {
        case 'TEAM NAME': return e.parameter.teamName || '';
        case 'TEAM LEADER\'S NAME': return e.parameter.leaderName || '';
        case 'LEADER\'S EMAIL': return e.parameter.leaderEmail || '';
        case 'LEADER\'S PHONE NUMBER': return e.parameter.leaderPhone || '';
        case 'TEAM LEADER COLLEGE': return e.parameter.leaderCollege || '';
        
        case 'TEAM MEMBER 2': return e.parameter.member2Name || '';
        case 'TEAM MEMBER 2 EMAIL': return e.parameter.member2Email || '';
        case 'TEAM MEMBER 2 PHONE NUMBER': return e.parameter.member2Phone || '';
        case 'TEAM MEMBER 2 COLLEGE': return e.parameter.member2College || '';
        
        case 'TEAM MEMBER 3': return e.parameter.member3Name || '';
        case 'TEAM MEMBER 3 EMAIL': return e.parameter.member3Email || '';
        case 'TEAM MEMBER 3 PHONE NUMBER': return e.parameter.member3Phone || '';
        case 'TEAM MEMBER 3 COLLEGE': return e.parameter.member3College || '';
        
        case 'TEAM MEMBER 4': return e.parameter.member4Name || '';
        case 'TEAM MEMBER 4 EMAIL': return e.parameter.member4Email || '';
        case 'TEAM MEMBER 4 PHONE NUMBER': return e.parameter.member4Phone || '';
        case 'TEAM MEMBER 4 COLLEGE': return e.parameter.member4College || '';
        
        case 'DOMAIN': return e.parameter.domain || '';
        
        default: return '';
      }
    });
    
    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
