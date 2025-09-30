import React, { useState, Suspense, lazy, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate} from 'react-router-dom';
import { Box, CssBaseline, CircularProgress } from '@mui/material';
import axiosInstance from './components/AxiosInstance';

import AppBar from './components/AppBar';
import Sidebar from './components/SideMenu';

// Lazy imports
const LoginForm = lazy(() => import('./Forms/LoginPage/LoginForm'));
const CheckerDashboard = lazy(() => import('./Forms/LoginPage/CheckerDashboard'));
const ApproverDashboard = lazy(() => import('./Forms/LoginPage/ApproverDashboard'));

const TransferCertificate = lazy(() => import('./Forms/Certificates/TransferCertificate'));
const Bonafide = lazy(() => import('./Forms/Certificates/Bonafide'));
const BscNursing2Year = lazy(() => import('./Forms/BscNursingForms/BscNursing2Year'));
const BscNursing3Year = lazy(() => import('./Forms/BscNursingForms/BscNursing3Year'));
const BscNursing4Year = lazy(() => import('./Forms/BscNursingForms/BscNursing4Year'));
const BPTSemester1 = lazy(() => import('./Forms/BachelorofPhysiotherapyForms/BPTSemester1'));
const BPTSemester2 = lazy(() => import('./Forms/BachelorofPhysiotherapyForms/BPTSemester2'));
const NursingSemester1 = lazy(() => import('./Forms/BscNursing4YDCForms/NursingSemester1'));
const NursingSemester2 = lazy(() => import('./Forms/BscNursing4YDCForms/NursingSemester2'));
const NursingSemester3 = lazy(() => import('./Forms/BscNursing4YDCForms/NursingSemester3'));
const BPTSemester3 = lazy(() => import('./Forms/BachelorofPhysiotherapyForms/BPTSemester3'));
const BPTSemester4 = lazy(() => import('./Forms/BachelorofPhysiotherapyForms/BPTSemester4'));
const BPTSemester5 = lazy(() => import('./Forms/BachelorofPhysiotherapyForms/BPTSemester5'));
const BPTSemester6 = lazy(() => import('./Forms/BachelorofPhysiotherapyForms/BPTSemester6'));
const BPTSemester7 = lazy(() => import('./Forms/BachelorofPhysiotherapyForms/BPTSemester7'));
const BPTSemester8 = lazy(() => import('./Forms/BachelorofPhysiotherapyForms/BPTSemester8'));
const NursingSemester4 = lazy(() => import('./Forms/BscNursing4YDCForms/NursingSemester4'));
const AnesthesiaFirstYear = lazy(() => import('./Forms/BscAnesthesiaForms/AnesthesiaFirstYear'));
const MLTSecondYear = lazy(() => import('./Forms/BscMedicalLaboratorytechnologyForms/MLTSecondYear'));
const MLTThirdYear = lazy(() => import('./Forms/BscMedicalLaboratorytechnologyForms/MLTThirdYear'));
const AnesthesiaSecondYear = lazy(() => import('./Forms/BscAnesthesiaForms/AnesthesiaSecondYear'));
const AnesthesiaThirdYear = lazy(() => import('./Forms/BscAnesthesiaForms/AnesthesiaThirdYear'));
const HMCFirstYearSemester1 = lazy(() => import('./Forms/HospitalMangementCourseForms/HMCFirstYearSemester1'));
const HMCFirstYearSemester2 = lazy(() => import('./Forms/HospitalMangementCourseForms/HMCFirstYearSemester2'));
const HMCSecondYearSemester3 = lazy(() => import('./Forms/HospitalMangementCourseForms/HMCSecondYearSemester3'));
const HMCSecondYearSemester4 = lazy(() => import('./Forms/HospitalMangementCourseForms/HMCSecondYearSemester4'));
const HMCInternship = lazy(() => import('./Forms/HospitalMangementCourseForms/HMCInternship'));
const MPTFirstYear = lazy(() => import('./Forms/MasterofPhysiotherapyForms/MPTFirstYear'));
const MPTSecondYear = lazy(() => import('./Forms/MasterofPhysiotherapyForms/MPTSecondYear'));
const NMTFirstYear = lazy(() => import('./Forms/NuclearMedicineTechnologyForms/NMTFirstYear'));
const NMTSecondYear = lazy(() => import('./Forms/NuclearMedicineTechnologyForms/NMTSecondYear'));
const GeneticCounsellingCourse = lazy(() => import('./Forms/GeneticCounsellingCourse Forms/GeneticCounsellingCourse'));

const FeePaymentDetails = lazy(() => import('./Forms/ApplicationBPT/FeePaymentDetails'));
const PersonalInformation = lazy(() => import('./Forms/ApplicationBPT/PersonalInformation'));
const IdentityVerification = lazy(() => import('./Forms/ApplicationBPT/IdentityVerification'));
const IntermediateDetails = lazy(() => import('./Forms/ApplicationBPT/IntermediateDetails'));
const AcademicRecord = lazy(() => import('./Forms/ApplicationBPT/AcademicRecord'));
const AdministrativeInformation = lazy(() => import('./Forms/ApplicationBPT/AdministrativeInformation'));
const CourseSelection = lazy(() => import('./Forms/ApplicationBPT/CourseSelection'));
const ContactDetails = lazy(() => import('./Forms/ApplicationBPT/ContactDetails'));
const OnBoardingPhase = lazy(() => import('./Forms/ApplicalPgMedicalStudents/OnBoardingPhase'));
const DocumentsUpload = lazy(() => import('./Forms/ApplicationBPT/DocumentsUpload'));
const ApplicationReport = lazy(() => import('./Forms/ApplicationBPT/ApplicationReport'));

const PreAdmission = lazy(() => import('./Forms/ApplicalPgMedicalStudents/PreAdmission'));
const ExaminationAssessment = lazy(() => import('./Forms/ApplicalPgMedicalStudents/ExaminationAssessment'));

const PersonalAcademicInfo = lazy(() => import('./Forms/ApplicationReport/PersonalAcademicInfo'));
const CourseDetails = lazy(() => import('./Forms/ApplicationReport/CourseDetails'));
const Uploads = lazy(() => import('./Forms/ApplicationReport/Uploads'));

const Attendance_Certificate = lazy(() => import('./Forms/Certificates/Attendence_Certificate'));
const Custodian = lazy(() => import('./Forms/Certificates/Custodian'));
const CustodianCertificate = lazy(() => import('./Forms/Certificates/CustodianCertificate'));
const LossOfPay = lazy(() => import('./Forms/Certificates/LossOfPay'));
const Maternity = lazy(() => import('./Forms/Certificates/Maternity'));
const MaternityLeave = lazy(() => import('./Forms/Certificates/MaternityLeave'));
const MedicalFeeNote = lazy(() => import('./Forms/Certificates/MedicalFeeNote'));
const ObserversAttendance = lazy(() => import('./Forms/Certificates/ObserverAttendance'));
const ObserverPermission = lazy(() => import('./Forms/Certificates/ObserverPermission'));
const ProvisionalAdmission = lazy(() => import('./Forms/Certificates/ProvisionalAdmission'));

const StipendTableAgreements = lazy(() => import('./Forms/Certificates/StipendTableAgreements'));

const GCAdministrativeInformation = lazy(() => import('./Forms/MPTGeneticCounsellingCourseApplication/AdministrativeInformation'));
const GCFeePaymentDetails = lazy(() => import('./Forms/MPTGeneticCounsellingCourseApplication/FeePaymentDetails'));
const GCPersonalInformation = lazy(() => import('./Forms/MPTGeneticCounsellingCourseApplication/PersonalInformation'));
const GCDocumentsUpload = lazy(() => import('./Forms/MPTGeneticCounsellingCourseApplication/DocumentsUpload'));
const GCContactDetails = lazy(() => import('./Forms/MPTGeneticCounsellingCourseApplication/ContactDetails'));
const GCEducationalDetails = lazy(() => import('./Forms/MPTGeneticCounsellingCourseApplication/EducationalDetails'));

const MPTReportPersonalAcademicInfo = lazy(() => import('./Forms/MasterPhysiotherapyApplicationReport/PersonalAcademicInfo'));
const MPTReportUploads = lazy(() => import('./Forms/MasterPhysiotherapyApplicationReport/Uploads'));

const GcReportPersonalAcademicInfo = lazy(() => import('./Forms/GeneticCounsellingApplicationCourseReport/GcPersonalAcademicInfo'));
const GcReportUploads = lazy(() => import('./Forms/GeneticCounsellingApplicationCourseReport/GcUploads'));

const SelectCertificatePage = lazy(() => import('./Forms/Certificates/SelectCertificate'));
const RoleAssignment = lazy(() => import('./Forms/AdministrationAssignment/RoleAssignment'));
const CourseStipendForm = lazy(() => import('./Forms/AdministrationAssignment/AddCourseStipend'));
const StipendForm = lazy(() => import('./Forms/StipendManagement/StipendForm'));
const StipendTable = lazy(() => import('./Forms/StipendManagement/StipendTable'));
const LeavesManagement = lazy(() => import('./Forms/StipendManagement/LeavesManagement'));

const App = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({});
  const isRegistration = location.pathname === '/login';
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const [editableData, setEditableData] = useState(null);

  // Axios instance to verify user
  const verifyUser = async () => {
    try {
      const res = await axiosInstance.get('/api/user/verify');
      setUser(res.data?.user);
    } catch (error) {
      setUser(null);
      navigate('/login');
      console.log("User is not logged in");
    }
  };

  // Re-verify user on route change
  useEffect(() => { 
    if(window.location.pathname !== '/login')  {
      verifyUser();
    }
  }, [window.location.pathname]);

  return (
    <Suspense fallback={
      <Box sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>}>
      {isRegistration ? (
        <Routes>
          <Route path="/login" element={<LoginForm setUser = {setUser} />} />
        </Routes>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CssBaseline />
          <AppBar user = {user}/>
          <Box sx={{ display: 'flex', marginTop: '90px' }}>
            <Sidebar user = {user}/>
            <Box component="main" sx={{ flexGrow: 1, padding: 3, height: '100vh' }}>
                <Routes location={location}>
                  <Route path="/" element={<TransferCertificate />} />
                  <Route path="/checker" element ={<CheckerDashboard/>} />
                  <Route path="/approver" element={<ApproverDashboard/>} />
                  <Route path="/nurs2y" element={<BscNursing2Year />} />
                  <Route path="/nurs3y" element={<BscNursing3Year />} />
                  <Route path="/nurs4y" element={<BscNursing4Year />} />
                  <Route path="/nursingsem1" element={<NursingSemester1 />} />
                  <Route path="/bpt1" element={<BPTSemester1 />} />
                  <Route path="/bpt2" element={<BPTSemester2 />} />
                  <Route path="/bpt3" element={<BPTSemester3 />} />
                  <Route path="/bpt4" element={<BPTSemester4 />} />
                  <Route path="/bpt5" element={<BPTSemester5 />} />
                  <Route path="/bpt6" element={<BPTSemester6 />} />
                  <Route path="/bpt7" element={<BPTSemester7 />} />
                  <Route path="/bpt8" element={<BPTSemester8 />} />
                  <Route path="/nursingsem4" element={<NursingSemester4 />} />
                  <Route path="/nursingsem3" element={<NursingSemester3 />} />
                  <Route path="/nursingsem2" element={<NursingSemester2 />} />
                  <Route path="/anesthesia1" element={<AnesthesiaFirstYear />} />
                  <Route path="/anesthesia2" element={<AnesthesiaSecondYear />} />
                  <Route path="/mlt2" element={<MLTSecondYear />} />
                  <Route path="/anesthesia3" element={<AnesthesiaThirdYear />} />
                  <Route path="/mlt3" element={<MLTThirdYear />} />
                  <Route path="/hmc1" element={<HMCFirstYearSemester1 />} />
                  <Route path="/hmc2" element={<HMCFirstYearSemester2 />} />
                  <Route path="/hmc3" element={<HMCSecondYearSemester3 />} />
                  <Route path="/hmc4" element={<HMCSecondYearSemester4 />} />
                  <Route path="/bonafide" element={<Bonafide />} />
                  <Route path="/int" element={<HMCInternship />} />
                  <Route path="/mpt1" element={<MPTFirstYear />} />
                  <Route path="/mpt2" element={<MPTSecondYear />} />
                  <Route path="/nmt1" element={<NMTFirstYear />} />
                  <Route path="/nmt2" element={<NMTSecondYear />} />
                  <Route path="/genetic" element={<GeneticCounsellingCourse />} />

                  <Route path="/preadmission" element={<PreAdmission />} />
                  <Route path="/onboard" element={<OnBoardingPhase />} />
                  <Route path="/exam" element={<ExaminationAssessment />} />

                  <Route path="/administrative" element={<AdministrativeInformation />} />

                  <Route path="/inter" element={<IntermediateDetails />} />
                  <Route path="/academicrecord" element={<AcademicRecord />} />
                  <Route path="/contact" element={<ContactDetails />} />
                  <Route path="/upload" element={<DocumentsUpload />} />

                  <Route path="/appfee" element={<FeePaymentDetails />} />
                  <Route path="/personalinfo" element={<PersonalInformation />} />
                  <Route path="/identityverify" element={<IdentityVerification />} />
                  <Route path="/course" element={<CourseSelection />} />

                  <Route path="/academicinfo" element={<PersonalAcademicInfo />} />
                  <Route path="/coursedetails" element={<CourseDetails />} />
                  <Route path="/uploads" element={<Uploads />} />
                  <Route path="/report" element={<ApplicationReport />} />

                  {/* Certificates */}
                  <Route path="/attendancecertificate" element={<Attendance_Certificate />} />
                  <Route path="/custodian" element={<Custodian />} />
                  <Route path="/custocerificate" element={<CustodianCertificate />} />
                  <Route path="/lop" element={<LossOfPay />} />
                  <Route path="/maternity" element={<Maternity />} />
                  <Route path="/maternityleave" element={<MaternityLeave />} />
                  <Route path="/medicalfee" element={<MedicalFeeNote />} />
                  <Route path="/observerattendance" element={<ObserversAttendance />} />
                  <Route path="/observpermisson" element={<ObserverPermission />} />
                  <Route path="/proadmission" element={<ProvisionalAdmission />} />
                  <Route path="/stipendform" element={<StipendForm editableData = {editableData} 
                    user = {user} setEditableData = {setEditableData}/>} />
                  <Route path="/stipendtable" element={<StipendTable setEditableData = {setEditableData} 
                    user = {user} />} />
                  <Route path="/leavesmanagement" element={<LeavesManagement setEditableData = {setEditableData} 
                    user = {user} />} />
                  <Route path="/stipendagreements" element={<StipendTableAgreements />} />

                  {/* mptapplicationReport */}
                  <Route path="/mptacademicinfo" element={<MPTReportPersonalAcademicInfo />} />
                  <Route path="/mptuploads" element={<MPTReportUploads />} />

                  {/* geneticcounselling application */}
                  <Route path="/gcadministration" element={<GCAdministrativeInformation />} />
                  <Route path="/gcappfee" element={<GCFeePaymentDetails />} />
                  <Route path="/gcpersonalinfo" element={<GCPersonalInformation />} />
                  <Route path="/gcupload" element={<GCDocumentsUpload />} />
                  <Route path="/gccontact" element={<GCContactDetails />} />
                  <Route path="/gceducation" element={<GCEducationalDetails />} />

                  {/* geneticcounselling report */}
                  <Route path="/gcacademicinfo" element={<GcReportPersonalAcademicInfo />} />
                  <Route path="/gcuploads" element={<GcReportUploads />} />

                  {/* Certificates */}
                  <Route path="/selectcertificate" element={<SelectCertificatePage user = {user}/>} />
                  <Route path="/roleassignment" element={<RoleAssignment user = {user}/>} />
                  <Route path="/course_stipend" element={<CourseStipendForm user = {user}/>} />
                </Routes>
              
            </Box>
          </Box>
        </Box>
      )}
    </Suspense>
  );
};

export default App;
