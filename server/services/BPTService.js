const {pool} =require("../models/db");

//Course selection
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
  courseSelectionService,
};
