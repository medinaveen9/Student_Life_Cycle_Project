export const courseMenus = {
    BPT: [
        {
            id: "ApplicationFormBPT",
            label: "Bachelor of Physiotherapy Application",
            hasSubMenu: true,
            role: ["Maker", "Checker"],
            subItems: [
                { id: "administrativeInformation", label: "Administrative Information", path: "/administrative-information" },
                { id: "feePaymentDetails", label: "Fee Payment Details", path: "/fee-payment-details" },
                { id: "personalInformation", label: "Personal Information", path: "/personal-information" },
                { id: "identityVerification", label: "Identity Verification", path: "/identity-verification" },
                { id: "contactDetails", label: "Contact Details", path: "/contact-details" },
                { id: "educationalBackground", label: "Intermediate Details", path: "/educational-background" },
                { id: "courseSelection", label: "Course Selection", path: "/course-selection" },
                { id: "academicRecord", label: "Academic Record", path: "/academic-record" },
                { id: "documentsUpload", label: "Documents Upload", path: "/documents-upload" },
                { id: "applicationReport", label: "Application Report", path: "/application-report" }
            ]
        }
    ],

    MPT: [
        {
            id: "ApplicationReportMPT",
            label: "MPT Application Report",
            hasSubMenu: true,
            subItems: [
                { id: "PersonalAcademicInfo", label: "Personal & Academic Info", path: "/mptacademicinfo" },
                { id: "UploadedDocuments", label: "Uploaded Documents", path: "/mptuploads" }
            ]
        }
    ],

    MSc: [
        {
            id: "ApplicationReportGC",
            label: "M.Sc Genetic Counselling Report",
            hasSubMenu: true,
            subItems: [
                { id: "PersonalAcademicInfo", label: "Personal & Academic Info", path: "/gcacademicinfo" },
                { id: "UploadedDocuments", label: "Uploaded Documents", path: "/gcuploads" }
            ]
        }
    ]
};

export const commonMenu = [
    {
        id: 'Role Assignment',
        label: 'Role Assignment',
        hasSubMenu: false,
        role: ["Dean"],
        subItems: [
            { id: 'RoleAssignment', label: 'RoleAssigment', path: '/roleassignment' },
        ]
    },
    {
        id: 'Course Stipend',
        label: 'Course Stipend',
        hasSubMenu: false,
        role: ["Dean"],
        subItems: [
            { id: 'CourseStipend', label: 'CourseStipend', path: '/course_stipend' },
        ]
    },
    {
        id: 'Stipend Management',
        label: 'Stipend Management',
        hasSubMenu: true,
        role: ["Checker", "Approver", "Verifier", "FA", "FC"],
        subItems: [
            {id:'Stipend Form', label:'Stipend Form', path:'/stipendform'},
            {id:'Stipend Table', label:'Stipend Table', path:'/stipendtable'},
            {id:'Leaves Management', label:'Leaves Management', path:'/leavesmanagement'},
            {id:'Year Promotion', label:'Year Promotion', path:'/promotion'},
            {id:'Add Student', label:'Add Student', path:'/student'},
        ]
    },
    {
        id: 'Certificates',
        label: 'Certificates',
        hasSubMenu: true,
        role: ["Maker"],
        subItems: [
            { id: 'Certificates', label: 'Certificates', path: '/selectcertificate' },
            { id: 'CertificatesDashboard' ,label:'Certificates Dashboard', path:'/certificates/dashboard'},
        ]
    },
    {
        id: 'Certificates',
        label: 'Certificates',
        hasSubMenu: true,
        role: ["Checker", "Verifier", "Approver"],
        subItems: [
            { id: 'CertificatesDashboard' ,label:'Certificates Dashboard', path:'/certificates/dashboard'},
        ]
    },
    {
        id: 'Course Application',
        label: 'Course Application',
        hasSubMenu: false,
        role: ["Maker", "Checker"], 
        subItems: [
            {id: 'CourseSelection', label: 'Course Selection', path: '/course-selection' },     
        ]   
    },
    {
    id: 'Application Report MPT',
    label: 'MPT Application Report ',
    hasSubMenu: true,
    // role: ["Checker"],
    subItems: [
    
      { id: 'Personal&AcademicInfo', label: 'Personal & Academic Info', path: '/mptacademicinfo'},
      { id: 'Uploaded Documents', label: 'Uploaded Documents', path: '/mptuploads' },   

    ]
  },

  {
    id:  'Genetic Counselling Course Report ',
    label: 'M.Sc Genetic Counselling Report ',
    hasSubMenu: true,
    // role: ["Checker"],
    subItems: [
    
      { id: 'Personal&AcademicInfo', label: 'Personal & Academic Info', path: '/gcacademicinfo'},
      { id: 'Uploaded Documents', label: 'Uploaded Documents', path: '/gcuploads' },   

    ]
  },
  { 
    id:'Genetic Counselling Course Application ',
    label:'MPT & M.SC GC Application',
    hasSubMenu:true,
    role: ["Maker", "Checker"],
    subItems: [
      {id: 'AdministrativeInformation', label: 'Administrative Information', path: '/gcadministration' },
      {id:'FeePaymentDetails' ,label:'Fee Payment Details', path:'/gcappfee' },
      {id:'PersonalInformation' ,label:'Personal Information', path:'/gcpersonalinfo' },
      {id:'ContactDetails' ,label:'Contact Details', path:'/gccontact' },
      {id:'EducationalDetails' , label:' Educational Details',path:'/gceducation' },
      {id:'DocumentsUpload' ,label:'Documents Upload', path:'/gcupload' },
        
    ]
  },

    {
      id: 'ApplicationFormBPT',
      label: 'Bachelor of Physiotherapy Application',
      hasSubMenu: true,
       role: ["Maker", "Checker"],
      subItems: [
       
        {id:'AdministrativeInformation' ,label:'Administrative Information', path:'/administrative' },
        {id:'FeePaymentDetails' ,label:'Fee Payment Details', path:'/appfee' },
        {id:'PersonalInformation' ,label:'Personal Information', path:'/personalinfo' },
        {id:'IdentityVerification' ,label:'Identity Verification', path:'/identityverify' },
        {id:'ContactDetails' ,label:'Contact Details', path:'/contact' },
        {id:'IntermediateDetails' ,label:'Educational Background-Intermediate Level', path:'/inter' },
        {id:'CourseSelection' ,label:'Course Selection', path:'/course' },
        {id:'AcademicRecord' ,label:'Academic Record', path:'/academicrecord' }, 
        {id:'DocumentsUpload' ,label:'Documents Upload', path:'/upload' },
        {id:'ApplicationReport' ,label:'Application Report', path:'/report' },
      ]
    },
    
    {
      id: 'Application Report BPT',
      label: 'BPT Application Report ',
      hasSubMenu: true,
      role : [""],
      subItems: [
     
        { id: 'Personal&AcademicInfo', label: 'Personal & Academic Info', path: '/academicinfo' },
        { id: 'Course & Details', label: 'Course & Details', path: '/coursedetails' },
        { id: 'Uploaded Documents', label: 'Uploaded Documents', path: '/uploads' },   
      ]
    },
 
    {
      id: 'PG Medical Students',
      label: 'PG Medical Students Application',
      hasSubMenu: true,
      role : [""],
      subItems: [
     
        { id: 'PreAdmission', label: 'Pre Admission', path: '/preadmission' },
        { id: 'OnBoardingPhase', label: 'OnBoarding Phase', path: '/onboard' },
        { id: 'ExaminationAssessment', label:'Examination Assessment', path:'/exam'},
      ]
    },
    

    {
      id: 'Certificates',
      label: 'Certificates',
      hasSubMenu: true,
      role: [],
      subItems: [
     
        {id: 'TransferCertificate', label: 'Transfer Certificate', path: '/' },
        {id:'Bonafide', label:'Bonafide', path:'/bonafide'},
        {id:'Internship', label:'Internship',path:'/int'},
        {id:'Attendance_Certificate', label:'Attendance Certificate', path:'/attendancecertificate'},
        {id:'Custodian', label:'Custodian', path:'/custodian'},
        {id:'CustodianCertificate', label:'Custodian Certificate', path:'/custocerificate'},
        {id:'LossOfPay', label:'Loss Of Pay', path:'/lop'},
        {id:'Maternity', label:'Maternity', path:'/maternity'},
        {id:'MaternityLeave', label:'Maternity Leave', path:'/maternityleave'},
        {id:'MedicalFeeNote', label:'Medical Fee Note', path:'/medicalfee'},
        {id:'ObserversAttendance', label:'Observers Attendance', path:'/observerattendance'},
        {id:'ObserverPermission', label:'Observer Permission', path:'/observpermisson'},
        {id:'ProvisionalAdmission', label:'Provisional Admission', path:'/proadmission'},
        {id:'StipendForm', label:'Stipend Form', path:'/stipendform'},
        {id:'StipendTable', label:'Stipend Table', path:'/stipendtable'},
        {id:'StipendTableAgreements', label:'Stipend Table Agreements', path:'/stipendagreements'},   
      ]
    },

    {
      id: 'Nursing(Bsc)-4YDC',
      label: 'Nursing (Bsc)-4YDC',
      hasSubMenu: true,
      role : [""],
      subItems: [
  
        { id: 'NursingSemester1', label: 'Semester 1', path: '/nursingsem1' },
        { id:'NursingSemester2' , label: 'Semester 2', path: '/nursingsem2'},
        { id: 'NursingSemester3', label: 'Semester 3', path: '/nursingsem3' },
        { id: 'NursingSemester4', label: 'Semester 4', path: '/nursingsem4' },
      ]
    },
    { 
      id:'Nursing(Bsc)',
      label:'Nursing (Bsc)',
      hasSubMenu:true,
      role : [""],
      subItems: [
        { id: 'NursingSecondYear', label: ' Nursing Secondyear', path: '/nurs2y' },
        { id: 'NursingThirdYear', label:  'Nursing Thirdyear'  , path: '/nurs3y' },
        { id: 'NursingFourthYear', label: 'Nursing Fourthyear' , path: '/nurs4y' },
      ]
    },
 
    {
      id: 'Physiotherapy(BPT)',
      label: 'Physiotherapy (BPT)',
      hasSubMenu: true,
      role : [""],
      subItems: [
  
        { id: 'BPTemester1', label: 'Semester 1', path: '/bpt1' },
        { id: 'BPTSemester2', label: 'Semester 2', path: '/bpt2' },
        { id: 'BPTSemester3', label: 'Semester 3', path: '/bpt3' },
        { id: 'BPTSemester4', label: 'Semester 4', path: '/bpt4' },
        { id: 'BPTSemester5', label: 'Semester 5', path: '/bpt5' },
        { id: 'BPTSemester6', label: 'Semester 6', path: '/bpt6' },
        { id: 'BPTSemester7', label: 'Semester 7', path: '/bpt7' },
        { id: 'BPTSemester8', label: 'Semester 8', path: '/bpt8' },

      ]
    },
      
    { 
      id:'Anesthesia(Bsc)',
      label:'Anesthesia(Bsc)',
      hasSubMenu:true,
      role : [""],
      subItems: [
        { id: 'AnesthesiaFirstYear', label: 'Anesthesia FirstYear', path: '/anesthesia1' },
        { id: 'AnesthesiaSecondYear', label: 'Anesthesia SecondYear', path: '/anesthesia2' },
        { id:'AnesthesiaThirdYear' , label:'Anesthesia ThirdYear', path:'/anesthesia3'},
    
      ]
    },
    { 
      id:'Medical Laboratory Technology(Bsc)',
      label:'Medical Laboratory Technology(MLT)',
      hasSubMenu:true,
      role : [""],
      subItems: [
   
        { id: 'MLTSecondYear', label: 'MLT SecondYear', path: '/mlt2' },
        { id: 'MLTThirdYear', label: 'MLT ThirdYear', path: '/mlt3' },
      ]
    },
 
  
    { 
      id:'HospitalManagementCourse',
      label:'Hospital Management Course (HMC)',
      hasSubMenu:true,
      role : [""],
      subItems: [
        { id: 'HMCFirstYearSemester1', label: ' HMC FirstYear Semester1', path: '/hmc1' },
        { id: 'HMCFirstYearSemester2', label: ' HMC FirstYear Semester2', path: '/hmc2' },
        { id: 'HMCSecondYearSemester3', label: ' HMC SecondYear Semester3', path: '/hmc3' },
        { id: 'HMCSecondYearSemester4', label: ' HMC SecondYear Semester4', path: '/hmc4' },
      ]
    },

    { 
      id:'Master of Physiotherapy ',
      label:'Master of Physiotherapy (MPT)',
      hasSubMenu:true,
      role : [""],
      subItems: [
        { id: 'MPTFirstYear', label: ' MPT FirstYear', path: '/mpt1' },
        { id: 'MPTSecondYear', label: ' MPT SecondYear', path: '/mpt2' },
   
      ]
    },
     

    { 
      id:'Nuclear Medicine Technology(PG)',
      label:'Nuclear Medicine Technology (PG)',
      hasSubMenu:true,
      role : [""],
      subItems: [
        { id: 'NMTTFirstYear', label: ' NMT FirstYear', path: '/nmt1' },
        { id: 'NMTSecondYear', label: ' NMT SecondYear', path: '/nmt2' },
   
      ]
    },

    { 
      id:'Genetic Counselling Course',
      label:'Genetic Counselling Course',
      hasSubMenu:true,
      role : [""],
      subItems: [
        { id: 'GeneticCounsellingCourse', label: ' Genetic Counselling Course', path: '/genetic' },
      ]
    },
  ];  