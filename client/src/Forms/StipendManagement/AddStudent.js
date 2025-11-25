import { useState } from "react";
import axiosInstance from "../../components/AxiosInstance";
import "../../styles/StipendManagement/PromotionYear.css";

const FIELDS = [
    "reg_no","name","university","course","adhar","roll_no","social_status","dob",
    "father_name","mother_name","address","district","state","country","marks",
    "percentage","emcet","educationtype","gender","phstatus","mobile","email",
    "account_no","ifsc_code","doj","year","leaves","batch_year"
];

const SPECIAL = {
    dob: { type: "date" },
    doj: { type: "date" },
    address: { type: "textarea", placeholder: "Enter address" },
    gender: { type: "select", options: ["", "Male", "Female"] },
    phstatus: { type: "select", options: ["", "Yes", "No"] },
    course: {
        type: "select",
        options: [
            "", "Bachelor of Science Nursing", "B.A", ]
    }
};

const initialData = Object.fromEntries(FIELDS.map((f) => [f, ""]));

const StudentAddStipend = () => {
    const [data, setData] = useState(initialData);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) =>
        setData((d) => ({ ...d, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axiosInstance.post("/api/stipend/add-student", data);
            alert(res.data.message);
            setData(initialData);
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const renderField = (key) => {
        const spec = SPECIAL[key] || { type: "text" };
        const label = key.replace(/_/g, " ").toUpperCase();
        const common = {
            name: key,
            className: "form-input",
            value: data[key],
            onChange: handleChange,
            required: true
        };

        if (spec.type === "date") {
            return (
                <input type="date" {...common} />
            );
        }

        if (spec.type === "textarea") {
            return (
                <textarea {...common} placeholder={spec.placeholder || key} />
            );
        }

        if (spec.type === "select") {
            return (
                <select {...common}>
                    {spec.options.map((opt) => (
                        <option key={opt} value={opt}>
                            {opt === "" ? `Select ${label}` : opt}
                        </option>
                    ))}
                </select>
            );
        }

        return <input type="text" placeholder={key} {...common} />;
    };

    return (
        <form className="study-main" onSubmit={handleSubmit}>
            <div className="sub-study-main">Add Student</div>

            {FIELDS.map((key) => (
                <div className="form-group" key={key}>
                    <label className="form-label">
                        {key.replace(/_/g, " ").toUpperCase()}
                    </label>
                    {renderField(key)}
                </div>
            ))}

            <button
                type="submit"
                className="button-style"
                disabled={loading}
                style={{
                    cursor: loading ? "not-allowed" : "pointer",
                    backgroundColor: loading ? "#ccc" : "#4b1d77"
                }}
            >
                {loading ? "Saving..." : "Add Student"}
            </button>
        </form>
    );
};

export default StudentAddStipend;
