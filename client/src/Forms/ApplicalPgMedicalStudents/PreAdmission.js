import React from 'react';
import FormComponent from './FormComponent';

const medicalQualificationFields = [
    { label: 'PG Entrance Exam Name (e.g..,NEET PG,INI-CET ,State ', name: 'pg_entrance', type: 'text', required: true },
    { label: 'PG Entrance Exam Roll Number', name: 'pg_roll', type: 'text', required: true },
    { label: 'PG Entrance Exam Score/Percentile', name: 'pg_score', type: 'text', required: true },
    { label: 'PG Entrance Exam Rank', name: 'pg_rank', type: 'text', required: true },
    { type: 'heading', text: 'Section Title' },
    {
        label: 'University/Institution of Undergraduate Degree',
        name: 'ug_university',
        type: 'select',
        required: true,
        options: ['MBBS', 'BDS']
      },
      
  { label: 'Year of Passing Undergraduate Degree', name: 'ug_passing_year', type: 'text', required: true },
  { label: 'Undergraduate Aggregate Percentage/GPA', name: 'ug_percentage', type: 'text' },
  { label: 'Internship Completion Date', name: 'internship_date', type: 'date' },
  { label: 'Medical Council Registration Number(State/MCI/NMC', name: 'reg_number', type: 'text', required: true },
  { label: 'Medical Council Registration Date', name: 'reg_date', type: 'date' },
  { label: 'Experience (if any, post-internship/UG)', name: 'experience', type: 'textarea' },
  { label: 'Preferred PG Specialty 1', name: 'specialty1', type: 'text' },
  { label: 'Preferred PG Specialty 2', name: 'specialty2', type: 'text' },
  { label: 'Preferred PG Specialty 3', name: 'specialty3', type: 'text' },
  {
    label: 'Rural Service Bond Status',
    name: 'bond_status',
    type: 'radio',
    options: ['Yes', 'No'],
    required: true
  },
  {
    label: 'Bond Duration',
    name: 'bond_duration',
    type: 'text',
    conditional: { field: 'bond_status', value: 'Yes' }
  },
  {
    label: 'Bond Amount',
    name: 'bond_amount',
    type: 'text',
    conditional: { field: 'bond_status', value: 'Yes' }
  }
];

const MedicalQualificationFormPage = () => {
  return (
    <FormComponent
      formTitle="Medical Qualification Details"
      formName="medicalQualificationForm"
      fields={medicalQualificationFields}
        nextRoute="/onboard"
    />
  );
};

export default MedicalQualificationFormPage;
