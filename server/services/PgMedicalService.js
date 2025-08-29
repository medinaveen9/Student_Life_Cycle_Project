
const { pool } = require("../models/db");

const TABLE_CONFIGS = {
  pg_examination_assessment: {
    fields: [
      "int_theory", "in_practical","int_clinical","per_dates",  "theory_status","practical_status",
      "viva_voce_status","exam_eligibility","pg_awarded","award_date","registration_no","registration_date",
      "employer_name", "pg_position","start_date","applied_fellowship", "fellowship_program_name",
    ]
  },
   pg_onboarding_phase: {
    fields: [
    "mentor_name","mentor_department","mentor_contact","bank_name","acc_number","ifsc_code", 
    "thesis_topic", "thesis_guide", "thesis_proposal_date","progress_report_dates",
    // "ethics_approval_date",
   "thesis_final_submission_date","final_sub_date",
    "viva_date","thesis_status","research_titles","research_role","journal_name","pub_title",
    "pub_year", "co_authors","conf_name", "conf_title","conf_year", "rotation_department",
    "rotation_start_date", "rotation_end_date","per_evaluation","cases_performed","logbook_status",
    "logbook_reviewer","pre_dates","pre_topics", "faculty_eval","on_duty_leave_approvals", "sl_utilized",
     "cl_utilized",  "sl_balance","cl_balance","perf_review_date","guide_feedback","strengths",
    "improvements"
  ]
},

pg_medical_qualification: {
fields:[
  "pg_entrance","pg_roll","pg_score","pg_rank","ug_university","ug_passing_year","ug_percentage",
  "internship_date","reg_number",  "reg_date","experience","specialty_1","specialty_2",
   "specialty_3","bond_status","bond_duration", "bond_amount"
]
}
};
function coerceIntegerFields(data, fieldList) {
  const coerced = {};
  fieldList.forEach((key) => {
    if (typeof data[key] === "string" && /^\d+$/.test(data[key])) {
      coerced[key] = parseInt(data[key], 10);
    } else {
      coerced[key] = data[key];
    }
  });
  return coerced;
}

const ReportFormDetails = async (formData, tableName) => {
  try {
    const config = TABLE_CONFIGS[tableName];
    if (!config) throw new Error("Unsupported table: " + tableName);
console.log(`💡 Payload before inserting into ${tableName}:`, formData);

    const values = Object.values(coerceIntegerFields(formData, config.fields));
    const placeholders = config.fields.map((_, idx) => `$${idx + 1}`).join(", ");

    const query = `INSERT INTO ${tableName} (${config.fields.join(
      ", "
    )}) VALUES (${placeholders}) RETURNING id`;

    const result = await pool.query(query, values);

    return result.rows[0]; // Return the inserted row id
  } catch (error) {
    console.log("Failed to insert into", tableName, ":", error.message);
    throw error;
  }
};

const ReportFormData = async (tableName) => {
  let client;

  try {
    client = await pool.connect();
    await client.query("BEGIN");

    const formsResult = await client.query(`SELECT * FROM ${tableName}`);

    await client.query("COMMIT");

    return formsResult.rows; // Return only the rows
  } catch (error) {
    if (client) await client.query("ROLLBACK");
    console.log("Error occurred while fetching table form data:", error.message);
    throw error;
  } finally {
    if (client) client.release();
  }
};

module.exports = { ReportFormDetails, ReportFormData };
