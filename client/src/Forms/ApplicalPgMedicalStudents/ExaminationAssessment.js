
import React from 'react';
import FormComponent from './FormComponent';

const constFields = [
  { type: 'heading', text: 'IV. Examination & Assessment Phase (PG Specific)' },
  { type: 'heading', text: 'Internal Assesment for PG' },
  { label: 'Internal Assessment Marks (Theory)', name: 'int_theory', type: 'text', required: false },
  { label: 'Internal Assessment Marks (Practical)', name: 'in_practical', type: 'text', required: false },
  { label: 'Internal Assessment Marks (Clinical)', name: 'int_clinical', type: 'text', required: false },
  { label: 'Periodical Assessment Dates', name: 'per_dates', type: 'date', required: false },
  
  { type: 'heading', text: 'PG Final Examination Details' },
  { label: 'Theory Papers Passed/Failed', name: 'theory_status', type: 'select', options: ['Passed', 'Failed'], required: false },
  { label: 'Practical/Clinical Exam Status', name: 'practical_status', type: 'select', options: ['Passed', 'Failed'], required: false },
  { label: 'Viva Voce Status', name: 'viva_voce_status', type: 'select', options: ['Passed', 'Failed'], required: false },
  { label: 'Eligibility for Final Exit Exam', name: 'exam_eligibility', type: 'select', options: ['Eligible', 'Not Eligible'], required: false },

  { type: 'heading', text: 'V. Post-Completion & Alumni Phase (PG Specific)' },
  { type: 'heading', text: 'Speciality Certification' },
  { label: 'PG Degree Awarded (e.g., MD, MS, M.Ch., DM, DNB)', name: 'pg_awarded', type: 'text', required: false },
  { label: 'Date of Degree Award', name: 'award_date', type: 'date', required: false },

  { type: 'heading', text: 'post-PG Registration' },
  { label: 'Updated Medical Council Registration Number (with PG qualification)', name: 'registration_no', type: 'text', required: false },
  { label: 'Updated Medical Council Registration Date', name: 'registration_date', type: 'date', required: false },

  { type: 'heading', text: 'VI. Employment & Further Education (Post-PG)' },
  { type: 'heading', text: 'Employment Details (initial Post-PG)' },
  { label: 'First Employer Name', name: 'employer_name', type: 'text', required: false },
  { label: 'Position', name: 'pg_position', type: 'text', required: false },
  { label: 'Start Date', name: 'start_date', type: 'date', required: false },

  { type: 'heading', text: 'Further Fellowships/Super-Specialization' },
  { label: 'Applied for Fellowship/Super-Specialization', name: 'applied_fellowship', type: 'select', options: ['Yes', 'No'], required: false },
  { label: 'Fellowship/Super-Specialization Program Name', name: 'fellowship_program_name', type: 'text', required: false },
];

const ExaminationAssessment = () => {
  return (
    <FormComponent
      formTitle="Examination & Assessment Phase (PG Specific)"
      formName="pg_examination_assessment"
      fields={constFields}
    />
  );
};

export default React.memo(ExaminationAssessment);
