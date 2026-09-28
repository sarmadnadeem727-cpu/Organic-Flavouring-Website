/**
 * Google Apps Script Web App for Organic Flavouring Orders
 *
 * HOW TO SET UP:
 * 1. Open Google Sheets (create a new blank spreadsheet, e.g. "Organic Flavouring Orders").
 * 2. In row 1, set these header columns:
 *    A: Timestamp
 *    B: Order ID
 *    C: Status
 *    D: Customer Name
 *    E: Phone
 *    F: Email
 *    G: City
 *    H: Address
 *    I: Notes
 *    J: Items List
 *    K: Subtotal (PKR)
 *    L: Shipping (PKR)
 *    M: Total (PKR)
 *    N: UTM Source
 *    O: UTM Medium
 *    P: UTM Campaign
 *    Q: UTM Content
 *    R: Click ID
 *    S: User Agent
 *
 * 3. Go to Extensions -> Apps Script.
 * 4. Paste this entire code into Code.gs, replacing any placeholder code.
 * 5. Click "Deploy" -> "New deployment".
 * 6. Select Type: "Web app".
 *    - Description: "Order Receiver API"
 *    - Execute as: "Me"
 *    - Who has access: "Anyone" (crucial so your website backend can post orders).
 * 7. Click "Deploy" and authorize access.
 * 8. Copy the Web App URL (starts with https://script.google.com/macros/s/...)
 * 9. Add to your .env or Vercel Environment Variables:
 *    VITE_GOOGLE_SHEETS_WEBHOOK_URL="https://script.google.com/macros/s/..."
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000); // Wait up to 10 seconds for concurrent writes
  } catch (lockErr) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: "Server busy, could not acquire lock"
    })).setMimeType(ContentService.MimeType.JSON);
  }

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var payload = JSON.parse(e.postData.contents);

    // Deduplication check: check if orderId already exists in column B
    var lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      var existingIds = sheet.getRange(2, 2, lastRow - 1, 1).getValues();
      for (var i = 0; i < existingIds.length; i++) {
        if (existingIds[i][0] === payload.orderId) {
          return ContentService.createTextOutput(JSON.stringify({
            status: "success",
            message: "Order already recorded (idempotent)",
            orderId: payload.orderId
          })).setMimeType(ContentService.MimeType.JSON);
        }
      }
    }

    var row = [
      new Date(),
      payload.orderId || "",
      payload.status || "New",
      payload.customerName || "",
      payload.customerPhone || "",
      payload.customerEmail || "",
      payload.customerCity || "",
      payload.customerAddress || "",
      payload.customerNotes || "",
      payload.itemsList || "",
      payload.subtotal || 0,
      payload.shipping || 0,
      payload.total || 0,
      payload.utmSource || "",
      payload.utmMedium || "",
      payload.utmCampaign || "",
      payload.utmContent || "",
      payload.clickId || "",
      payload.userAgent || ""
    ];

    sheet.appendRow(row);

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      orderId: payload.orderId
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}
