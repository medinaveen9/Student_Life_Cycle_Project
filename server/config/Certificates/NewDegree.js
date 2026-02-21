const QRCode = require("qrcode");
const bwipjs = require("bwip-js");

async function generateNewODHTML(data) {

    const rollNo = data.roll_no || data.hall_ticket || "";

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
    };

    const formattedPassDate = formatDate(data.pass_date);

    /* ---------------- QR CODE ---------------- */

    const qrText = `
        ID: ${data.roll_no || data.hall_ticket},
        Student Name: ${data.certificate_name},
        Degree: ${data.degree_name},
        Father Name: ${data.father_name}
    `;

    const qrDataURL = await QRCode.toDataURL(
        qrText.trim(),
        { errorCorrectionLevel: "M" }
    );

    /* ---------------- BARCODE ---------------- */
    const barcodeBuffer = await bwipjs.toBuffer({
        bcid: "code128",
        text: data.icr_number,
        scale: 3,
        height: 10,
        includetext: false
    });

    const barcodeDataURL =
        `data:image/png;base64,${barcodeBuffer.toString("base64")}`;

    /* ---------------- MICRO OVERLAY ---------------- */
    const overlayText = `
        NAME: ${data.certificate_name?.toUpperCase() || ""}
        ID: ${rollNo}
        DEGREE: ${data.degree_name?.toUpperCase() || ""}
    `.repeat(10);

    return `
    <!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8">
                <title>Certificate PDF</title>
                <style>
                    @page { size: A4; margin: 0; }

                    body {
                        margin: 0;
                        font-family: 'Times New Roman', serif;
                    }

                    .a4-sheet {
                        width: 210mm;
                        height: 297mm;
                        padding: 15mm;
                        box-sizing: border-box;
                        position: relative;
                    }

                    /* Watermark */
                    .a4-sheet::before {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%) rotate(-45deg);
                        font-size: 40px;
                        color: rgba(0,0,0,0.04);
                        white-space: nowrap;
                        z-index: 0;
                    }

                    /* Photo Section */
                    .photo-section {
                        width: 100%;
                        margin-top: 48mm;
                        z-index: 1;
                    }

                    .photo-group {
                        display: flex;
                        justify-content: space-between;
                        padding-left: 35px;
                        padding-right: 35px;
                    }
                    .photo-box {
                        position: relative;
                        width: 80px;
                        height: 90px;
                        overflow: hidden;
                    }
                    .photo-box img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }
                    .photo-blur { 
                        filter: blur(3px); 
                    }

                    .overlay {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        font-size: 4px;
                        text-align: center;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: rgba(0,0,0,0.4);
                        pointer-events: none;
                    }

                    /* Content Area */
                    .main-content {
                        text-align: center;
                        z-index: 1;
                        display: flex;
                        flex-direction: column;
                        height: 380px;
                        justify-content: space-between;
                        margin-top: 25px;
                    }
                    .main-content p {
                        margin: 0px;
                    }

                    .default-content{
                        font-size: 24px;
                        visibility: hidden; 
                        font-weight : 500;
                    }
                    .printed-content{
                        font-size: 27px;
                        font-weight: 500;
                    }
                    .student-name{
                        font-size: 30px;
                    }
                    .roll_no_style{
                        font-size : 26px;
                        text-align: center;
                        margin : 0;
                    }

                    /* Footer */
                    .footer {
                        margin-top: 45px;
                        width: 100%;
                        padding-bottom: 20px;
                    }
                    .qr-barcode-container {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        z-index: 1;
                        padding-left: 30px;
                        padding-right: 30px;
                    }
                    .barcode {
                        width: 45mm;
                        height : 30px;
                        padding: 5px;
                        background-color: white;
                    }
                    .qrcode {
                        width: 28mm;
                        height: 27mm;
                        padding: 5px;
                        background-color: white;
                    }
                </style>
            </head>
            <body>
                <div class="a4-sheet">
                    <!-- Photos -->
                    <div class="photo-section">
                        <div class="photo-group">
                            <div class="photo-box">
                                <img src="${data.photoDataURL || ""}">
                            </div>

                            <div class="photo-box">
                                <img src="${data.photoDataURL || ""}" class="photo-blur">
                                <div class="overlay">${overlayText}</div>
                            </div>
                        </div>
                    </div>

                    <!-- Main Content -->
                    <div class="main-content">
                        <p class = "default-content">This is to Certify that</p>
                        <p class="printed-content student-name">${data.certificate_name}</p>
                        <p class = "default-content">has been awarded the degree of </p>
                        <p class="printed-content">${data.degree_name} </p>
                        <p  class = "default-content">He/She having been declared to have qualified in the </p>
                        <p  class = "default-content">Examination prescribed therefor, of this University held in </p>
                        <p class = 'printed-content'>${formattedPassDate} </p>
                        <p class = "default-content">Given under seal of the university</p>
                    </div>

                    <!-- Footer -->
                    <div class="footer">
                        <div class="qr-barcode-container">
                            <img class = "barcode" src="${barcodeDataURL}" ><br>
                            <img class = "qrcode" src="${qrDataURL}" >
                        </div>
                    </div>
                    <div class="roll_no_style">ID ${data.hall_ticket || data.roll_no} </div>

                </div>
            </body>
        </html>
    `;
}

module.exports = { generateNewODHTML };
