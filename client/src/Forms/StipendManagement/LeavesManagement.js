import React, { useState, useEffect } from "react";
import axiosInstance from "../../components/AxiosInstance";

const StudentLeaveForm = ({ user }) => {
  const [formData, setFormData] = useState({
    roll_no: "",
    name: "",
    course: "",
    total_leaves: 0,
  });
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(false);
  const [rollError, setRollError] = useState("");

  // Inline styles
  const styles = {
    study_main: { display: "flex", flexDirection: "column", gap: "20px", width: "80%", margin: "0 auto" },
    sub_study_main: { fontSize: "25px", fontWeight: 500, marginBottom: "10px" },
    form_group: { display: "flex", flexDirection: "column", gap: "6px" },
    form_label: { fontSize: "16px", fontWeight: 500 },
    form_input: { padding: "8px", fontSize: "15px", border: "1px solid #ccc", borderRadius: "4px" },
    button_style: {
      backgroundColor: "#4b1d77", color: "white", padding: "10px 16px",
      cursor: "pointer", fontSize: "16px", fontWeight: 500,
      width: "auto", alignSelf: "center", border: "none",
      borderRadius: "6px", marginTop: "10px",
    },
    error_text: { color: "red", fontSize: "14px" }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

    // Debounced API check for Roll No
    useEffect(() => {
        if (!formData.roll_no) {
            return;
        }

        const delay = setTimeout(async () => {
            try {
                setChecking(true);
                const res = await axiosInstance.get(`/api/stipend/student`, {
                    params: { application_no: formData.roll_no },
                });
                const data = res.data.data;
                setFormData((prev) => ({...prev, name: data.name || '',
                    course: data.course || '',
                    total_leaves : data.leaves || 0
                }))
            } catch (err) {
                console.error(err);
                alert('Student not found');
                setFormData((prev) => ({...prev, name : "", course : "", total_leaves : 0}))
            } finally {
                setChecking(false);
            }
        }, 1500); // 500ms debounce

        return () => clearTimeout(delay);
    }, [formData.roll_no]);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (rollError) {
            alert("Please fix Roll No before submitting.");
            return;
        }
        try {
            setLoading(true);
            const res = await axiosInstance.post("/api/stipend/add_leave", formData, {
                params: { userId: user.userId, user_name: user.user_name },
            });
            alert(res.data.message);
            setFormData({ name: "", course: "", total_leaves: 0 });
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.error || "Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form style={styles.study_main} onSubmit={handleSubmit}>
        <div style={styles.sub_study_main}>Stipend Leave Management</div>

        <div style={styles.form_group}>
            <label style={styles.form_label}>Roll No</label>
            <input style={styles.form_input} type="text" required name="roll_no" 
                value={formData.roll_no} onChange={handleChange} />

            {checking && <span>Checking...</span>}
            {rollError && <span style={styles.error_text}>{rollError}</span>}
        </div>

        <div style={styles.form_group}>
            <label style={styles.form_label}>Name</label>
            <input style={styles.form_input} type="text" required name="name" value={formData.name} 
                onChange={handleChange} />
        </div>

        <div style={styles.form_group}>
            <label style={styles.form_label}>Course</label>
            <input style={styles.form_input} type="text" placeholder="Enter course"
                name="course" required value={formData.course}
                onChange={handleChange}
            />
        </div>

        <div style={styles.form_group}>
            <label style={styles.form_label}>Total Leaves</label>
            <input style={styles.form_input} type="number" required name="total_leaves" 
                min="0" value={formData.total_leaves} onChange={handleChange} />
        </div>

        <button type="submit" disabled={loading || checking} 
            style={{ ...styles.button_style, cursor: loading || checking ? "not-allowed" : "pointer", 
                backgroundColor: loading || checking ? "#ccc" : styles.button_style.backgroundColor }}>
                    Submit</button>

        </form>
    );
};

export default StudentLeaveForm;
