const {pool} =require("../models/db");

//Certificate Request Service
const CertificateService = async (data) => {
    try {
        const result = await pool.query(
            `INSERT INTO certificate_requests 
                (application_no, course_type, certificate_type, receipt_no, amount, date_of_payment) 
                VALUES ($1, $2, $3, $4, $5, $6) 
                RETURNING *`,
                [
                    data.application_no, data.course_type, data.certificate_type, data.receipt_no,
                    data.amount,  data.date_of_payment
                ]
        );
        return result.rows[0];
    } catch (error) {
        console.error("Failed to create certificate request:", error.message);
        throw error;
    }
};


module.exports = { CertificateService };