
const {pool} =require("../models/db");

const administrationDetails = async (formData) => {
  try {
    const {
      course_name, application_no, course_code, ad_no, ad_date, date_of_entry, last_date, department
    }=formData;

    const newUser = await pool.query(
   "  INSERT INTO administrative_information (course_name, application_no, course_code, ad_no, ad_date, date_of_entry, last_date, department)  VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id",
   [
     course_name, application_no, course_code, ad_no, ad_date, date_of_entry, last_date, department
   ]
       
    );

    return newUser;
  } catch (error) {
    console.log("Failed to insert administration", error.message);
    throw error;
  }  
};


const personalInfo = async (formData) => {
  try {
    const {
      name,application_no, father_name, dob, age, place_of_birth, social_status, nationality, marital_status, gender, differently_abled, identification_mark1, identification_mark2, university_area, inservice, aadhar, fathers_email }=formData;

    const newUser = await pool.query(
   "INSERT INTO personal_information (application_no,name, father_name, dob, age, place_of_birth, social_status, nationality, marital_status, gender, differently_abled, identification_mark1, identification_mark2, university_area, inservice, aadhar, fathers_email)   VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17) RETURNING id",
   [
    application_no, name, father_name, dob, age, place_of_birth, social_status, nationality, marital_status, gender, differently_abled, identification_mark1, identification_mark2, university_area, inservice, aadhar, fathers_email
   ]
       
    );

    return newUser;
  } catch (error) {
    console.log("Failed to insert personalinfo", error.message);
    throw error;
  }  
};

const contactDetails = async (formData) => {
  try {
    // Destructure formData
    const {
      father_name,
      father_age = null,
      father_occupation,
      father_income = null,
      mother_name,
      mother_age = null,
      mother_occupation,
      mother_income = null,
      spouse_name,
      spouse_age = null,
      spouse_occupation,
      spouse_income = null,
      corr_address,
      corr_country,
      corr_state,
      corr_district,
      corr_pin_code,
      corr_mobile,
      corr_email,
      perm_address,
      perm_country,
      perm_state,
      perm_district,
      perm_pin_code,
      perm_mobile,
      perm_email,
      father_email,
      other_info
    } = formData;

    const values = [
      father_name, father_age, 
      mother_name, mother_age, 
      spouse_name, spouse_age, 
      corr_address, corr_country, corr_state, corr_district, corr_pin_code, corr_mobile, corr_email,
      perm_address, perm_country, perm_state, perm_district, perm_pin_code, perm_mobile, perm_email,
       other_info
    ];

    const result = await pool.query(
      `INSERT INTO contact_details (
         father_name, father_age, 
         mother_name, mother_age, 
         spouse_name, spouse_age, 
         corr_address, corr_country, corr_state, corr_district, corr_pin_code, corr_mobile, corr_email,
         perm_address, perm_country, perm_state, perm_district, perm_pin_code, perm_mobile, perm_email,
          other_info
       )
       VALUES (
         $1, $2, $3, $4,
         $5, $6, $7, $8,
         $9, $10, $11, $12,
         $13, $14, $15, $16, $17, $18, $19,
         $20, $21
       )
       RETURNING id`,
       values
    );
if (result.rows && result.rows.length > 0) {
    console.log("✅ Inserted ID:", result.rows[0].id);
  return result;
}
return null;
  } catch (err) {
    console.error("Failed to insert contact:", err);
    throw err;
  }
};




const educationDetails = async (formData) => {
  try {
    const {
         qualification, marks_obtained ,  total_marks ,internship_date
      }=formData;
    const average = total_marks > 0 ? marks_obtained / total_marks : 0;
    const percentage = total_marks > 0 ? (marks_obtained / total_marks) * 100 : 0;

    const newUser = await pool.query(
   "INSERT INTO educational_details( qualification, marks_obtained ,  total_marks ,average, percentage, internship_date)   VALUES ($1,$2,$3,$4,$5,$6) RETURNING id",
   [
      qualification, marks_obtained ,  total_marks ,average, percentage, internship_date
   ]
       
    );

    return newUser;
  } catch (error) {
    console.log("Failed to insert personalinfo", error.message);
    throw error;
  }  
};


const paymentDetails = async (formData) => {
  try {
    const {
      applicationNumber,
      paymentType,
      transactionId,
      date,
      bankName,
      branchDetails,
      amount,
      remarks,  
      }=formData;

    const newUser = await pool.query(
   "INSERT INTO payment_details (application_number, payment_type, transaction_id, payment_date, bank_name, branch_details, amount, remarks)  VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id",
   [  applicationNumber,
      paymentType,
      transactionId,
      date,
      bankName,
      branchDetails,
      amount,
      remarks,
   ]
    );
    return newUser;
  } catch (error) {
    console.log("Failed to insert info", error.message);
    throw error;
  }  
};
module.exports = {
  administrationDetails,
  personalInfo,
  contactDetails,
  educationDetails,
  paymentDetails

};
