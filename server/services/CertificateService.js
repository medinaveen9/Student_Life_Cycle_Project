const {pool} =require("../models/db");
const { v4: uuidv4 } = require("uuid");
const { MongoClient, GridFSBucket } = require('mongodb');
dotenv = require('dotenv');
dotenv.config();
const puppeteer = require("puppeteer");
const { generateCertificateHTML } = require("../config/Certificates/Provisional");
const { ObjectId } = require('mongodb');
const { generateODCertificateHTML} = require("../config/Certificates/OldDegree");

//Certificate Request Service

const CertificateService = async (data) => {
    try {
        // Generate a unique ID
        const requestId = uuidv4();
        const query = `
            INSERT INTO certificates
                (request_id, roll_no, name, department, course_name, certificate_type, data)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *
            `;
            const values = [requestId, 
                data.roll_no, data.name, data.department, data.course_name, data.certificate_type,
                data.data, // JSONB
            ];

            const result = await pool.query(query, values);
            return requestId;
    } catch (err) {
        console.error("Failed to create certificate request:", err);
        throw err;
    }
};

// Fetch certificates based on role
const getAllCertificates = async (userData) => {
    try {
        const role = userData.role?.toLowerCase(); // checker | approver | verifier | maker
        
        let query = `SELECT * FROM certificates`;
        let values = [];

        if(role === "maker") {
            query += ` WHERE roll_no = $1`;
            values.push(userData.userId);
        }

        else if (role === "approver") {
            query += ` WHERE verifier_status IN ('approved', 'rejected')`;
        } 
        else if (role === "verifier") {
            query += ` WHERE checker_status IN ('approved', 'rejected')`;
        }
        // ✅ "checker" gets everything (default)
        query += ` ORDER BY created_at DESC`;
        const result = await pool.query(query, values);
        return result.rows;
    } catch (err) {
        console.error("Failed to fetch certificates:", err);
        throw err;
    }
};

const updateVerificationStatus = async (requestId, certificateId, status, answers, user) => {
    try {
        const role = user.role?.toLowerCase(); // role: checker | approver | verifier
        const statusField = `${role}_status`;  // dynamic field name
        const idField = `${role}_id`;          // e.g., checker_id
        const nameField = `${role}_name`;      // e.g., checker_name

        const query = `
            UPDATE certificates SET ${statusField} = $1, verification = $2, ${idField} = $3,
          ${nameField} = $4
            WHERE request_id = $5 AND id = $6
            RETURNING *; `;

        const values = [
            status, JSON.stringify(answers), user.userId, user.user_name, requestId, certificateId
        ];

        const result = await pool.query(query, values);
        return result.rows[0];

    } catch (err) {
        console.error("Failed to update verification status:", err);
        throw err;
    }
};

// Get students based on roll_no
const getStudentsByRollNo = async (rollNo) => {
    try {
        const query = `SELECT * FROM students WHERE roll_no = $1`;
        const values = [rollNo];
        const result = await pool.query(query, values);
        if (result.rows.length === 0) {
            // throw new Error("No student found with the given roll number");
            return null;
        }
        return result.rows;
    } catch (err) {
        console.error("Failed to fetch students by roll number:", err);
        throw err;
    }
};

// Get degree name by course code
const getDegreeNameByCourseCode = async (courseCode) => {
    try {
        const query = `
            SELECT  a.degree_name, b.emp_code1, b.emp_code2, b.emp_code3, b.emp_code4 FROM ddscode_degree_master a
                JOIN course_employees_master b 
                    ON a.ddscode = b.dds_code
            WHERE a.ddscode = $1
        `;

        const values = [courseCode];
        const result = await pool.query(query, values);

        if (result.rows.length === 0) {
            // throw new Error("No data found for given course code");
            return null;
        }

        return result.rows[0];  // { degree_name, emp1, emp2 }
    } catch (err) {
        console.error("Failed to fetch data:", err);
        throw err;
    }
};

// Generate Certificate HTML
async function generatePDF(data) {
    try{

    //Get employees designation based on emp_code from employee_designation_master table

    const codes = [ data.staff1, data.staff2, data.staff3, data.staff4 ].filter(Boolean);

    const inQuery = codes.map(code => `'${code}'`).join(',');

    const sql = `SELECT emp_code, designation FROM employee_designation_master
        WHERE emp_code IN (${inQuery}); `;

    const res = await pool.query(sql);

    const designationMap = {};
    res.rows.forEach(row => {
        designationMap[row.emp_code] = row.designation;
    });
    let html;

    if(data.type_issued.includes("Degree")){
        html = generateODCertificateHTML(data, designationMap);
    }
    else if(data.type_issued.includes("Provisional Certificate")){
        html = generateCertificateHTML(data, designationMap);
    }

    const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox"]
    });

    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.setDefaultTimeout(0);

    await page.setContent(html, {
        waitUntil: "domcontentloaded",
        timeout: 0
    });

    let pdf;

    if(data.type_issued.includes("Degree")){
        pdf = await page.pdf({
            format: "A4",
            // landscape: true,  // THIS MAKES IT HORIZONTAL
            printBackground: true,
            margin: { top: "10mm", bottom: "10mm" }
        });

    }
    else if(data.type_issued.includes("Provisional Certificate")){
        pdf = await page.pdf({
            format: "A4",
            printBackground: true,
            margin: { top: "10mm", bottom: "10mm" }
        });

    }

    await browser.close();
    return pdf;
    } catch (err) {
        console.error("Failed to generate PDF:", err);
        throw err;
    }
}


//Add certificate form into the database
const createPCCertificateRequest = async (responseId, formData, files, userData) => {
    const mongo = new MongoClient(process.env.MONGO_URI);
    let db, bucket;
    let studentImageId = null;

    try {
        /** -----------------------------
         *  1. Connect to MongoDB
         * ----------------------------- */
        await mongo.connect();
        db = mongo.db("Student_LifeCycle");
        bucket = new GridFSBucket(db, { bucketName: "certificate_form_uploads" });

        /** -----------------------------
         *  2. Upload image to GridFS
         * ----------------------------- */
        if (files?.studentImage?.[0]) {
            const img = files["studentImage"][0];
            const newFileName = `${Date.now()}-${img.originalname}`;

            const uploadStream = bucket.openUploadStream(newFileName, {
                chunkSizeBytes: 255 * 1024,
                contentType: img.mimetype,
                metadata: {
                    certificate_id: responseId,
                    originalName: img.originalname,
                    fieldName: img.fieldname,
                }
            });

            uploadStream.end(img.buffer);

            studentImageId = uploadStream.id.toString();
        }

        /** -----------------------------
         *  3. Insert into PostgreSQL
         * ----------------------------- */
        const insertQuery = `
        INSERT INTO pc_certificate_forms (
            response_id, roll_no, icr_number, certificate_name, father_name,
            course_batch, dds_code, degree_name, pass_date, type_issued,
            regular_supply, total_marks, obtained_marks, percentage, division,
            staff1, staff2, staff3, staff4,
            provisional_fee, provisional_receipt, od_fee, od_receipt,
            provisional_receipt_date, certificate_issue_status,
            od_final_date, provisional_final_date,
            student_image_id,
            provisional_fee_paid, od_fee_paid, draft_date, od_receipt_date, checker_id, checker_name
        )
        VALUES (
            $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,
            $11,$12,$13,$14,$15,$16,$17,$18,$19,
            $20,$21,$22,$23,$24,$25,$26,$27,
            $28,$29,$30,$31, $32, $33, $34
        )
        RETURNING *;
        `;

        const params = [
            responseId,                                     // varchar
            formData.rollNo,                                // varchar
            formData.icrNumber,                             // varchar
            formData.certificateName,                       // varchar
            formData.fatherName,                            // varchar
            formData.courseBatch,                           // varchar
            formData.ddsCode,                               // varchar
            formData.degreeName,                            // varchar
            formData.passDate ? new Date(formData.passDate) : null, // date
            JSON.stringify(formData.typeIssued || []),      // jsonb
            formData.regularSupply,                         // varchar
            formData.totalMarks ? Number(formData.totalMarks) : null,       // numeric
            formData.obtainedMarks ? Number(formData.obtainedMarks) : null, // numeric
            formData.percentage ? Number(formData.percentage) : null,       // numeric
            formData.division,                              // varchar
            formData.staff1,                                // varchar
            formData.staff2,                                // varchar
            formData.staff3,                                // varchar
            formData.staff4,                                // varchar
            formData.provisionalFee ? Number(formData.provisionalFee) : null, // numeric
            formData.provisionalReceipt || null,           // varchar
            formData.odFee ? Number(formData.odFee) : null, // numeric
            formData.odReceipt || null,                     // varchar
            formData.provisionalReceiptDate ? new Date(formData.provisionalReceiptDate) : null, // date
            formData.certificateIssueStatus,               // varchar
            formData.odFinalDate ? new Date(formData.odFinalDate) : null,   // date
            formData.provisionalFinalDate ? new Date(formData.provisionalFinalDate) : null, // date
            studentImageId || null,                         // varchar
            formData.provisionalFeePaid === 'true' || formData.provisionalFeePaid === true, // boolean
            formData.odFeePaid === 'true' || formData.odFeePaid === true,   // boolean
            formData.draftDate ? new Date(formData.draftDate) : null,       // date
            formData.odReceiptDate ? new Date(formData.odReceiptDate) : null, // date
            userData.userId,                               // checker_id
            userData.user_name                             // checker_name
        ];

        const pgResult = await pool.query(insertQuery, params);

        return pgResult.rows[0];
    }

    /** ------------------------------------
     *  4. On error → rollback image upload
     * ------------------------------------ */
    catch (err) {
        console.error("Error (rollback triggered):", err);

        if (studentImageId) {
            try {
                await bucket.delete(new ObjectId(studentImageId));
                console.log("Rollback: MongoDB image deleted.");
            } catch (deleteErr) {
                console.error("Rollback failed (image not deleted):", deleteErr);
            }
        }

        throw err;
    }
};

const checkCertificateIssued = async (roll_no, allTypes) => {
    try {
        const query = `SELECT type_issued FROM pc_certificate_forms WHERE roll_no = $1 and certificate_issue_status = 'success'`;
        const values = [roll_no];
        const result = await pool.query(query, values);

        // If roll_no does NOT exist → no certificates issued
        if (result.rows.length === 0) {
            return {
                issuedCertificates: [],
                notIssuedCertificates: allTypes
            };
        }

        // Extract issued certificate types
        const issuedTypes = result.rows.map(row => row.type_issued).flat();

        // Certificates already issued
        const issuedCertificates = allTypes.filter(type => issuedTypes.includes(type));

        // Certificates not yet issued
        const notIssuedCertificates = allTypes.filter(type => !issuedTypes.includes(type));

        return {
            issuedCertificates,
            notIssuedCertificates
        };

    } catch (err) {
        console.error("Failed to check issued certificates:", err);
        throw err;
    }
};


module.exports = { CertificateService, getAllCertificates, updateVerificationStatus, generatePDF, 
    getStudentsByRollNo, getDegreeNameByCourseCode, createPCCertificateRequest, checkCertificateIssued };