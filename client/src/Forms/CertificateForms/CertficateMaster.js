import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { TextField, Button, MenuItem, Grid } from '@mui/material';
import { Box, Typography, Avatar } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import '../../styles/Certificates/CerticateMaster.css';
import "../../styles/Global.css";
import axiosInstance from "../../components/AxiosInstance";

export default function CertificateForm({}) {
    const [form, setForm] = useState(() => ({
        rollNo: '', 
        icrNumber: '',
        certificateName: '',
        fatherName: '',
        courseBatch: '',

        ddsCode: '',
        degreeName: '',
        passDate: '',
        typeIssued: [],
        regularSupply: '',

        totalMarks: '',
        obtainedMarks: '',
        percentage: '',
        division: '',

        staff1: '',
        staff2: '',
        staff3: '',
        staff4: '',

        //Provisional Details
        provisionalFeePaid: false,      // Yes/No checkbox
        provisionalFee: '',
        provisionalReceipt: '',
        provisionalReceiptDate: '',

        //OD Details
        odFeePaid: false,               // Yes/No checkbox
        odFee: '',
        odReceipt: '',
        odReceiptDate: '',              // new field (you had wrong name earlier)
        
        // Certificate Issue Status → success, under scrutiny, pending
        certificateIssueStatus: '',

        draftDate: '', 
        odFinalDate: '',
        provisionalFinalDate: '',

        studentImage: null
    }));
    
    const [showIssuedCertificates, setShowIssuedCertificates] = useState([]);
    const [showNotIssuedCertificates, setShowNotIssuedCertificates] = useState([]);
    const [disableButton, setDisableButton] = useState(false);  

    const [imageError, setImageError] = useState("");
    const [imagePreview, setImagePreview] = useState(null);


    const certificateOptions = useMemo(
        () => ['Degree', 'Marks Memo', 'Provisional Certificate', 'Final Certificate'],
        []
    );

    // Student image preview
    useEffect(() => {
        if (!form.studentImage) return setImagePreview(null);
        const url = URL.createObjectURL(form.studentImage);
        setImagePreview(url);
        return () => URL.revokeObjectURL(url);
    }, [form.studentImage]);

    // Handle input changes
    const handleChange = useCallback((e) => {
        const { name, value, files } = e.target;

        // Reset fields when regularSupply changes
        if (name === "regularSupply") {
            setForm((prev) => ({
                ...prev, [name]: value,
                totalMarks: "", obtainedMarks: "", percentage: "", division: value  === "Supply" ? "Pass Division" : ""}));
            }

        // Image validation
        if (name === "studentImage" && files && files[0]) {
            const file = files[0];

            const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
            const maxSize = 50 * 1024; // 50 KB

            // Type check
            if (!allowedTypes.includes(file.type)) {
                setImageError("Only JPG, JPEG, PNG images are allowed");
                setImagePreview(null);
                setForm(prev => ({ ...prev, studentImage: null }));
                return;
            }

            // Size check
            if (file.size > maxSize) {
                setImageError("File size must be less than 50 KB");
                setImagePreview(null);
                setForm(prev => ({ ...prev, studentImage: null }));
                return;
            }

            // Clear error
            setImageError("");

            // Preview
            const previewURL = URL.createObjectURL(file);
            setImagePreview(previewURL);

            // Save file in form state
            setForm(prev => ({ ...prev, studentImage: file }));
            return;
        }

        // Default handler
        setForm((prev) => ({ ...prev, [name]: value }));

    }, []);

    // Handle checkbox changes for Type of Certificate Issued
    const handleCheckbox = useCallback((option) => {
        setForm((prev) => {
            const exists = prev.typeIssued.includes(option);

            // If user tries to uncheck the last remaining item → do nothing
            if (exists && prev.typeIssued.length === 1) {
                return prev; 
            }

            return {
                ...prev,
                typeIssued: exists
                    ? prev.typeIssued.filter((o) => o !== option)
                    : [...prev.typeIssued, option]
            };
        });
    }, []);

    // Auto-calc percentage + division
    const calculatePercentage = useCallback(() => {
        const total = Number(form.totalMarks);
        const obtained = Number(form.obtainedMarks);

        if (total > 0 && !Number.isNaN(obtained)) {

            const percentValue = (obtained / total) * 100;
            const percent = percentValue.toFixed(2); // string
            const numericPercent = Number(percent);  // number

            let div = '';

            if (numericPercent >= 60) div = 'First Division';
            else if (numericPercent >= 55) div = 'Second Division';
            else if (numericPercent >= 50) div = 'Third Division';
            else div = 'Fail Division';

            if (form.regularSupply === "Supply") {
                div = "Pass Division";
            }

            setForm(prev => ({
                ...prev,
                percentage: percent,
                division: div
            }));
        }
    }, [form.totalMarks, form.obtainedMarks, form.regularSupply]);


    useEffect(() => {
        if (form.totalMarks && form.obtainedMarks) calculatePercentage();
    }, [form.totalMarks, form.obtainedMarks, calculatePercentage]);

    // Form validation
    const validateForm = (form) => {

        const requiredFields = [
            "rollNo", "icrNumber", "certificateName", "fatherName", "courseBatch",
            "ddsCode", "degreeName", "passDate", "typeIssued", "regularSupply",
            "staff1", "staff2", "staff3", "staff4",
            "certificateIssueStatus", 
        ];

        for (const field of requiredFields) {
            const value = form[field];
            if (typeof value === "string" && value.trim() === "") return `${field} is required`;
            if (Array.isArray(value) && value.length === 0) return `${field} is required`;
        }

        // Checkbox-dependent fields
        if (form.provisionalFeePaid) {
            if (!form.provisionalFee) return "Provisional Fee is required";
            if (!form.provisionalReceipt) return "Provisional Fee Receipt Number is required";
            if (!form.provisionalReceiptDate) return "Provisional Fee Receipt Date is required";
        }

        if (form.odFeePaid) {
            if (!form.odFee) return "OD Fee is required";
            if (!form.odReceipt) return "OD Fee Receipt Number is required";
            if (!form.odReceiptDate) return "OD Fee Receipt Date is required";
        }

        return null; // all valid
    };

    const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault();
            if(form.certificateIssueStatus !== "success") {
                form.odFinalDate = '';
                form.provisionalFinalDate = '';
                form.draftDate = form.draftDate || new Date().toISOString().split('T')[0];
            }
            else{
                form.draftDate = '';
                form.odFinalDate = form.typeIssued?.includes("Degree") ? (form.odFinalDate || new Date().toISOString().split('T')[0]) : '';
                form.provisionalFinalDate = form.typeIssued?.includes("Provisional Certificate") ? (form.provisionalFinalDate || new Date().toISOString().split('T')[0]) : '';
            }
            // Validate form
            const error = validateForm(form);
            if (error) {
                alert(error);
                return;
            }

            // Build FormData
            const fd = new FormData();
            Object.entries(form).forEach(([key, value]) => {
                if (Array.isArray(value)) {
                    value.forEach((item) => fd.append(`${key}[]`, item));
                } else if (value instanceof File) {
                    fd.append(key, value); // handle file separately
                } else {
                    fd.append(key, value);
                }
            });

            try {
                setDisableButton(true); // disable button to prevent multiple submissions
                const res = await axiosInstance.post("/api/certificates/provisional", fd, {
                    headers: { "Content-Type": "multipart/form-data" },
                    responseType: "blob",
                });

                const blob = new Blob([res.data], { type: "application/pdf" });
                const url = window.URL.createObjectURL(blob);

                const a = document.createElement("a");
                a.href = url;
                a.download = `certificate_${Date.now()}.pdf`;
                a.click();

                window.URL.revokeObjectURL(url);

                alert("Certificate data submitted & PDF downloaded");
                // Reset form including checkboxes and image
                // setForm({
                //     rollNo: '', icrNumber: '', certificateName: '', fatherName: '',
                //     courseBatch: '', ddsCode: '', degreeName: '', passDate: '',
                //     typeIssued: [], regularSupply: '', totalMarks: '', obtainedMarks: '',
                //     percentage: '', division: '', staff1: '', staff2: '', staff3: '',
                //     staff4: '', provisionalFeePaid: false, provisionalFee: '', provisionalReceipt: '',
                //     provisionalReceiptDate: '', odFeePaid: false, odFee: '', odReceipt: '',
                //     odReceiptDate: '', certificateIssueStatus: '', draftDate: '',
                //     odFinalDate: '', provisionalFinalDate: '', studentImage: null
                // });
                // setShowIssuedCertificates([]);
                // setShowNotIssuedCertificates([]);
                // setImagePreview(null);
            } catch (err) {
                console.error("Upload failed:", err);
                alert("Something went wrong while uploading");
            } finally {
                setDisableButton(false); // re-enable button
            }
        },
    [form]
);


    // Fetch student data on Enter key
    const handleRollNoEnter = useCallback(async (e) => {
        if (e.key !== 'Enter') return;
        e.preventDefault();
        try {
            let res;
            let data;
            if(e.target.name === 'rollNo') {
                res = await axiosInstance.get("/api/certificates/student_info", {
                    params: { roll_no: form.rollNo },
                });
                data = res.data[0];
                if (data) {
                    setForm((prev) => ({
                        ...prev,
                        certificateName: data.name,
                        fatherName: data.father_name,
                        courseBatch: data.batch_year,
                        icrNumber : data.icr_no,
                        gender : data.gender
                    }));
                } 
            }
            else if(e.target.name === 'ddsCode') {
                res = await axiosInstance.get("/api/certificates/dds_code", {
                    params: { dds_code: form.ddsCode },
                });
                data = res.data;
                if (data) {
                    setForm((prev) => ({
                        ...prev,
                        degreeName: data.degree_name,
                        staff1: data.emp_code1,
                        staff2: data.emp_code2,
                        staff3: data.emp_code3,
                        staff4: data.emp_code4
                    }));
                }
            }
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Error fetching student data");
        }
    }, [form.rollNo, form.ddsCode]);

    const checkCertificateIsued = async () => {
        try {
            if (form.rollNo === '') {
                alert("Please enter Roll Number");
                return;
            }

            const res = await axiosInstance.get("/api/certificates/check_issued", {
                params: { roll_no: form.rollNo },
            });

            setShowIssuedCertificates(res.data.issuedCertificates);
            setShowNotIssuedCertificates(res.data.notIssuedCertificates);

            console.log("Certificate Issued Data:", res.data);

        } catch (err) {
            console.error("Error checking issued certificates:", err);
        }
    };

    // Handle Yes/No checkbox toggles for Provisional and OD Fee Paid
    const handleCheckboxToggle = (field) => {
        setForm((prev) => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    return (
        <form className="certificate-paper" elevation={2} onSubmit={handleSubmit}>
            <Box className="certificate-wrapper">
                <Typography className="page_header">Certificate Form</Typography>

                <Grid container spacing={3} className="form-grid">
                    {[
                        { label: "Roll Number", name: "rollNo", onKeyDown: handleRollNoEnter , required: true },
                        { label: "ICR Number", name: "icrNumber"  , required: true},
                        { label: "Certificate Name", name: "certificateName" , required: true },
                        { label: "Father's Name", name: "fatherName" , required: true },
                        { label: "Course Batch", name: "courseBatch" , required: true },
                        { label: "DDS Code", name: "ddsCode", onKeyDown: handleRollNoEnter , required: true },
                        { label: "Degree Name", name: "degreeName", disabled : true , required: true },
                        { label: "Degree Pass Date", name: "passDate", type: "date", InputLabelProps: { shrink: true } , required: true },
                        // Type of Certificate Issued handled separately below
                    ].map(({ label, name, type = "text", options, disabled, onKeyDown }) => (
                        <Grid item size={6} key={name}>
                            {type === "select" ? (
                                <TextField select label={label} name={name} value={form[name]}  required = {true}
                                    onChange={handleChange} fullWidth>
                                    {options.map((opt) => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
                                </TextField>

                            ) : (
                                <TextField type={type} label={label} name={name} value={form[name]}  required = {true}
                                    onChange={handleChange} fullWidth disabled={disabled} 
                                        InputLabelProps={type === "date" ? { shrink: true } : undefined} 
                                            onKeyDown={onKeyDown} />

                            )}
                        </Grid>
                    ))}

                    {/* 9 Type of Certificate Issued (checkbox group) */}
                    <Grid item size={12}>
                        <div className="checkbox-group">
                            <div style = {{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px'}}>
                                <label className="checkbox-title">Type of Certificate Issued</label>
                                <Button size ="small" onClick = {checkCertificateIsued} className = "check_button">Check</Button>
                            </div>
                            <div className="checkbox-row">
                                {certificateOptions.map((option) => (
                                <label key={option} className="checkbox-item">
                                    <input type="checkbox" checked={form.typeIssued.includes(option)}
                                        onChange={() => handleCheckbox(option)}
                                    />
                                    {option}
                                </label>
                                ))}
                            </div>
                        </div>
                    </Grid>
                    {(showIssuedCertificates?.length > 0 || showNotIssuedCertificates?.length > 0) && (
                        <Grid item size={12}>
                            <div style={{ display: "flex", justifyContent: "space-between",
                                    gap: "20px", marginTop: "10px" }}>
                                {/* Issued Certificates */}
                                {showIssuedCertificates?.length > 0 && (
                                    <div className="issued-certificates" style={{ flex: 1 }}>
                                        <Typography variant="subtitle1">Already Issued:</Typography>
                                        <ul>
                                            {showIssuedCertificates.map((cert, index) => (
                                                <li key={index}>{cert}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Not Issued Certificates */}
                                {showNotIssuedCertificates?.length > 0 && (
                                    <div className="issued-certificates not-issued" style={{ flex: 1 }}>
                                        <Typography variant="subtitle1">Not Yet Issued:</Typography>
                                        <ul>
                                            {showNotIssuedCertificates.map((cert, index) => (
                                                <li key={index}>{cert}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </Grid>
                    )}

                    {[
                        { label: "Regular / Supply", name: "regularSupply", type: "select", options: ["Regular", "Supply", "N/A"], required: true },
                        { label: "Total Marks", name: "totalMarks", required: true },
                        { label: "Marks Obtained", name: "obtainedMarks", required: true },
                        { label: "Percentage", name: "percentage", disabled: true, required: true },
                        { label: "Division", name: "division", disabled: true, required: true },
                        { label: "Staff 1", name: "staff1", required: true },
                        { label: "Staff 2", name: "staff2", required: true },
                        { label: "Staff 3", name: "staff3", required: true },
                        { label: "Staff 4", name: "staff4", required: true },
                    ].map(({ label, name, type = "text", options = [], disabled, onKeyDown }) => {

                    const hideField =
                        (form.regularSupply === "Supply" &&
                            ["totalMarks", "obtainedMarks", "percentage"].includes(name)) ||
                        (form.regularSupply === "N/A" &&
                            ["totalMarks", "obtainedMarks", "percentage", "division"].includes(name));

                    if (hideField) return null;

                    return (
                        <Grid item size={6} key={name}>
                        {type === "select" ? (
                            <TextField select label={label} name={name} value={form[name]} required onChange={handleChange} fullWidth>
                            {options.map(opt => (
                                <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                            ))}
                            </TextField>
                        ) : (
                            <TextField type={type} label={label} name={name} value={form[name]} required
                                onChange={handleChange} fullWidth disabled={disabled}
                                InputLabelProps={type === "date" ? { shrink: true } : undefined} onKeyDown={onKeyDown} />
                            )}
                        </Grid>
                    );
                    })}

                    {form.typeIssued?.includes("Provisional Certificate") && (
                        <Grid item size={12}>
                            {/* 1. Provisional Fee Paid Checkbox */}
                            <div className="checkbox-row">
                                <label className="checkbox-item">
                                    <input type="checkbox"
                                        checked={form.provisionalFeePaid}
                                        onChange={() => handleCheckboxToggle("provisionalFeePaid")} />
                                    Provisional Fee Paid (Yes/No)
                                </label>
                            </div>
                        </Grid>
                    )}
                    {/* Show Provisional fields only when Yes */}
                    {form.provisionalFeePaid && (
                        <Grid item size={12}>
                            <Grid container spacing={2}>
                                <Grid item size={6}>
                                    <TextField label="Provisional Fee Paid" name="provisionalFee"
                                        value={form.provisionalFee} onChange={handleChange} fullWidth required />
                                </Grid>
                                <Grid item size={6}>
                                    <TextField label="Provisional Fee Receipt Number" name="provisionalReceipt"
                                        value={form.provisionalReceipt} onChange={handleChange} fullWidth required />
                                </Grid>
                                <Grid item size={6}>
                                    <TextField type="date" label="Provisional Fee Receipt Date" name="provisionalReceiptDate"
                                        value={form.provisionalReceiptDate} onChange={handleChange}
                                        InputLabelProps={{ shrink: true }} fullWidth required />
                                </Grid>
                            </Grid>
                        </Grid>
                    )}
                    {/* 4. OD Fee Paid Checkbox */}
                    {form.typeIssued?.includes("Degree") && (
                        <Grid item size={12}>
                            <div className="checkbox-row" style={{ marginTop: "14px" }}>
                                <label className="checkbox-item">
                                    <input type="checkbox" checked={form.odFeePaid}
                                        onChange={() => handleCheckboxToggle("odFeePaid")} />
                                    Original Degree Fee Paid (Yes/No)
                                </label>
                            </div>
                        </Grid>
                    )}
                    {/* Show OD fields only if Yes */}
                    {form.odFeePaid && (
                        <Grid item size={12}>
                            <Grid container spacing={2}>
                                <Grid item size={6}>
                                    <TextField label="OD Fee Paid" name="odFee" value={form.odFee}
                                        onChange={handleChange} fullWidth required />
                                </Grid>
                                <Grid item size={6}>
                                    <TextField label="OD Fee Receipt Number" name="odReceipt" value={form.odReceipt}
                                        onChange={handleChange} fullWidth required />
                                </Grid>
                                <Grid item size={6}>
                                    <TextField type="date" label="OD Fee Receipt Date" name="odReceiptDate"
                                        value={form.odReceiptDate} onChange={handleChange}
                                        InputLabelProps={{ shrink: true }} fullWidth required />
                                </Grid>
                            </Grid>
                        </Grid>
                    )}
                    <Grid item size={6}>
                        {/* Certificate Issue Status - select dropdown */}
                        <TextField select label="Certificate Issue Status" name="certificateIssueStatus"
                            value={form.certificateIssueStatus} onChange={handleChange}
                            fullWidth required >
                                <MenuItem value="success">Success</MenuItem>
                                <MenuItem value="under_scrutiny">Under Scrutiny</MenuItem>
                                <MenuItem value="pending">Pending</MenuItem>
                        </TextField>
                    </Grid>
                    {form.certificateIssueStatus !== "success" ? (
                        <Grid item size={6}>

                            {/* Draft Date */}
                            <TextField type="date" label="Draft Date" name="draftDate"
                                value={form.draftDate || new Date().toISOString().split('T')[0]} onChange={handleChange}
                                InputLabelProps={{ shrink: true }} fullWidth required />
                        </Grid> ) : (<>
                        {form.typeIssued?.includes("Degree") && (
                            <Grid item size={6}>
                                {/* OD Final Date */}
                                <TextField type="date" label="OD Final Date" name="odFinalDate"
                                    value={form.odFinalDate || new Date().toISOString().split('T')[0]} onChange={handleChange}
                                    InputLabelProps={{ shrink: true }} fullWidth required />
                            </Grid>
                        )}
                        {form.typeIssued?.includes("Provisional Certificate") && (
                            <Grid item size={6}>
                                <TextField type="date" label="Provisional Final Date" name="provisionalFinalDate"
                                    value={form.provisionalFinalDate || new Date().toISOString().split('T')[0]} onChange={handleChange}
                                    InputLabelProps={{ shrink: true }} fullWidth required />
                            </Grid>
                        )}
                    </>)}
                    {form.typeIssued?.includes("Degree") && (
                        <>
                            {/* 27 Upload Image */}
                            <Grid item size={12}>
                                <input accept="image/*" style={{ display: 'none' }} id="student-image-upload"
                                    type="file" name="studentImage" onChange={handleChange} loading="lazy"/>
                                <label htmlFor="student-image-upload">
                                    <Button variant="contained" component="span" startIcon={<PhotoCamera />} >
                                        Upload Student Image
                                    </Button>
                                </label>

                                {/* Error Text */}
                                {imageError && (
                                    <Typography sx={{ color: "red", mt: 1, fontSize: "14px" }}>
                                        {imageError}
                                    </Typography>
                                )}
                            </Grid>

                            {/* Image Preview */}
                            {imagePreview && (
                                <Grid item size={12} sx={{ mt: 1 }}>
                                    <Avatar alt="Student Image" src={imagePreview} sx={{ width: 100, height: 100 }}/>
                                </Grid>
                            )}
                        </>
                    )}
                </Grid>

                <Box className="actions">
                    <Button type="submit" variant="contained" className={`submit-btn ${disableButton ? "disabled-btn" : ""}`}
                        disabled={disableButton}>
                        Submit
                    </Button>
                </Box>
            </Box>
        </form>
    );
}
