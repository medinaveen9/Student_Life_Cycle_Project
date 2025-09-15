// certificateForms.js
import React, { useState, useEffect ,useRef} from "react";
import "../../styles/Certificates/SelectCertificate.css";
import "../../styles/Certificates/CertificateForm.css";
import axiosInstance from "../../components/AxiosInstance";

// Certificates
const certificates = [
  { key: "tc", label: "Transfer Certificate" },
  { key: "bonafide", label: "Bonafide Certificate" },
  { key: "custodian", label: "Custodian Certificate" },
  { key: "study", label: "Study Certificate" },
];

// Form fields for each certificate type
const certificateForms = {
    tc: [
       
        { type: "text", label: "Fee Receipt No", name: "receiptNo" },
        { type: "number", label: "Fee Amount", name: "amount" },
        { type: "date", label: "Date of Payment", name: "paymentDate" },
        { type: "file", label: "Documents for Required Certificate", name: "files" },
	    { type: "file", label: "Provisional Certificate",  name: "provfiles" },
        { type: "file", label: "No Due Certificate", name: "duefiles" },
        { type: "file", label: "Fee Reciecpt", name: "feefiles" }
    ],
    bonafide: [
        { type: "text", label: "Student Name", name: "studentName" },
        { type: "text", label: "Course Name", name: "course" },
        { type: "date", label: "Joining Date", name: "joiningDate" },
    ],
    custodian: [
        { type: "text", label: "Guardian Name", name: "guardian" },
        { type: "text", label: "Student Name", name: "studentName" },
        { type: "file", label: "Upload Supporting Documents", name: "files" },
    ],
    study: [
        { type: "text", label: "Student Name", name: "studentName" },
        { type: "select", label: "Class", name: "class", options: ["1st Year", "2nd Year", "3rd Year"], },
        { type: "file", label: "Upload ID Proof", name: "files" },
    ],
};


    export default function SelectCertificate({ user }) {
          const [data, setData] = useState({ application_no: "", department: "" ,course_name:"",name:""});
          const [error, setError] = useState("");
          const [selected, setSelected] = useState("");
          const [formData, setFormData] = useState({});
          const fetchOnce = useRef(false);


    useEffect(() => {
       if (user?.user_id) {
          const fetchUser = async () => {
          try {
            const [adminRes, personalRes] = await Promise.all([
                  axiosInstance.get("/api/master/administrative_information", {
            params: { application_no: user.user_id },
            }),
            axiosInstance.get("/api/master/personal_information", {
            params: { application_no: user.user_id },
          }),
        ]);

        setData({
          application_no: adminRes.data.application_no,
          department: adminRes.data.department,
          course_name: adminRes.data.course_name,
          name: personalRes.data.name,
        });
      } catch (err) {
        console.error("Error fetching info:", err);
        setError("Failed to fetch info");
      }
    };

     fetchUser();
      }
    },[user]);

     if (!user) return <p>Loading user data...</p>;

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setFormData((prev) => ({ ...prev, [name]: Array.from(files) }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    // Submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selected) {
            alert("Please select a certificate type");
            return;
        }
      
    let formPayload = {
        certificate_type: selected.toUpperCase(), // Always include certificate type
        application_no: data.application_no,      // Always include application_no
        department: data.department ,
        course_name:data.course_name  , 
        name:data.name           // Always include department
      };

        if (selected === "tc") {
            formPayload = {
               ...formPayload, 
                receipt_no: formData.receiptNo || "",
                amount: formData.amount || "",
                date_of_payment: formData.paymentDate || "",
            };
        }
        formPayload.certificate_type = selected.toUpperCase();
        const formResponse = await axiosInstance.post(
             "/api/certificates/request_form", formPayload );

        const responseId = formResponse?.data?.certificate?.id;
        if (responseId) {
            try {
                const uploadData = new FormData();
                // Collect all possible file inputs (works for TC + others)
                ["files", "provfiles", "duefiles", "feefiles"].forEach((field) => {
                    if (formData[field] && formData[field].length > 0) {
                    formData[field].forEach((file) => {
                    uploadData.append("files", file); // all grouped under same "files" key
                    });
                }
                });

                await axiosInstance.post(
                `/api/certificates/upload/${responseId}`,
                uploadData,
                { headers: { "Content-Type": "multipart/form-data" } }
                );
            } catch (err) {
                console.error("File upload error:", err);
                alert("Error uploading files. Please try again.");
                return;
            }
        }

        console.log("Form Data Submitted:", formResponse);
        alert("Form submitted successfully!");
    };

    return (
        <div className="study_main">
            <form onSubmit={handleSubmit} className="study_main">
                <div className="sub_study_main">Select Certificate</div>

                {/* Dropdown for certificate type */}
                <div className="form_group">
                <label className="form_label">Certificate Type</label>
                <select className="form_input" value={selected} required
                    onChange={(e) => {
                    setSelected(e.target.value);
                    setFormData({});
                    }}  >
                    <option value="">--Select Certificate--</option>
                    {certificates.map((cert) => (
                    <option key={cert.key} value={cert.key}>{cert.label} </option>
                    ))}
                </select>
                </div>
            {/* 🔹 Common Student Information Block (One for All Certificates) */}
                <div className="form_group">
                       <label className="form_label">Student Information</label>
                      <div className="form_common_block">
                         <p><strong>Application No:</strong> {data.application_no}</p>
                         <p><strong>Department:</strong> {data.department}</p>
                         <p><strong>Course Name:</strong> {data.course_name}</p>
                        <p><strong>Student Name:</strong> {data.name}</p>
                    </div>
               </div>

                {/* Render form fields dynamically */}
                {selected &&
                certificateForms[selected]?.map((field, idx) => {
                    if (field.type === "text" || field.type === "date" || field.type === "number" ) {
                        return (
                            <div className="form_group" key={idx}>
                                <label className="form_label">{field.label}</label>
                                <input className="form_input" type={field.type} name={field.name}
                                    onChange={handleInputChange} required />
                            </div>
                        );
                    }
                    if (field.type === "select") {
                        return (
                            <div className="form_group" key={idx}>
                                <label className="form_label">{field.label}</label>
                                <select className="form_input" name={field.name} onChange={handleInputChange} required >
                                    <option value="">Select</option>
                                    {field.options.map((opt, i) => (
                                        <option key={i} value={opt}> {opt} </option>
                                    ))}
                                </select>
                            </div>
                        );
                    }
                    if (field.type === "file") {
                        return (
                            <div className="form_group" key={idx}>
                                <label className="form_label">{field.label}</label>
                                <input className="form_input" type="file" name={field.name}
                                    multiple onChange={handleInputChange} />
                            </div>
                        );
                    }
                    return null;
                })}

        {/* Show buttons only if a certificate type is chosen */}
                {selected && (
                    <div style={{ display: "flex", gap: "10px" }}>
                        <button type="reset" className="button_style"> Cancel </button>
                        <button type="submit" className="button_style"> Submit </button>
                    </div>
                )}
            </form>
        </div>
    );
}
