import { useState } from "react";
import axiosInstance from "../../components/AxiosInstance";
import "../../styles/StipendManagement/PromotionYear.css";

const StudentAddStipend = () => {
    const [data, setData] = useState({
        roll_no: "",
        course: "",
        name: "",
        batch_year: "",
        studentYear: "",
        account_no: "",
        doj: "",
        ifsc_code: "",
        leaves: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = e => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            setLoading(true);

            const res = await axiosInstance.post("/api/stipend/add-student", data);

            alert(res.data.message);

            setData({
                roll_no: "",
                course: "",
                name: "",
                batch_year: "",
                studentYear: "",
                account_no: "",
                doj: "",
                ifsc_code: "",
                leaves: ""
            });

        } catch (err) {
            console.error(err);
            if (err.response) {
                alert(err.response.data.message);
            } else {
                alert("Something went wrong");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="study-main" onSubmit={handleSubmit}>
            <div className="sub-study-main">Add Student</div>

            <div className="form-group">
                <label className="form-label">Roll Number</label>
                <input
                    type="text"
                    name="roll_no"
                    className="form-input"
                    placeholder="2111100"
                    value={data.roll_no}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label className="form-label">Course</label>
                <select
                    name="course"
                    className="form-input"
                    value={data.course}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select</option>
                    <option value="A.H.S">A.H.S</option>
                    <option value="B.Sc Nursing">B.Sc Nursing</option>
                </select>
            </div>

            <div className="form-group">
                <label className="form-label">Student Name</label>
                <input
                    type="text"
                    name="name"
                    className="form-input"
                    placeholder="Student Name"
                    value={data.name}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label className="form-label">Batch Year</label>
                <input
                    type="text"
                    name="batch_year"
                    className="form-input"
                    placeholder="2024"
                    value={data.batch_year}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label className="form-label">Current Year</label>
                <select
                    name="studentYear"
                    className="form-input"
                    value={data.studentYear}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
            </div>

            <div className="form-group">
                <label className="form-label">Account Number</label>
                <input
                    type="text"
                    name="account_no"
                    className="form-input"
                    placeholder="UBIN0810797"
                    value={data.account_no}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label className="form-label">IFSC Code</label>
                <input
                    type="text"
                    name="ifsc_code"
                    className="form-input"
                    placeholder="IFSC12345"
                    value={data.ifsc_code}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label className="form-label">Date of Joining</label>
                <input
                    type="date"
                    name="doj"
                    className="form-input"
                    value={data.doj}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label className="form-label">Leaves (per Year)</label>
                <input
                    type="number"
                    name="leaves"
                    className="form-input"
                    placeholder="0"
                    value={data.leaves}
                    onChange={handleChange}
                    required
                />
            </div>

            <button
                type="submit"
                className="button-style"
                disabled={loading}
                style={{ cursor: loading ? "not-allowed" : "pointer", backgroundColor: loading ? "#ccc" : "#4b1d77" }}
            >
                {loading ? "Saving..." : "Add Student"}
            </button>
        </form>
    );
};

export default StudentAddStipend;
