const path = require('path');
const fs = require("fs");
const { courseContentMap, contentPatterns } = require('../CertificatesConfig/pcCourseMap');

const imagePath = 'file://' + path.join(
    __dirname,       // current folder: config/Certificates
    '../../media',   // go up 2 folders to server/media
    'nims_logo.jpg'  // image file
);


const logoFile = path.join(__dirname, '../../media/nims_logo.png');
const logoBase64 = fs.readFileSync(logoFile, { encoding: 'base64' });
const logoDataURL = `data:image/jpeg;base64,${logoBase64}`;


function generateCertificateHTML(data, designationMap) {

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
  };

  const getTodayDate = () => {
    const d = new Date();
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const contentType = courseContentMap[data.degree_name] || "TYPE_A";
  const pattern = contentPatterns[contentType];

  const formatToDDMMYYYY = (dateStr) => {
    const date = new Date(dateStr);
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();

    return `${dd}/${mm}/${yyyy}`;
  };

  const formattedPassDate = formatDate(data.pass_date);
  const todayDate = getTodayDate();
  const finalIssuedDate = data.certificate_issue_status === "success" ? 
    formatToDDMMYYYY(data.provisional_final_date) : formatToDDMMYYYY(data.draft_date);

  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Certificate PDF</title>
<link href="https://fonts.googleapis.com/css2?family=Italianno&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box;}
body{font-family:Arial,sans-serif;background:white;}

.page{
  height:260mm;
  position:relative;
  page-break-after:always;
  overflow:hidden;
  padding:5mm;
  display:flex;
  justify-content:center;
  align-items:center;
}

.paper-container{
  width:80%;
  height:98%;
  border:4px solid black;
  position:relative;
  padding:18px;
}

.inner-line{position:absolute;background:black;}
.top-line{top:10px;left:0;right:0;height:2px;}
.bottom-line{bottom:10px;left:0;right:0;height:2px;}
.left-line{top:0;bottom:0;left:10px;width:2px;}
.right-line{top:0;bottom:0;right:10px;width:2px;}

.content{
  width:100%;
  text-align:center;
  margin-top:40px;
}
.certificate-footer {
  position: absolute;
  bottom: 30px;      /* controls distance from bottom border */
  left: 0;
  width: 100%;
}

/* ===== PAGE 2 BORDERS FIXED ===== */
.p2-container {
  width: 480px;
  margin: 0 auto;

  /* Horizontal borders - black */
  border-top: 2.5px solid black;
  border-bottom: 2.5px solid black;

  /* Vertical borders - gray (normal solid) */
  border-left: 1px solid gray;
  border-right: 1px solid gray;

  box-sizing: border-box;
}

.section_1 { border-bottom: 2.5px solid black; }
.section_2 { border-bottom: 2.5px solid gray; }
.section_3 { border-bottom: 1.5px solid gray; }

.top-placeholder {
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.header { 
  align-items: center; 
  padding: 12px; 
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.top-header {
  font-size: 17px;
  font-weight: 600;
  font-family: arial;
  &.sub-header{
    font-size: 12px;
    font-weight: 400;
  }
}

.candidate-info { 
  align-items: center; 
  padding: 18px; 
  display: flex;
  flex-direction: column;
  gap: 8px; 
}

.employees_info{
  display : flex;
  justify-content: space-around;
  align-items: center;
  padding : 12px;
}

.employee_main{
  display : flex;
  flex-direction : column;
  align-items : center;
  gap : 2px;
}
.employee_details{
  font-size : 13px;
  font-family : Arial;
  &.employee_id{
    font-weight : 600;
  }
  &.text-center{
    font-weight : 600;
    text-align: center;
  }
}

.signatories,
.final-signatories{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:18px;
  padding:20px;
}

.counter-checked{
  padding:10px 20px;
  font-weight:bold;
}
</style>
</head>

<body>

<!-- PAGE 1 -->
<div class="page">
  <div class="paper-container">
    <div class="inner-line top-line"></div>
    <div class="inner-line bottom-line"></div>
    <div class="inner-line left-line"></div>
    <div class="inner-line right-line"></div>

    <div class="content">
      <div style="display:flex;flex-direction:column;gap:16px;">
        <div>
          <h1 style="font-family:'Times new roman'; font-size:33px; font-style:italic; line-height:1.2;">
            Nizam's Institute of Medical Sciences
          </h1>

          <p style="font-family:'Times new roman'; font-size:19px; font-style:italic;">
            (A University established under the State Act, 1989)
          </p>
          <p style="font-family:'Times new roman'; font-size:19px; font-style:italic;">
            Punjagutta, Hyderabad-500082, Telangana, India.
          </p>
        </div>

        <div style="margin:25px 0 30px;display:flex;justify-content:space-between;align-items:center;">
          <div style="font-family:Arial;font-weight:bold;font-size:17px;margin-left : 10px;">
            Roll No. ${data.roll_no || ""}
          </div>

          <div style="border:0.5px dashed gray;background-color:white;padding:10px;">
            <img src="${logoDataURL}" style="height:70px;">
          </div>

          <div style="font-family:Arial;font-weight:bold;font-size:17px;margin-right : 50px;">
            ${data.dds_code || ""} - ${data.icr_number || ""}
          </div>
        </div>

        <h2 style="font-family:Arial;font-weight:bold;font-size:22px;text-decoration:underline;margin-bottom : 20px;">
          PROVISIONAL CERTIFICATE
        </h2>

        <div style="display:flex;flex-direction:column;gap:16px; font-size : 18px;">
          <p>This is to certify that</p>

          <div style="font-weight:bold;font-size:20px;">
            ${data.certificate_name}
          </div>

          <p style="font-weight:bold;">
            ${data.gender === "Female" ? "D/O" : "S/O"} ${data.father_name}
          </p>

          <p>${pattern.main}</p>

          <div style="font-weight:bold;font-size:20px;">
            ${data.degree_name}
          </div>

          <p>${pattern.examLine}</p>

          <p>
            Final Examinations held in <strong>${formattedPassDate}</strong>
          </p>

          ${pattern.division ? `<p>${pattern.divisionText}<strong> ${data.division}</strong></p>` : ""}

          ${
            pattern.internship
              ? `
                <p>${pattern.internshipText1}</p>
                <p>${pattern.internshipText2}</p>
                `
              : ""
          }
          
        </div>


        <div class="certificate-footer">
          <p style="font-family:'Times new roman'; font-style:italic; font-size:20px;
                    text-align:end;margin-right:70px;font-weight:600;">
            Executive Registrar
          </p>

          <div style="font-weight:bold;margin-left:50px;text-align:left;">
            Place: Hyderabad<br/>
            Date: ${finalIssuedDate}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- PAGE 2 -->
<div class="page">
  <div class="p2-container">

    <div class="top-placeholder section_2" style="text-align:center;"">
      <svg id="icrBarcode"></svg>
    </div>

    <div class="header">
      <h1 class = "top-header">NIZAM'S INSTITUTE OF MEDICAL SCIENCES</h1>
      <p class = "top-header sub-header">(A University established under the State Act,1989)</p>
      <p class = "top-header sub-header">PUNJAGUTTA, HYDERABAD-500082, TELANGANA, INDIA</p>
    </div>

    <div class="candidate-info section_1">
      <div style = "font-size : 14px; font-family : Arial;">Candidate's ID. <strong>${data.icr_number || ""}</strong></div>
      <div style ="font-size : 12px; font-family : Arial; font-weight : 700;">
        ISSUED AFTER VERIFICATION BY AC2 SECTION
      </div>
      <div style = "font-size : 14px; font-family : Arial;">Prepared and Verified by:</div>
    </div>

    <div class="prepared-by section_3" style="margin-top : 20px;">
      <div class="employees_info">
        <div class = "employee_main">
          <p class = "employee_details" style="margin-top : 20px;">${designationMap[data.staff1] || ""}</p>
          <p class = "employee_details employee_id">EmpID: ${data.staff1 || ""}</p>
        </div>
        <div class = "employee_main">
          <p class = "employee_details" style="margin-top : 20px;">${designationMap[data.staff2] || ""}</p>
          <p class = "employee_details employee_id">EmpID: ${data.staff2 || ""}</p>
        </div>
      </div>
    </div>

    <div class="employee_details text-center section_3">
      Counter checked and Signed by :
    </div>

    <div class="employees_info" style="margin-top : 20px;">
      <div class = "employee_main">
        <p class = "employee_details" style="margin-top : 20px;">${designationMap[data.staff3] || ""}</p>
        <p class = "employee_details employee_id">EmpID: ${data.staff3 || ""}</p>
      </div>
      <div class = "employee_main">
        <p class = "employee_details" style="margin-top : 20px;">${designationMap[data.staff4] || ""}</p>
        <p class = "employee_details employee_id">EmpID: ${data.staff4 || ""}</p>
      </div>
    </div>
  </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.5/dist/JsBarcode.all.min.js"></script>
<script>
document.addEventListener("DOMContentLoaded", function () {
  const icr = "${data.icr_number || ""}";
  if (icr) {
    JsBarcode("#icrBarcode", icr, {
      format:"CODE128",
      lineColor:"#000",
      width:2,
      height:60,
      displayValue:false
    });
  }
});
</script>

</body>
</html>
`;
}

module.exports = { generateCertificateHTML };
