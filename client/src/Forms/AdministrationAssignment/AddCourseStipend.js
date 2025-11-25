import React, { useState } from "react";
import axiosInstance from "../../components/AxiosInstance";

const CourseStipendForm = ({user}) => {
    const [formData, setFormData] = useState({
        course: "",
        stipend: "",
        year: "",
        semester: "",
        from_date: null,
        to_date: null,
    });
    const [loading, setLoading] = useState(false);

    // Inline styles
    const styles = {
        study_main: {
            display: "flex", flexDirection: "column", gap: "20px", width: "80%", margin: "0 auto",},
        sub_study_main: {
            fontSize: "25px", fontWeight: 500, marginBottom: "10px", },
        form_group: {
            display: "flex", flexDirection: "column", gap: "6px", },
        form_label: { 
            fontSize: "16px", fontWeight: 500, },
        form_input: {
            padding: "8px", fontSize: "15px", border: "1px solid #ccc", borderRadius: "4px", },
        button_style: {
            backgroundColor: "#4b1d77", color: "white", padding: "10px 16px",
            cursor: "pointer", fontSize: "16px", fontWeight: 500,
            width: "auto", alignSelf: "center", border: "none",
            borderRadius: "6px", marginTop: "10px",
        },
    };

    const handleChange = (e) => { // Generic change handler for all form fields
            const { name, value } = e.target;
            setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axiosInstance.post("/api/stipend/add_course_stipend", formData, {
                params: { userId : user.userId, user_name : user.user_name  },
            });
            alert(res.data.message);
            setFormData({
                course: "", stipend: "", year: "", semester: "", from_date: "", to_date: "",
            })
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.error || "Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form style={styles.study_main} onSubmit={handleSubmit}>
            <div style={styles.sub_study_main}>Stipend Master</div>

            <div style={styles.form_group}>
                <label style={styles.form_label}>Course</label>
                <select style={styles.form_input} required={true} name="course" value={formData.course} onChange={handleChange}>
                    <option value="">Select</option>
                    <option value="A.H.S">A.H.S</option>
                    <option value="Bachelor of Science Nursing">Bachelor of Science Nursing</option>
                </select>
            </div>

            <div style={styles.form_group}>
                <label style={styles.form_label}>Year</label>
                <select style={styles.form_input} name="year" required={true} value={formData.year} onChange={handleChange}>
                    <option value="">Select</option>
                    {[1, 2, 3, 4].map((y) => <option key={y} value={y}>{y}</option>)}
                </select>
            </div>

            <div style={styles.form_group}>
                <label style={styles.form_label}>Semester</label>
                <select style={styles.form_input} name="semester" required={true} value={formData.semester} onChange={handleChange}>
                    <option value="">Select</option>
                    {[1, 2].map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
            </div>

            <div style={styles.form_group}>
                <label style={styles.form_label}>Stipend</label>
                <input style={styles.form_input} required={true} type="number" name="stipend" value={formData.stipend} onChange={handleChange} />
            </div>

            <div style={styles.form_group}>
                <label style={styles.form_label}>From Date</label>
                <input style={styles.form_input} type="date" required={true} name="from_date" value={formData.from_date} onChange={handleChange} />
            </div>

            {/* <div style={styles.form_group}>
                <label style={styles.form_label}>To Date</label>
                <input style={styles.form_input} type="date" name="to_date" value={formData.to_date} onChange={handleChange} />
            </div> */}

            <button type="submit" disabled={loading}
                style={{ ...styles.button_style, cursor: loading ? "not-allowed" : "pointer",
                    backgroundColor: loading ? "#ccc" : styles.button_style.backgroundColor,
                }}>Submit
            </button>

        </form>
    );
};

export default CourseStipendForm;
