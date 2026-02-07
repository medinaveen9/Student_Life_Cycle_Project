const puppeteer = require('puppeteer');
const path = require("path");
const {numberToWords, formatYear} = require("../config/Utils");
const {pool} =require("../models/db");
const fs = require('fs');
const { generateExcel } = require("../services/ReportService");
const {fetchAllStipends} = require("../services/StipendService");

const generateReport = async (req, res) => {
  try {
    const { currentMonth, year, batch, course, user, selectStipendYear } = req.body;
    const { role, month, roll_no} = req.query;
    const selectedCourse = req.query.course;
    const studentYear = req.query.year;
    const data = await fetchAllStipends(role, month, selectedCourse, studentYear, roll_no, selectStipendYear); // call service

    const monthsData = {1:"January",2:"February",3:"March",4:"April",5:"May",6:"June",
      7:"July",8:"August",9:"September",10:"October",11:"November",12:"December"};

    // Get absolute path of image
    const imagePath = path.resolve(__dirname, "../media/nims_logo.png"); 
    const imageBase64 = fs.readFileSync(imagePath, { encoding: 'base64' });
    const ext = 'png'; // change if jpg
    const imgSrc = `data:image/${ext};base64,${imageBase64}`;

    let course_result;

    if(year !== "All") {
      course_result = await pool.query(
        `SELECT * FROM course_stipend WHERE course = $1 AND year = $2`,
        [course, year]
      );
    }
    const course_stipend = course_result?.rows[0]?.stipend
      ? Number(course_result.rows[0]?.stipend)
      : 5000;

    const formattedStipend = course_stipend.toLocaleString("en-IN");
    const formattedStipendWords = numberToWords(course_stipend);
    
    // ✅ Fallbacks if values are not passed
    const now = new Date();
    const reportMonth = currentMonth || now.toLocaleString("en-US", { month: "long" });
    const reportstudentYear = year !== "All" ? year : now.getFullYear() || now.getFullYear();
    const reportYear = selectStipendYear || now.getFullYear();
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

    const formattedTotal = totalAmount.toLocaleString("en-IN");
    const totalInWords = numberToWords(totalAmount);
    const formattedYear = formatYear(year);

    

    const extraHeaderColumns =
      user.role !== "Checker"
        ? `
          <th rowspan="2" style="width:15%;">BANK A/C NO.</th>
          <th rowspan="2" style="width:10%;">IFSC CODE</th>
        `
        : "";

    // Roll nos of students who are re admission 
    const reAdmittedStudents = [];
    data.forEach((student) => {
      if (student.student_status === "Re-admission") {
        reAdmittedStudents.push(student.roll_no);
      }
    });

    let reAdmittedSectionHtml = "";
    if (reAdmittedStudents.length > 0) {
      reAdmittedSectionHtml = `
        <div style="margin-top:30px;">
          <div style="font-weight:bold; margin-bottom:8px;">
            Re-admitted Students (Roll Numbers)
          </div>
          <div style="padding-left:20px;">
            ${reAdmittedStudents.join(", ")}
          </div>
        </div>
      `;
    }

    // ✅ Generate table rows HTML    
    const rowsHtml = data
      .map(
        (row, idx) => `
        <tr>
          <td>${idx + 1}</td>
          <td>${row.roll_no}</td>
          <td style="text-align:left;">${row.name}</td>
          <!-- <td style="text-align:left;">
            ${monthsData[row?.cur_month]} ${reportYear}
          </td> -->

          ${
            user.role !== "Checker"
              ? `<td>${row.account_no}</td>
                <td>${row.ifsc_code}</td>`
              : ""
          }

          ${
            (row.student_status !== "Regular" && row.student_status !== "Re-admission")
              ? `<td colspan="2" style="text-align:center;font-weight:600;">
                  ${row.student_status}
                </td>
                <td>${row.stipend?.toLocaleString("en-IN") || ""}</td>`
              : `
                <td>${row.present}</td>
                <td>${row.leaves}</td>
                <td>${row.stipend?.toLocaleString("en-IN") || ""}</td>
              `
          }
        </tr>
      `
      )
      .join("");

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

          /* ✅ Every page gets spacing via Puppeteer margins */
          @page {
            margin: 35mm 15mm 30mm 15mm; /* top | right | bottom | left */
          }

          /* ✅ Page wrapper (no forced margin repetition) */
          .page {
            page-break-after: always;
          }
          .page:last-child {
            page-break-after: avoid;
          }

          /* ✅ Header only on first page */
          .header {
            page-break-after: avoid;
            break-after: avoid;
            break-inside: avoid;
          }

          /* ✅ Prevent repeating table header */
          thead { 
            display: table-row-group !important;
          }

          /* ✅ Keep each table row together (no splitting rows across pages) */
          tr {
            break-inside: avoid;
            page-break-inside: avoid;
          }

          /* ✅ Your existing styles continue … */
          .nursing-title { font-family: 'Georgia', serif; font-size: 24pt; text-align: right; margin: 0 0 20px 0; color: #333; }
          .header-left { display: flex; }
          .logo { width: 50px; height: 50px; margin-right: 15px; }
          .university-details { font-size: 10pt; text-align: center; width: 100%; }
          .university-details div:first-child { font-weight: bold; text-align: center; }
          .rc-date { display: flex; justify-content: space-between; margin-bottom: 30px; font-size: 10pt; }
          .sanction-order-title { text-align: center; font-size: 14pt; font-weight: bold; margin-bottom: 20px; text-decoration: underline; }
          .section-heading { margin-bottom: 5px; font-size: 10pt; }
          .content-block { margin-bottom: 15px; font-size: 10pt; }
          ul { list-style-type: decimal; padding-left: 20px; font-size: 10pt; margin: 0px; }
          .signature-block { text-align: right; margin-top: 50px; font-size: 10pt; }
          .footer-block { margin-top: 30px; font-size: 10pt; }
          table { width: 100%; border-collapse: collapse; font-size: 9pt; }
          th, td { border: 1px solid black; padding: 4px; text-align: center; }
          th { background-color: #f0f0f0; }
          .total-amount-row td { text-align: right; font-weight: bold; }
        </style>
      </head>
      <body>
        <!-- Page 1 -->
        ${(user.role === "FA" || user.role === "FC") ? `
          <div class="page">
            <div class="header">
              <div class="logo-box">
                <img src="${imgSrc}" alt="NIMS Logo" class="logo" />
              </div>
              <div class="university-details">
                <div>Nizam's Institute of Medical Sciences</div>
                (A University established under the State Act)<br/>
                Punjagutta: Hyderabad -500 082
              </div>
            </div>

            <div class="rc-date">
              <div>Rc.No.AC-2/161/2021/Stipend B.Sc (N)</div>
              <div>Date: ${reportDate}</div>
            </div>

            <div class="sanction-order-title">SANCTION ORDER</div>
            <div class="section-heading">Sub:  AD-AC-2 - Sanction of stipend to B.Sc. (N) ${formattedYear} year students for the month of ${monthsData[reportMonth]}, ${reportYear} - Sanction orders - Issued - Reg.</div>

            <div class="section-heading">Ref:</div>
            <ul>
              <li>G.O.Ms.No. 150, HM & FW Dept Dt: 03.11.2021</li>
              <li>This O/o No. AC2/161/2021/Stipend, Dt: 01.04.2022</li>
              <li>Letter No. CON/03/348, Dated 23/07/2025 received from Principal, CON</li>
              <li>Note approval Dated 06-08-2025.</li>
            </ul>

            <p style="text-align:center; font-size:14pt; margin:20px 0;">***</p>
            <div class="content-block">
                As per the orders issued vide reference 1st & 2nd cited, the ${formattedYear} year B.Sc.(N) students are eligible to draw the stipend of Rs. ${formattedStipend}/- per month (${formattedStipendWords} only) till the end of 1 year course excluding the students those who are drawing scholarship.
            </div>
            <div class="content-block">
                  Sanction is hereby accorded for an amount of Rs. ${formattedTotal}/- (Rupees ${totalInWords} only) towards stipend to be disbursed to the ${formattedYear} year B.Sc (N) students for the month of ${monthsData[reportMonth]}, ${reportYear}. The stipend shall be paid every month based on the attendance received from I/c Principal, College of Nursing.
              </div>

              <div class="content-block">
                  The claims section is hereby requested to claim the stipend and arrange for the disbursement of stipend to issue an individual through NEFT transfer to the ${formattedYear} year B.Sc.(N) students mentioned at annexure on the claim made by the Principal, College of Nursing, NIMS.
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
          </div> ` : ""
        }

        <!-- Page 2 -->
        <div class="page">
          <!--
          <div class="note-section">
            <div class="note-title">
              <div>Note: -349-</div>
              <div>File No. AC2/161/2021/Stipend B.Sc (N)</div>
            </div>
            186) Kindly peruse the letter... attendance details as follows:
          </div>
          -->

          <div style="text-align:center; font-size:18px; font-weight:600; padding-bottom:20px;">
            ATTENDANCE DETAILS FOR ${formattedYear} YEAR ${monthsData[reportMonth]}, ${reportYear}
          </div>

          <table>
            <thead>
                <tr>
                  <th rowspan="2" style="width:5%;">S.No.</th>
                  <th rowspan="2" style="width:8%;">ROLL No.</th>
                  <th rowspan="2" style="width:25%;">NAME OF THE STUDENT</th>
                  <!-- <th rowspan="2" style="width:25%;">Month</th> -->
                  ${extraHeaderColumns}
                  <th colspan="2" style="width:17%;">ATTENDANCE</th>
                  <th rowspan="2" style="width:10%;">AMOUNT</th>
                </tr>
                <tr>
                  <th>PRESENT</th>
                  <th>ABSENT</th>
                </tr>
              </thead>
            <tbody>
              ${rowsHtml}
              <tr class="total-amount-row">
                <td colspan="${user.role !== 'Checker' ? 7 : 5}">Total:</td>
                <td>${formattedTotal}</td>
              </tr>
              
            </tbody>
          </table>
          ${reAdmittedSectionHtml}
        </div>
      </body>
      </html>
    `;

     // ---- Puppeteer ----
    const browser = await puppeteer.launch({
          headless: "new",
          args: ["--no-sandbox", "--disable-setuid-sandbox"]
        });

        const page = await browser.newPage();

        await page.setContent(combinedHtml, { waitUntil: "domcontentloaded" });

        const pdfBuffer = await page.pdf({ format: "A4", printBackground: true, 
          margin: {
            top: "35mm",
            bottom: "30mm",
            left: "15mm",
            right: "15mm"
          }
        });
        await browser.close();

        // ✅ Send response
        res.set({
          "Content-Type": "application/pdf",
          "Content-Disposition": "attachment; filename=stipend-report.pdf",
        });
        res.send(pdfBuffer);
  } catch (error) {
    console.error("❌ Error generating PDF:", error);
    res.status(500).send("Error generating PDF");
  }
};

const downloadExcel = async (req, res) => {
  try {
    const { role, month, roll_no, stipend_year} = req.query;
    const selectedCourse = req.query.course;
    const studentYear = req.query.year;
    const data = await fetchAllStipends(role, month, selectedCourse, studentYear, roll_no, stipend_year); // call service
    req.body.data = data;
    
    const excelBuffer = await generateExcel(req.body);
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=stipend-report.xlsx"
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.send(excelBuffer);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error generating Excel");
  }
};

module.exports = { generateReport, downloadExcel };
