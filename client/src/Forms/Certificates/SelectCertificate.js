
// certificateForms.js
import React, { useState } from "react";
import "../../styles/Certificates/SelectCertificate.css";
import "../../styles/Certificates/CertificateForm.css";
import axiosInstance from "../../components/AxiosInstance";

// Define available certificates
const certificates = [
    { key: "tc", label: "Transfer Certificate" },
    { key: "bonafide", label: "Bonafide Certificate" },
    { key: "custodian", label: "Custodian Certificate" },
    { key: "study", label: "Study Certificate" },
];

// Define form fields for each certificate type
const certificateForms = {
    tc: [
        { type: "text", label: "Application No", name: "applicationNo" },
        { 
            type: "select", 
            label: "Course Type", 
            name: "courseType", 
            options: ["BPT", "MPT"] 
        },
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
        { type: "select", label: "Class", name: "class", options: ["1st Year", "2nd Year", "3rd Year"] },
        { type: "file", label: "Upload ID Proof", name: "files" },
    ],
};

// Main component for selecting and filling certificate forms 
export default function SelectCertificate() {
    const [selected, setSelected] = useState(""); // Selected certificate type
    const [proceed, setProceed] = useState(false); // Whether to show the form
    const [formData, setFormData] = useState({}); // Form data state

    // Handle input changes for form fields
    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setFormData((prev) => ({ ...prev, [name]: Array.from(files),  })); // multiple uploads
        } 
        else {
            setFormData((prev) => ({ ...prev, [name]: value, }));
        }
    };

    // Handle proceed action
    const handleProceed = () => {
        if (!selected) {
            alert("Please select a certificate");
            return;
        }
        setProceed(true);
    };

    // Handle cancel action to go back to selection
    const handleCancel = () => {
        setProceed(false);
        setFormData({});
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        let formPayload = {};
        if(selected === "tc") {
            formPayload = { 
                application_no: formData.applicationNo || "", 
                course_type: formData.courseType || "", 
                receipt_no: formData.receiptNo || "", 
                amount: formData.amount || "", 
                date_of_payment: formData.paymentDate || "",
            };
        }
        formPayload.certificate_type = selected.toUpperCase();

        const formResponse = await axiosInstance.post(
            "/api/certificates/request_form", formPayload,
        );

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
                await axiosInstance.post(`/api/certificates/upload/${responseId}`,
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

    // Render component UI 
    return (
        <div className="study_main">
            {!proceed ? (
                <>
                    <div className="sub_study_main">Select Certificate</div>
                        {certificates.map((cert) => (
                            <label key={cert.key} className="radio_group_main">
                                <input  type="radio" name="certificate" value={cert.key} checked={selected === cert.key}
                                    onChange={() => setSelected(cert.key)} 
                                    style={{ transform: "scale(1.3)", cursor: "pointer" }} /> {cert.label}
                            </label>
                        ))}
                        <button className="button_style" onClick={handleProceed}> Proceed </button>
                </>
            ) : (
                <form onSubmit={handleSubmit} className="study_main">
                    <div className="sub_study_main">
                        {certificates.find((c) => c.key === selected)?.label} Request Form
                    </div>

                    {certificateForms[selected].map((field, idx) => {
                        if (field.type === "text" || field.type === "date" || field.type === "number") {
                            return (
                            <div className="form_group" key={idx}>
                                <label className="form_label">{field.label}</label>
                                <input
                                className="form_input"
                                type={field.type}
                                name={field.name}
                                onChange={handleInputChange}
                                required
                                />
                            </div>
                            );
                        }
                        if (field.type === "select") {
                            return (
                            <div className="form_group" key={idx}>
                                <label className="form_label">{field.label}</label>
                                <select
                                className="form_input"
                                name={field.name}
                                onChange={handleInputChange}
                                required
                                >
                                <option value="">--Select--</option>
                                {field.options.map((opt, i) => (
                                    <option key={i} value={opt}>
                                    {opt}
                                    </option>
                                ))}
                                </select>
                            </div>
                            );
                        }
                        if (field.type === "file") {
                            return (
                            <div className="form_group" key={idx}>
                                <label className="form_label">{field.label}</label>
                                <input
                                className="form_input"
                                type="file"
                                name={field.name}
                                multiple
                                onChange={handleInputChange}
                                />
                            </div>
                            );
                        }
                        return null;
                    })}


                    <div style={{ display: "flex", gap: "10px" }}>
                        <button type="button" className="button_style" onClick={handleCancel}> Cancel </button>
                        <button type="submit" className="button_style">Submit </button>
                    </div>
                </form>
            )}
        </div>
    );
}

