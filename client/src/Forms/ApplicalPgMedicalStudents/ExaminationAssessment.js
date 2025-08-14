import React from 'react';
import FormComponent from './FormComponent';

const constfields = [

    { type: 'heading', text: 'IV. Examination & Assessment Phase (PG Specific)' },
    { type: 'heading', text: 'Internal Assesment for PG' },
    { label: 'Internal Assessment Marks (Theory)', name: 'internal_assessment_theory', type: 'text', required: false },
    { label: 'Internal Assessment Marks (Practical)', name: 'internal_assessment_practical', type: 'text', required: false },
    { label: 'Internal Assessment Marks (Clinical)', name: 'internal_assessment_clinical', type: 'text', required: false },
    
    { label: 'Periodical Assessment Dates', name: 'periodical_assessment_dates', type: 'date', required: false },
    { type: 'heading', text: 'PG Final Examination Details' },
    { label: 'Theory Papers Passed/Failed', name: 'theory_exam_status', type: 'select', options: ['Passed', 'Failed'], required: false },
    { label: 'Practical/Clinical Exam Status', name: 'practical_exam_status', type: 'select', options: ['Passed', 'Failed'], required: false },
    { label: 'Viva Voce Status', name: 'viva_voce_status', type: 'select', options: ['Passed', 'Failed'], required: false }, 
    { label: 'Eligibility for Final Exit Exam', name: 'exit_exam_eligibility', type: 'select', options: ['Eligible', 'Not Eligible'], required: false },
   
    { type: 'heading', text: 'V. Post-Completion & Alumni Phase (PG Specific)' },
    { type: 'heading', text: 'Speciality Certification' },
    { label: 'PG Degree Awarded (e.g., MD, MS, M.Ch., DM, DNB)', name: 'pg_degree_awarded', type: 'text', required: false },

    { label: 'Date of Degree Award', name: 'pg_degree_award_date', type: 'date', required: false },
    { type: 'heading', text: 'post-PG Registration' },
    { label: 'Updated Medical Council Registration Number (with PG qualification)', name: 'updated_medical_registration_number', type: 'text', required: false },
    { label: 'Updated Medical Council Registration Date', name: 'updated_medical_registration_date', type: 'date', required: false },

   { type: 'heading', text: 'VI. Employment & Further Education (Post-PG)' },
   { type: 'heading', text: 'Employment Details (initial Post-PG)' },

   { label: 'First Employer Name', name: 'first_employer_name', type: 'text', required: false },
   { label: 'Position', name: 'post_pg_position', type: 'text', required: false },
   { label: 'Start Date', name: 'employment_start_date', type: 'date', required: false },
   { type: 'heading', text: 'Further Fellowships/Super-Specialization' },

   { label: 'Applied for Fellowship/Super-Specialization', name: 'applied_for_fellowship', type: 'select', options: ['Yes', 'No'], required: false },
   { label: 'Fellowship/Super-Specialization Program Name', name: 'fellowship_program_name', type: 'text', required: false },
]

const  ExaminationAssessment = () => {
    return (
      <FormComponent
        formTitle="Admission & OnBoarding Phase Post-Completion & Alumini Phase(PG Specific)"
        formName="ExaminationAssessment"
        fields={constfields}
      />
    );
  };
  
  export default ExaminationAssessment;
  