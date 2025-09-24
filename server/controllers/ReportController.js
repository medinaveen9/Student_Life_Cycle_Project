const puppeteer = require('puppeteer');

const generateReport = async (req, res) => {
  try {
    const { data, month, year } = req.body;

    // ✅ Fallbacks if values are not passed
    const now = new Date();
    const reportMonth = month || now.toLocaleString("en-US", { month: "long" });
    const reportYear = year || now.getFullYear();
    const reportDate = now.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    // ✅ Calculate total amount
    const totalAmount = data.reduce(
      (sum, row) => sum + (parseInt(row.stipend) || 0),
      0
    );

    // ✅ Prepare Combined HTML (Page 1 + Page 2)
    const combinedHtml = `
<html>
<head>
  <meta charset="UTF-8">
  <title>Stipend Report</title>
  <style>
    body {
      font-family: 'Times New Roman', serif;
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-size: 11pt;
      line-height: 1.5;
    }
    .page {
      width: 210mm; /* A4 width */
      min-height: 297mm; /* A4 height */
      padding: 25mm 20mm;
      margin: 0 auto;
      box-sizing: border-box;
      page-break-after: always;
    }
    .page:last-child {
      page-break-after: avoid;
    }

    /* Page 1 */
    .nursing-title { font-family: 'Georgia', serif; font-size: 24pt; text-align: right; margin: 0 0 20px 0; color: #333; }
    .header { display: flex; margin-bottom: 20px; }
    .header-left { display: flex; }
    .logo { width: 50px; height: 50px; margin-right: 15px; }
    .university-details { font-size: 10pt; }
    .university-details div:first-child { font-weight: bold; }
    .rc-date { display: flex; justify-content: space-between; margin-bottom: 30px; font-size: 10pt; }
    .sanction-order-title { text-align: center; font-size: 14pt; font-weight: bold; margin-bottom: 20px; text-decoration: underline; }
    .section-heading { font-weight: bold; margin-bottom: 5px; font-size: 10pt; }
    .content-block { margin-bottom: 15px; font-size: 10pt; }
    ul { list-style-type: decimal; padding-left: 20px; font-size: 10pt; }
    .signature-block { text-align: right; margin-top: 50px; font-size: 10pt; }
    .footer-block { margin-top: 30px; font-size: 10pt; }

    /* Page 2 */
    .note-section { font-size: 9pt; margin-bottom: 20px; }
    .note-title { font-weight: bold; display: flex; justify-content: space-between; margin-bottom: 5px; }
    .main-heading { text-align: center; font-weight: bold; font-size: 11pt; margin-bottom: 15px; }
    table { width: 100%; border-collapse: collapse; font-size: 9pt; }
    th, td { border: 1px solid black; padding: 4px; text-align: center; }
    th { background-color: #f0f0f0; }
    .total-amount-row td { text-align: right; font-weight: bold; }
  </style>
</head>
<body>
  <!-- Page 1 -->
  <div class="page">
    <div class="header">
      <div class="header-left">
        <img src="https://upload.wikimedia.org/wikipedia/en/thumb/9/91/Nizam%27s_Institute_of_Medical_Sciences_logo.png/1200px-Nizam%27s_Institute_of_Medical_Sciences_logo.png" class="logo"/>
        <div class="university-details">
          <div>Nizam's Institute of Medical Sciences</div>
          (A University established under the State Act)<br/>
          Punjagutta: Hyderabad -500 082
        </div>
      </div>
    </div>

    <div class="rc-date">
      <div>Rc.No.AC-2/161/2021/Stipend B.Sc (N)</div>
      <div>Date: ${reportDate}</div>
    </div>

    <div class="sanction-order-title">SANCTION ORDER</div>
    <div class="section-heading">Sub: Sub: AD-AC-2 - Sanction of stipend to B.Sc. (N) 1st year students for the month of ${reportMonth}, ${reportYear}- Sanction orders - Issued - Reg.</div>

    <div class="section-heading">Ref:</div>
    <ul>
      <li>G.O.Ms.No. 150, HM & FW Dept Dt: 03.11.2021</li>
      <li>This O/o No. AC2/161/2021/Stipend, Dt: 01.04.2022</li>
      <li>Letter No. CON/03/348, Dated 23/07/2025 received from Principal, CON</li>
      <li>Note approval Dated 06-08-2025.</li>
    </ul>

    <p style="text-align:center; font-size:14pt; margin:20px 0;">***</p>
    <div class="content-block">
        As per the orders issued vide reference 1st & 2nd cited, the 1st year B.Sc.(N) students are eligible to draw the stipend of Rs. 5,000/- per month (Rupees five thousand only) till the end of 1st year course excluding the students those who are drawing scholarship.
    </div>
    <div class="content-block">
          Sanction is hereby accorded for an amount of Rs. 5,18,498/- (Rupees five lakhs eighteen thousand four hundred and ninety eight only) towards stipend to be disbursed to the 1st year B.Sc (N) students for the month of June, ${reportYear}. The stipend shall be paid every month based on the attendance received from I/c Principal, College of Nursing.
      </div>

      <div class="content-block">
          The claims section is hereby requested to claim the stipend and arrange for the disbursement of stipend to issue an individual through NEFT transfer to the 1st year B.Sc.(N) students mentioned at annexure on the claim made by the Principal, College of Nursing, NIMS.
      </div>

      <div class="content-block">
          The expenditure shall be debited to the Head of account "General Administration charges" - Academic fund account.
      </div>
    <div class="signature-block">
      <div>Dr.D.Sree Bhushan Raju</div>
      Associate Dean (AC-2)
    </div>

    <div class="footer-block">
        To<br/>
        The Claims Section, NIMS.
    </div>

    <div class="footer-block">
        Copy to:<br/>
        The Principal CON, with a request to send the monthly attendance report to claims section.
    </div>
  </div>

  <!-- Page 2 -->
  <div class="page">
    <div class="note-section">
      <div class="note-title">
        <div>Note: -349-</div>
        <div>File No. AC2/161/2021/Stipend B.Sc (N)</div>
      </div>
      186) Kindly peruse the letter... attendance details as follows:
    </div>

    <div class="main-heading">ATTENDANCE DETAILS FOR 1st YEAR ${reportMonth}, ${reportYear}</div>

    <table>
      <thead>
        <tr>
          <th rowspan="2" style="width:5%;">S.No.</th>
          <th rowspan="2" style="width:8%;">ROLL No.</th>
          <th rowspan="2" style="width:25%;">NAME OF THE STUDENT</th>
          <th rowspan="2" style="width:15%;">BANK A/C NO.</th>
          <th rowspan="2" style="width:10%;">IFSC CODE</th>
          <th colspan="2" style="width:17%;">ATTENDANCE</th>
          <th rowspan="2" style="width:10%;">AMOUNT</th>
        </tr>
        <tr>
          <th>PRESENT</th>
          <th>ABSENT</th>
        </tr>
      </thead>
      <tbody>
        ${data
          .map(
            (row, idx) => `
          <tr>
            <td>${idx + 1}</td>
            <td>${row.roll_no}</td>
            <td style="text-align:left;">${row.name}</td>
            <td>${row.account_no}</td>
            <td>${row.IFSC_CODE}</td>
            <td>${row.present}</td>
            <td>${row.leaves}</td>
            <td>${row.stipend?.toLocaleString("en-IN") || ""}</td>
          </tr>
        `
          )
          .join("")}
        <tr class="total-amount-row">
          <td colspan="7">Total:</td>
          <td>${totalAmount.toLocaleString("en-IN")}</td>
        </tr>
      </tbody>
    </table>
  </div>
</body>
</html>
`;

    // ---- Puppeteer ----
    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.setContent(combinedHtml, { waitUntil: "domcontentloaded" });
    const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });
    await browser.close();

    // ✅ Send response
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=stipend-report.pdf",
    });
    res.send(pdfBuffer);
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).send("Error generating PDF");
  }
};

module.exports = { generateReport };
