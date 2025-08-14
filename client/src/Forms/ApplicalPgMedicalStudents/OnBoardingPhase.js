import React from 'react';
import FormComponent from './FormComponent';
    
const constfields = [   
    { type: 'heading', text: 'II. Admission & Onboarding Phase (PG Specific)' },
    { text: 'Mentor/Guide Allotment',  type: 'heading', required: true },
    { label: 'Assigned Guide/Mentor Name', name: 'mentor_name', type: 'text', required: true },
    { label: 'Guide/Mentor Department', name: 'mentor_department', type: 'text', required: true },
    { label: 'Guide/Mentor Contact Information', name: 'mentor_contact', type: 'text', required: true },
    { type: 'heading', text: 'Stipend Bank Account Details: (Often more critical for PG students receiving regular stipends)' },
    { label: 'Bank Name', name: 'bank_name', type: 'text', required: true },
    { label: 'Account Number', name: 'account_number', type: 'text', required: true },
    { label: 'IFSC Code', name: 'ifsc_code', type: 'text', required: true },
  
    { type: 'heading', text: 'III. Academic & Ongoing Management Phase (PG Specific)' },
    {type: 'heading',text: 'Thesis/Dissertaion Management:'},

    { label: 'Thesis/Dissertation Topic', name: 'thesis_topic', type: 'textarea', required: true },
    { label: 'Thesis/Dissertation Guide', name: 'thesis_guide', type: 'text', required: true },
    { label: 'Date of Thesis/Dissertation Proposal Submission', name: 'thesis_proposal_date', type: 'date', required: true },
    { label: 'Date of Ethics Committee Approval', name: 'ethics_approval_date', type: 'date', required: true },
    { label: 'Progress Report Submission Dates', name: 'progress_report_dates', type: 'date', required: false },
    { label: 'Final Thesis/Dissertation Submission Date', name: 'thesis_final_submission_date', type: 'date', required: true },
  

    { label: 'Final Thesis/Dissertation Submission Date', name: 'thesis_final_submission_date', type: 'date', required: true },
    { label: 'Viva Voce Date', name: 'viva_voce_date', type: 'date', required: true },
    {
      label: 'Thesis/Dissertation Status',
      name: 'thesis_status',
      type: 'select',
      options: ['Approved', 'Under Review', 'Revisions Required'],
      required: true
    },
  
 
    { type: 'heading', text: 'Research & Publication Activity' },  
    { label: 'Research Project Titles', name: 'research_titles', type: 'textarea', required: false },
    { label: 'Role in Research Projects', name: 'research_role', type: 'select', options:['Principal Invesigator','Co-Investigator'], required: false },
    { text: 'Publications (Journal Name, Title, Year, Co-authors)',  type: 'heading'},
    { label: 'Journal Name', name: 'journal_name' , type:'text', required:false}, 
    { label: 'Title', name: 'publication_title', type:'text', required:true},
    { label: 'Year', name: 'publication_year', type:'text', required:true },
    { label: 'Co-authors', name: 'co_authors' , type:'text', required :true},

    { text: 'Conference Presentations (Conference Name, Title, Year)',  type: 'heading'},
    { label: 'Conference Name', name: 'conference_name',type:'text', required:true },
    { label: 'Title', name: 'conference_title',type:'text', required:true  },
    { label: 'Year', name: 'conference_year',type:'text', required:true  },
    

    { type: 'heading', text: 'Clinical Rotations' },
  
    { label: 'Department Rotated', name: 'rotation_department', type: 'text', required: true },
    { label: 'Start Date of Rotation', name: 'rotation_start_date', type: 'date', required: true },
    { label: 'End Date of Rotation', name: 'rotation_end_date', type: 'date', required: true },
    { label: 'Performance Evaluation by Head of Department/Unit', name: 'performance_evaluation', type: 'textarea', required: true },
  
    { type: 'heading', text: 'Logbook/Case Record Management' },
    { label: 'Number of Cases Presented/Procedures Performed', name: 'cases_performed', type: 'text', required: true },
    { label: 'Logbook Submission Status', name: 'logbook_status', type: 'select', options: ['Submitted', 'Pending', 'Reviewed'], required: true },
    { label: 'Logbook Reviewer/Sign-off Authority', name: 'logbook_reviewer', type: 'text', required: true },
    { type: 'heading', text: 'Academic Presentations' },
    { label: 'Seminar/Journal Club Presentation Dates', name: 'presentation_dates', type: 'date', required: false },
    { label: 'Presentation Topics', name: 'presentation_topics', type: 'text', required: false },
    { label: 'Evaluation by Faculty', name: 'faculty_evaluation', type: 'text', required: false },
  

    { type: 'heading', text: 'PG Leave Management (Specific to Resident Doctors\' Duties)' },
    {
        label: 'On-Duty Leave Approvals (Conferences/External Postings)',
        name: 'on_duty_leave_approvals',
        type: 'select',
        required: true,
        options: ['Confernce', 'External Posting']
      },
      
    { label: 'Sick Leave Utilized (in Days)', name: 'sick_leave_utilized', type: 'number', required: false },
    { label: 'Casual Leave Utilized (in Days)', name: 'casual_leave_utilized', type: 'number', required: false },
    { label: 'Sick Leave Balance (in Days)', name: 'sick_leave_balance', type: 'number', required: false },
    { label: 'Casual Leave Balance (in Days)', name: 'casual_leave_balance', type: 'number', required: false },
  
    { type: 'heading', text: 'Appraisal / Performance Review' },
    { label: 'Annual Performance Review Dates', name: 'performance_review_dates', type: 'date', required: false },
    { label: 'Feedback from Department Head/Guide', name: 'guide_feedback', type: 'textarea', required: false },
    { label: 'Areas of Strengths', name: 'strengths', type: 'textarea', required: false },
    { label: 'Areas of Improvement', name: 'improvements', type: 'textarea', required: false },

  ]
        
const OnBoardingPhase = () => {
    return (
      <FormComponent
        formTitle="Admission & OnBoarding Phase(PG Specific)"
        formName="OnBoardingPhase"
        fields={constfields}
      />
    );
  };
  
  export default OnBoardingPhase;
  