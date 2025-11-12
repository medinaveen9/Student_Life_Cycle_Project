import React, { useState } from "react";
import "../../styles/StipendManagement/PromotionYear.css";
import axiosInstance from "../../components/AxiosInstance";

const PromoteStudents = () => {
    // State Management
    const [loading, setLoading] = useState(false);
    const [promoteData, setPromoteData] = useState({
        course: "",
        batchYear: "",
        currentYear: ""
    });

    // Change Handler
    const handlePromoteChange = (e) => {
        const { name, value } = e.target;
        setPromoteData(prev => ({ ...prev, [name]: value }));
    };

    // Submit Handler
    const handlePromoteSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            const res = await axiosInstance.put("/api/stipend/promote-students", {
                course: promoteData.course, batchYear: promoteData.batchYear, currentYear: promoteData.currentYear
            });

            alert(res.data.message); // or use toast
            // reset form
            setPromoteData({ course: "", batchYear: "", currentYear: "" });
        } catch (err) {
            if (err.response) {
                // show backend error message
                alert(err.response.data.message);
            } else {
                alert("Something went wrong");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="study-main" onSubmit={handlePromoteSubmit}>
            
            <div className="sub-study-main">Promote Students</div>

            {/* Course */}
            <div className="form-group">
                <label className="form-label">Course</label>
                <select className="form-input" name="course" required value={promoteData.course}
                    onChange={handlePromoteChange} >
                    <option value="">Select</option>
                    <option value="A.H.S">A.H.S</option>
                    <option value="B.Sc Nursing">B.Sc Nursing</option>
                </select>
            </div>

            {/* Batch Year */}
            <div className="form-group">
                <label className="form-label">Batch Year</label>
                <input type="number" className="form-input" name="batchYear"
                    placeholder="Enter batch year (ex: 2023)" required value={promoteData.batchYear}
                    onChange={handlePromoteChange} />
            </div>

            {/* Current Year */}
            <div className="form-group">
                <label className="form-label">Current Year</label>
                <select className="form-input" name="currentYear" required value={promoteData.currentYear}
                    onChange={handlePromoteChange} >
                        <option value="">Select</option>
                        {[1, 2, 3, 4].map((y) => (
                            <option key={y} value={y}>{y}</option>
                        ))}
                </select>
            </div>

            {/* Submit Button */}
            <button type="submit" disabled={loading} className="button-style" style={{
                    cursor: loading ? "not-allowed" : "pointer",
                    backgroundColor: loading ? "#ccc" : "" }}> Promote </button>

        </form>
    );
};

export default PromoteStudents;


