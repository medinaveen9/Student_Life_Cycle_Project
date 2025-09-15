const {pool} =require("../models/db");

const getAdministrtaionInfo = async (application_no) => {
  try {
    if (!application_no) return { success: false, message: "Application No is required" };

    const result = await pool.query(
      "SELECT application_no, department ,course_name FROM administrative_information WHERE application_no = $1",
      [application_no]
    );

    if (result.rows.length === 0) {
      return { success: false, message: "No data found" };
    }

    return { success: true, data: result.rows[0] };
  } catch (err) {
    console.error("Failed to fetch administration info:", err.message);
    return { success: false, message: "Server error" };
  }
};

const administrationDetails = async (formData) => {
  try {
    const { course_name, application_no, course_code, ad_no, ad_date, date_of_entry, last_date, department } = formData;

    if (!application_no || !course_name) {
      return { success: false, message: "Application No. and Course Name are required." };
    }
    // Check for duplicate application_no
    const checkExisting = await pool.query(
      "SELECT id FROM administrative_information WHERE application_no = $1",
      [application_no]
    );

    if (checkExisting.rows?.length > 0) {
      return { success: false, message: "This Application No. has already Exists." };
    }

    const newUser = await pool.query(
      `INSERT INTO administrative_information
        (course_name, application_no, course_code, ad_no, ad_date, date_of_entry, last_date, department)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id`,
      [course_name, application_no, course_code, ad_no, ad_date, date_of_entry, last_date, department]
    );

    if (!newUser?.rows?.length) {
      return { success: false, message: "Failed to insert record" };
    }

    return { success: true, id: newUser.rows[0].id };
  } catch (error) {
    console.error("Failed to insert administration:", error.message);
    return { success: false, message: "Server error" };
  }
};
const getAdministrationDetails = async (application_no) => {
  try {
    if (!application_no) {
      return { success: false, message: "Application No. is required." };
    }

    const existing = await pool.query(
      "SELECT * FROM administrative_information WHERE application_no = $1",
      [application_no]
    );

    if (!existing.rows?.length) {
      return { success: false, message: "No record found" };
    }

    return { success: true, data: existing.rows[0] };
  } catch (error) {
    console.error("Error fetching administration:", error.message);
    return { success: false, message: "Server error" };
  }
};




const getPersonalInfo = async (application_no) => {
  try {
    const result = await pool.query(
      "SELECT application_no, name, father_name, dob, age FROM personal_information WHERE application_no = $1",
      [application_no]
    );

    if (result.rows.length > 0) {
      return { success: true, data: result.rows[0] };
    } else {
      return { success: false, message: "Application not found" };
    }
  } catch (err) {
    console.error("Error fetching personal info:", err.message);
    return { success: false, message: "Server error" };
  }
};

const personalInfo = async (formData) => {
  try {
    const {
      application_no, name, father_name, dob, age, place_of_birth, social_status,
      nationality, marital_status, gender, differently_abled,
      identification_mark1, identification_mark2, university_area,
      inservice, aadhar, fathers_email
    } = formData;

    // Check for duplicate application_no
    const checkExisting = await pool.query(
      "SELECT id FROM personal_information WHERE application_no = $1",
      [application_no]
    );

    if (checkExisting.rows?.length > 0) {
      return { success: false, message: "This Application No. already exists." };
    }

    const newUser = await pool.query(
      `INSERT INTO personal_information 
      (application_no, name, father_name, dob, age, place_of_birth, social_status, nationality, marital_status, gender, differently_abled, identification_mark1, identification_mark2, university_area, inservice, aadhar, fathers_email)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17)
      RETURNING id`,
      [
        application_no, name, father_name, dob, age, place_of_birth, social_status,
        nationality, marital_status, gender, differently_abled,
        identification_mark1, identification_mark2, university_area,
        inservice, aadhar, fathers_email
      ]
    );

    return { success: true, id: newUser.rows[0].id, message: "Personal information saved successfully." };

  } catch (error) {
    console.error("Failed to insert personal info:", error.message);
    return { success: false, message: "Server error. Please try again." };
  }
};


const contactDetails = async (formData) => {
  try {
    const {
      application_no, father_name, father_age = null, mother_name, mother_age = null,
      spouse_name, spouse_age = null, corr_address, corr_country, corr_state,
      corr_district, corr_pin_code, corr_mobile, corr_email,
      perm_address, perm_country, perm_state, perm_district,
      perm_pin_code, perm_mobile, perm_email, father_email, other_info
    } = formData;

    const values = [
      application_no, father_name, father_age, mother_name, mother_age,
      spouse_name, spouse_age, corr_address, corr_country, corr_state, corr_district,
      corr_pin_code, corr_mobile, corr_email, perm_address, perm_country, perm_state,
      perm_district, perm_pin_code, perm_mobile, perm_email, father_email, other_info
    ];

    const checkExisting = await pool.query(
      "SELECT id FROM contact_details WHERE application_no = $1",
      [application_no]
    );

    if (checkExisting.rows?.length > 0) {
      return { success: false, message: "This Application No. already exists." };
    }

    const result = await pool.query(
      `INSERT INTO contact_details (
        application_no, father_name, father_age, mother_name, mother_age,
        spouse_name, spouse_age, corr_address, corr_country, corr_state,
        corr_district, corr_pin_code, corr_mobile, corr_email,
        perm_address, perm_country, perm_state, perm_district,
        perm_pin_code, perm_mobile, perm_email, father_email, other_info
      )
      VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14,  $15, $16, $17, $18, $19,
         $20, $21, $22, $23
      )
      RETURNING id`,
      values
    );

    if (result.rows && result.rows.length > 0) {
      console.log("✅ Inserted ID:", result.rows[0].id);
      return { success: true, id: result.rows[0].id };
    }

    return null;
  } catch (err) {
    console.error("Failed to insert contact:", err);
    throw err;
  }
};

const educationDetails = async (formData) => {
  try {
    const { qualification, marks_obtained, total_marks, internship_date, application_no } = formData;

    if (!qualification || !application_no || marks_obtained == null || total_marks == null) {
      return { success: false, message: "Missing required fields" };
    }

    const marks = Number(marks_obtained);
    const total = Number(total_marks);
    const average = total > 0 ? marks / total : 0;
    const percentage = total > 0 ? (marks / total) * 100 : 0;

    const checkExisting = await pool.query(
      "SELECT id FROM educational_details WHERE application_no = $1",
      [application_no]
    );

    if (checkExisting.rows?.length > 0) {
      return { success: false, message: "This Application No. already exists." };
    }

    const newUser = await pool.query(
      `INSERT INTO educational_details (
        qualification, marks_obtained, total_marks, average, percentage, internship_date, application_no
      ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
      [qualification, marks, total, average, percentage, internship_date, application_no]
    );

    return { success: true, id: newUser.rows[0].id };
  } catch (error) {
    console.error("Failed to insert education details:", error.message);
    throw error;
  }
};


const paymentDetails = async (formData) => {
  try {
    const {
      applicationNumber,  paymentType, transactionId, date, bankName,  branchDetails,amount, remarks,  
      } = formData;

    const newUser = await pool.query(
   "INSERT INTO payment_details (application_number, payment_type, transaction_id, payment_date, bank_name, branch_details, amount, remarks)  VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id",
   [  applicationNumber,paymentType,transactionId,  date,bankName,branchDetails, amount,remarks,
   ]
    );
    return newUser;
  } catch (error) {
    console.log("Failed to insert info", error.message);
    throw error;
  }  
};

const getSelectedCourseName = async (applicationNo) => {
  try {
    const adminResult = await pool.query(
      "SELECT course_name FROM administrative_information WHERE application_no = $1",
      [applicationNo]
    );
    const personalInfoResult = await pool.query(
      "SELECT social_status FROM personal_information WHERE application_no = $1",
      [applicationNo]
    );
    if (adminResult.rows.length > 0 && personalInfoResult.rows.length > 0) {
      return { isSuccess : true, data : { courseName: adminResult.rows[0].course_name, 
        socialStaus: personalInfoResult.rows[0].social_status } }; 
    } else if (adminResult.rows.length <= 0) {
      return { isSuccess : false, message : "No course found for the given application number in administrative information." };
    } else if (personalInfoResult.rows.length <= 0) {
      return { isSuccess : false, message : "No course found for the given application number in personal information." };
    }
    return { isSuccess : false, message : "No course found for the given application number." };
  } catch (error) {
    console.log("Failed to fetch course name", error.message);
    throw error;
  }  
};


module.exports = {
  administrationDetails, personalInfo, contactDetails, educationDetails, paymentDetails, 
  getSelectedCourseName,getAdministrationDetails ,getAdministrtaionInfo,getPersonalInfo
};
