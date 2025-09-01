const {pool} =require("../models/db");

//Course selection
const administrationDetails = async (formData) => {
  try {
    const {
    course_name, application_no, course_code, ad_no, ad_date, date_of_entry,last_date,
    } = formData;

    const newUser = await pool.query(
   "  INSERT INTO bpt_administrative_information (course_name, application_no, course_code, ad_no, ad_date, date_of_entry, last_date)  VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING id",
   [
     course_name, application_no, course_code, ad_no, ad_date, date_of_entry, last_date
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
    application_no,  name, father_name, dob, age, place_of_birth, social_status, nationality, 
    marital_status, gender, differently_abled } = formData;

    const newUser = await pool.query(
   "INSERT INTO bpt_personal_information (application_no,name, father_name, dob, age, place_of_birth, social_status, nationality, marital_status, gender, differently_abled)   VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING id",
   [
   application_no,  name, father_name, dob, age, place_of_birth, social_status, nationality,
    marital_status, gender, differently_abled
   ]
    );

    return newUser;
  } catch (error) {
    console.log("Failed to insert personalinfo", error.message);
    throw error;
  }  
};
const identityInfo = async (formData) => {
  try {
    const {
      application_no,id_mark_1, id_mark_2, driving_license, passport_number,in_service,aadhar} 
      = formData;

    const newUser = await pool.query(
      `INSERT INTO bpt_identity_verification 
        (application_no,id_mark_1, id_mark_2, driving_license, passport_number, in_service, aadhar)
       VALUES ($1, $2, $3, $4, $5, $6,$7)   RETURNING id`,
      [application_no,id_mark_1, id_mark_2, driving_license, passport_number, in_service, aadhar]
    );

    return newUser;
  } catch (err) {
    console.error("Failed to insert identity verification:", err.message);
    throw err;
  }
};
const contactDetails = async (formData) => {
  try {
    // Destructure formData
    const {
      
      application_no,father_name, father_age = null, father_occupation, father_income = null,
      mother_name,   mother_age = null,  mother_occupation,mother_income = null,
      spouse_name, spouse_age = null,  spouse_occupation,spouse_income = null,corr_address,
      corr_country,corr_state, corr_district,corr_pin_code, corr_mobile,corr_email,perm_address,
      perm_country,perm_state,perm_district,  perm_pin_code,  perm_mobile, perm_email,father_email,
      other_info
     } = formData;

    const values = [
     application_no, father_name, father_age,father_occupation,father_income,
      mother_name, mother_age,  mother_occupation,mother_income,
      spouse_name, spouse_age, spouse_occupation,spouse_income,
      corr_address, corr_country, corr_state, corr_district, corr_pin_code, corr_mobile, corr_email,
      perm_address, perm_country, perm_state, perm_district, perm_pin_code, perm_mobile, perm_email,
       other_info,
    ];

    const result = await pool.query(
      `INSERT INTO bpt_contact_details (
   
         application_no,father_name, father_age,father_occupation,father_income,
         mother_name, mother_age, mother_occupation,mother_income,
         spouse_name, spouse_age, spouse_occupation,spouse_income,
         corr_address, corr_country, corr_state, corr_district, corr_pin_code, corr_mobile, corr_email,
         perm_address, perm_country, perm_state, perm_district, perm_pin_code, perm_mobile, perm_email,
          other_info
       )
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19,
         $20, $21,$22,$23,$24,$25,$26,$27 ,$28)RETURNING id`,
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

const courseSelectionService = async (courseData) => {
    try{
        const { eapcetData, studentRecords, courseSubjects } = courseData;
        const { registrationNumber, hallTicketNumber, rank } = eapcetData;
        // Insert into bpt_course_selection table

        const query = `
            INSERT INTO bpt_course_selection
            (reg_no, hall_ticket, rank, course_subjects, student_records)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
        `;
        const values = [registrationNumber, hallTicketNumber, rank, 
            JSON.stringify(courseSubjects),   // Convert to JSON
            JSON.stringify(studentRecords)    // Convert to JSON
        ];
        const result = await pool.query(query, values);
        if(result.rowCount > 0){
            return {    
                success: true,
                message: "Course saved successfully",
            };
        }
        return {    
            success: false,
            message: "Failed to save course",
        };

    }
    catch(error){
        console.error("Error saving course:", error);
        return {    
            success: false,
            message: "Failed to save course",
        };
    }
};

module.exports = {
  courseSelectionService,administrationDetails,personalInfo,identityInfo,contactDetails
};
