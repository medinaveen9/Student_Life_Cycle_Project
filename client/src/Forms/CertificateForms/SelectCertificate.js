import React, { useState, useEffect } from "react";
import "../../styles/Certificates/SelectCertficateForm.css";
import axiosInstance from "../../components/AxiosInstance";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

const certificates = [
    { key: "tc", label: "Transfer Certificate" },
    { key: "bonafide", label: "Bonafide Certificate" },
    { key: "custodian", label: "Custodian Certificate" },
    { key: "study", label: "Study Certificate" },
];

const certificateForms = {
    tc: [
        { type: "text", label: "Fee Receipt No", name: "receiptNo", required: true },
        { type: "number", label: "Fee Amount", name: "amount", required: true },
        { type: "date", label: "Date of Payment", name: "paymentDate", required: true },
        { type: "file", label: "Documents for Required Certificate", name: "Required Certificates", required: true },
        { type: "file", label: "Provisional Certificate", name: "Provisional Certificate", required: true },
        { type: "file", label: "No Due Certificate", name: "No Due", required: true },
        { type: "file", label: "Fee Receipt", name: "Fee Receipt", required: true },
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

export default function CertificateSelection({ user }) {
    const [data, setData] = useState({});
    const [selected, setSelected] = useState("");
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(true);
    const [filePreviews, setFilePreviews] = useState({});

    // Fetch student info
    useEffect(() => {
        if (!user?.userId) return;
            const fetchUser = async () => {
            try {
                const res = await axiosInstance.get("/api/master/student_info", {
                    params: { application_no: user.userId },
                });
                if (res.data.success) setData(res.data.data);
            } catch (err) {
                console.error("Error fetching user:", err);
                alert("Failed to fetch student data.");
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [user]);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value, files } = e.target;

        setFormData((prev) => ({
            ...prev, [name]: files ? Array.from(files) : value, }));

        // Handle preview if file selected
        if (files && files[0]) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                setFilePreviews((prev) => ({
                    ...prev,
                    [name]: {
                        url: event.target.result,
                        type: file.type,
                        name: file.name,
                    },
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    // Open file preview in new tab
    const openInNewTab = (name) => {
        const file = filePreviews[name];
        if (file) {
            const newWindow = window.open();
            newWindow.document.write(`
                <iframe src="${file.url}" frameborder="0" 
                style="width:100%;height:100vh;"></iframe>
            `);
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selected) return alert("Select a certificate type");

        let certificate_data = {};
        if (selected.toUpperCase() === "TC") {
            certificate_data = {
                receipt_no: formData.receiptNo,
                amount: formData.amount,
                payment_date: formData.paymentDate,
            };
        }

        try {
            const payload = {
                certificate_type: selected.toUpperCase(),
                roll_no: data.application_no,
                department: data.department,
                course_name: data.course_name,
                name: data.name,
                certificate_details: certificate_data,
            };

            const res = await axiosInstance.post("/api/certificates/request_form", payload);
            const id = res.data?.certificate_id;

            if (id) {
                const upload = new FormData();
                upload.append("certificate_type", selected.toUpperCase());
                ["Required Certificates", "Provisional Certificate", "No Due", "Fee Receipt"].forEach((f) =>
                formData[f]?.forEach((file) => upload.append(f, file))
                );
                await axiosInstance.post(`/api/certificates/upload/${id}`, upload, {
                headers: { "Content-Type": "multipart/form-data" },
                });
            }

            alert("Form submitted successfully!");
            setSelected("");
            setFormData({});
            setFilePreviews({});
            } catch (err) {
            console.error(err);
            alert("Submission failed!");
        }
    };

    if (loading) return <p className="loading-text">Loading student info...</p>;

    return (
        <div className="certificate-container">
            <form onSubmit={handleSubmit} className="certificate-form">
                <h2 className="form-title">Certificate Request Form</h2>

                {/* Certificate Type */}
                <div className="form-group">
                <label className="form-label">Select Certificate Type</label>
                <select className="form-input" value={selected} onChange={(e) => setSelected(e.target.value)}
                    required >
                    <option value="">-- Select Certificate --</option>
                    {certificates.map(({ key, label }) => (
                        <option key={key} value={key}>{label} </option>
                    ))}
                </select>
                </div>

                {/* Student Info */}
                <div className="student-info">
                    <h3>Student Information</h3>
                    <div className="info-grid">
                        <p><strong>Application No:</strong> {data.application_no}</p>
                        <p><strong>Department:</strong> {data.department}</p>
                        <p><strong>Course:</strong> {data.course_name}</p>
                        <p><strong>Name:</strong> {data.name}</p>
                        <p><strong>Father's Name:</strong> {data.father_name}</p>
                        <p><strong>Date of Birth:</strong> {data.dob}</p>
                        <p><strong>Age:</strong> {data.age}</p>
                    </div>
                </div>

                {/* Dynamic Fields */}
                {selected &&
                    certificateForms[selected]?.map((f, i) => (
                        <div className="form-group" key={i}>
                        <label className="form-label">{f.label}</label>
                        {f.type === "select" ? (
                            <select className="form-input" name={f.name} onChange={handleInputChange}
                                required={f.required} >
                            <option value="">Select</option>
                            {f.options.map((opt, j) => (
                                <option key={j} value={opt}>{opt} </option>
                            ))}
                            </select>
                        ) : (
                            <div style = {{ display : "flex", gap : "20px", alignItems : "center" }}>
                                <input className="form-input" type={f.type} name={f.name}
                                    accept={f.type === "file" ? ".jpg,.jpeg,.png,.pdf" : undefined}
                                    onChange={handleInputChange} required={f.required}
                                />

                                {f.type === "file" && filePreviews[f.name] && (
                                    <div className="file-preview" style={{
                                        marginTop: "10px", display: "flex", alignItems: "center",  gap: "8px",
                                    }}
                                    >
                                    {filePreviews[f.name].type.startsWith("image/") ? (
                                        <InsertPhotoIcon
                                        sx={{ fontSize: 36, color: "#1976d2", cursor: "pointer" }}
                                        onClick={() => openInNewTab(f.name)}
                                        />
                                    ) : (
                                        <PictureAsPdfIcon
                                        sx={{ fontSize: 36, color: "#d32f2f", cursor: "pointer" }}
                                        onClick={() => openInNewTab(f.name)}
                                        />
                                    )}
                                    <p style={{ margin: 0, fontWeight: 500 }}>
                                        {filePreviews[f.name].name}
                                    </p>
                                    </div>
                                )}
                            </div>
                        )}
                        </div>
                    ))}

                    {selected && (
                        <div className="form-actions">
                            <button type="reset" className="btn cancel">Cancel </button>
                            <button type="submit" className="btn submit"> Submit </button>
                        </div>
                    )}
            </form>
        </div>
    );
}
