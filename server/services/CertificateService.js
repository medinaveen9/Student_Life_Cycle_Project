const {pool} =require("../models/db");
const { v4: uuidv4 } = require("uuid");

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


module.exports = { CertificateService, getAllCertificates, updateVerificationStatus  };