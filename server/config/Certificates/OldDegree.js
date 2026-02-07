const path = require('path');
const fs = require("fs");

const imagePath = 'file://' + path.join(
    __dirname,       // current folder: config/Certificates
    '../../media',   // go up 2 folders to server/media
    'nims_logo.jpg'  // image file
);


const logoFile = path.join(__dirname, '../../media/nims_logo.png');
const logoBase64 = fs.readFileSync(logoFile, { encoding: 'base64' });
const logoDataURL = `data:image/jpeg;base64,${logoBase64}`;

function generateODCertificateHTML(data, designationMap) {

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
  };

  const formatToDDMMYYYY = (dateStr) => {
    const date = new Date(dateStr);
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();

    return `${dd}/${mm}/${yyyy}`;
  };


  const getTodayDate = () => {
    const d = new Date();
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formattedPassDate = formatDate(data.pass_date);
  const todayDate = getTodayDate();
  const finalIssuedDate = data.certificate_issue_status === "success" ? 
      formatToDDMMYYYY(data.od_final_date) : formatToDDMMYYYY(data.draft_date);

  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Certificate PDF</title>

<style>
*{margin:0;padding:0;box-sizing:border-box;}
body{font-family:Arial,sans-serif;background:white;}
.rotate-page {
  transform: rotate(-90deg);
  transform-origin: top left;
  width: 100vh;
  height: 100vw;
  position: absolute;
  top: 100%;
  left: 0;
}

.page{
  height:250mm;
  position:relative;
  page-break-after:always;
  overflow:hidden;
  padding:5mm;
  display:flex;
  justify-content:center;
  align-items:center;
}

.paper-container{
  width:90%;
  height:88%;
  position:relative;
  padding:12px;
}

.inner-line{position:absolute;background:black;}
.top-line{top:10px;left:0;right:0;height:2px;}
.bottom-line{bottom:10px;left:0;right:0;height:2px;}
.left-line{top:0;bottom:0;left:10px;width:2px;}
.right-line{top:0;bottom:0;right:10px;width:2px;}

.content{
  width:100%;
  text-align:center;
  margin-top:30px;
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
  <div class="rotate-page">
    <!-- PAGE 1 -->
    <div class="page">
      <div class="paper-container">
        <div class="content">
          <div style="display:flex;flex-direction:column;gap:16px;">
            <div>
              <h1 style="font-family:'Times new roman'; font-size:61px; font-style:italic; line-height:1.2; padding-top:10px;">
                Nizam's Institute of Medical Sciences
              </h1>

              <p style="font-family:'Times new roman'; font-size:28px; font-style:italic;">
                (A University established under the State Act, 1989)
              </p>
              <p style="font-family:'Times new roman'; font-size:34px; font-style:italic;">
                Punjagutta, Hyderabad-500082, Telangana, India.
              </p>
            </div>
            <div style="display:flex;flex-direction:column;gap:12px;">
              <div style="margin:25px 0 20px;display:flex;justify-content:space-between;align-items:center;">
                <div style="font-family:Arial;font-weight:bold;font-size:19px;margin-left : 50px;">
                  Roll No. ${data.roll_no || ""}
                </div>

                <div style="border:0.5px dashed gray;background-color:white;padding:10px;">
                  <img src="${logoDataURL}" style="height:73px; width : 70px">
                </div>

                <div style="font-family:Arial;font-weight:bold;font-size:19px;margin-right : 76px;">
                  ${data.dds_code || ""} - ${data.icr_number || ""}
                </div>
              </div>

              <div style="font-size : 22px; display:flex;flex-direction:column;
                justify-content: space-between; height : 300px;">
                <p>This is to certify that</p>
                <div style="font-weight:bold;font-size:24px;">${data.certificate_name || ""}</div>
                <p style="font-weight:bold;">${data.gender === 'Female' ? 'D/o ' : 'S/o '}${data.father_name || ""}</p>
                <p>has been admitted to the degree of</p>
                <div style="font-weight:bold;font-size:24px;">${data.degree_name || ""}</div>
                <p>
                  of this University having been declared to have passed the examination held in <strong>${formattedPassDate}</strong>
                </p>
                ${
                  data.degree_name !== "Master in Hospital Management"
                    ? `<p>and placed in <strong>${data.division}</strong></p>`
                    : ""
                }
                <p style="font-family:'Times new roman'; font-style:italic; font-weight:normal; font-size:24px; line-height:1.2;">
                    Given above the Seal of the University 
                  </p>
              </div>
            </div>

            <div>
              <div style="margin-top:50px;display:flex; gap : 40px;">
                <div style = "width : 20%;"></div>
                <div style = "display : flex; justify-content: space-between; width : 70%; font-weight : 600;font-size : 19px;">
                  <div style="font-family:'Times new roman';font-size:24px;font-style:italic;">
                    Executive Registrar
                  </div>
                  <div style="font-family:'Times new roman';font-size:24px;font-style:italic;">
                    Dean
                  </div>
                  <div style="font-family:'Times new roman';font-size:24px;font-style:italic;">
                    Director
                  </div>
                </div>
              </div>
              <div style ="font-size : 14px; font-weight : 600; text-align: start;">
                <span>Place: Hyderabad</span><br/>
                <span>Date: ${ finalIssuedDate }</span>
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
            Prepared and Verified by ${data.academic_section} Section
          </div>
        </div>

        <div class="prepared-by section_3" style="margin-top : 20px;">
          <div class="employees_info">
            <div class = "employee_main">
              <p class = "employee_details" style = "margin-top : 20px;">${designationMap[data.staff1] || ""}</p>
              <p class = "employee_details employee_id">EmpID: ${data.staff1 || ""}</p>
            </div>
            <div class = "employee_main">
              <p class = "employee_details" style = "margin-top : 20px;">${designationMap[data.staff2] || ""}</p>
              <p class = "employee_details employee_id">EmpID: ${data.staff2 || ""}</p>
            </div>
          </div>
        </div>

        <div class="employee_details text-center section_3">
          Counter checked and Signed by :
        </div>

        <div class="employees_info" style="margin-top : 20px;">
          <div class = "employee_main">
            <p class = "employee_details" style = "margin-top : 20px;">${designationMap[data.staff3] || ""}</p>
            <p class = "employee_details employee_id">EmpID: ${data.staff3 || ""}</p>
          </div>
          <div class = "employee_main">
            <p class = "employee_details" style = "margin-top : 20px;">${designationMap[data.staff4] || ""}</p>
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
  </div>

</body>
</html>
`;
}

module.exports = { generateODCertificateHTML };
