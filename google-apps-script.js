// =====================================================================
// GOOGLE APPS SCRIPT — CHILL HOUSE CONTACT FORM → GOOGLE SHEETS
// =====================================================================
// HOW TO USE:
// 1. Create a new Google Sheet with these column headers in Row 1:
//    Name | Phone | Email | Message | Timestamp
// 2. Open Extensions → Apps Script
// 3. Delete any existing code and paste THIS entire script
// 4. Save (Ctrl+S)
// 5. Click "Deploy" → "New deployment"
//    - Type: Web app
//    - Execute as: Me
//    - Who has access: Anyone
//    - Click Deploy → Authorize → Copy the Web App URL
// 6. Paste that URL as GOOGLE_SHEET_URL in src/pages/Contact.jsx
// =====================================================================

function doGet(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    const name      = e.parameter.name      || '';
    const phone     = e.parameter.phone     || '';
    const email     = e.parameter.email     || '';
    const message   = e.parameter.message   || '';
    const timestamp = e.parameter.timestamp || new Date().toISOString();

    sheet.appendRow([name, phone, email, message, new Date(timestamp)]);

    // Optional: Send email notification to admin
    MailApp.sendEmail({
      to: 'contact@mornrich.com',
      subject: `🍦 New Lead from Chill House Website — ${name}`,
      htmlBody: `
        <div style="font-family:sans-serif;max-width:500px;margin:auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);">
          <div style="background:linear-gradient(135deg,#F48FB1,#e06b92);padding:24px;text-align:center;">
            <h1 style="color:white;font-size:1.5rem;margin:0;">🍦 New Contact Lead</h1>
          </div>
          <div style="padding:24px;">
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:8px 0;color:#888;font-size:0.85rem;width:90px">Name</td><td style="padding:8px 0;font-weight:600">${name}</td></tr>
              <tr><td style="padding:8px 0;color:#888;font-size:0.85rem;">Phone</td><td style="padding:8px 0;font-weight:600">${phone}</td></tr>
              <tr><td style="padding:8px 0;color:#888;font-size:0.85rem;">Email</td><td style="padding:8px 0;font-weight:600">${email}</td></tr>
              <tr><td style="padding:8px 0;color:#888;font-size:0.85rem;vertical-align:top;">Message</td><td style="padding:8px 0;">${message}</td></tr>
              <tr><td style="padding:8px 0;color:#888;font-size:0.85rem;">Received</td><td style="padding:8px 0;font-size:0.85rem;color:#aaa;">${timestamp}</td></tr>
            </table>
          </div>
          <div style="background:#fce4f0;padding:12px 24px;text-align:center;font-size:0.8rem;color:#888;">
            Chill House Ice Cream Lounge · Nikol, Ahmedabad
          </div>
        </div>
      `
    });

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
