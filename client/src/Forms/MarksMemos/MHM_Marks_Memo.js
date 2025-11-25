import React, { useState } from "react";
import MarksPreview from "./MHM_Marks_Preview";
import "../../styles/MarksMemo/MHM_memo.css";

const semesterConfig = {
  I: {
    title: "Master in Hospital Management Course - 1st Year, I Semester",
    subjects: [
      "Health Systems & Services",
      "Accounting in Hospital Management",
      "Principles of Management",
      "Hospital Operations Management",
      "Statistics for Hospital Management",
    ],
  },
  II: {
    title: "Master in Hospital Management Course - 1st Year, II Semester",
    subjects: [
      "Operation Research",
      "Organization Behavior",
      "Cost Accounting in Hospital",
      "Marketing of Health Care Services",
      "Hospital Information System",
    ],
  },
  III: {
    title: "Master in Hospital Management Course - 2nd Year, III Semester",
    subjects: [
      "Hospital Human Resources Management",
      "Total Quality Management",
      "Hospital Planning",
      "Hospital Financial Management",
      "Health Economics",
    ],
  },
  IV: {
    title: "Master in Hospital Management Course - 2nd Year, IV Semester",
    subjects: [
      "Research Methods in Hospital Management",
      "Hospital Administration Law",
    ],
  }
};

export default function MarksForm() {
  const [semester, setSemester] = useState("I");
  const [student, setStudent] = useState({
    rollNo: "",
    name: "",
    parentName: "",
    examMonth: "",
    examYear: "",
  });

  const [marks, setMarks] = useState({});
  const [showPreview, setShowPreview] = useState(false);

  const handleMarksChange = (subject, field, value) => {
    const sanitized = value.replace(/[^0-9]/g, "");
    setMarks(prev => ({
      ...prev,
      [subject]: {
        ...prev[subject],
        [field]: sanitized
      }
    }));
  };

  const handleSubmit = () => {
    const payload = { semester, student, marks };
    console.log("SUBMITTED DATA:", payload);
    alert("Submitted (Check Console)");
  };

  const config = semesterConfig[semester];

  return (
    <div className="container">
      
      {/* FORM */}
      <div className="form-box">
        <h2>Marks Entry Form</h2>

        <label>Semester</label>
        <select
          className="input"
          value={semester}
          onChange={(e) => {
            setSemester(e.target.value);
            setMarks({});
          }}
        >
          <option value="I">I Semester</option>
          <option value="II">II Semester</option>
          <option value="III">III Semester</option>
          <option value="IV">IV Semester</option>
        </select>

        <label>Roll Number</label>
        <input
          className="input"
          value={student.rollNo}
          onChange={(e) =>
            setStudent({ ...student, rollNo: e.target.value })
          }
        />

        <label>Student Name</label>
        <input
          className="input"
          value={student.name}
          onChange={(e) =>
            setStudent({ ...student, name: e.target.value })
          }
        />

        <label>S/O or D/O</label>
        <input
          className="input"
          value={student.parentName}
          onChange={(e) =>
            setStudent({ ...student, parentName: e.target.value })
          }
        />

        <div className="row">
          <div className="col">
            <label>Exam Month</label>
            <input
              className="input"
              value={student.examMonth}
              onChange={(e) =>
                setStudent({ ...student, examMonth: e.target.value })
              }
            />
          </div>
          <div className="col">
            <label>Exam Year</label>
            <input
              className="input"
              value={student.examYear}
              onChange={(e) =>
                setStudent({ ...student, examYear: e.target.value })
              }
            />
          </div>
        </div>

        <h3>Subject Marks</h3>

        {config.subjects.map((sub, i) => (
          <div key={i} className="subject-block">
            <strong>{sub}</strong>
            <div className="row">
              <input
                className="input"
                placeholder="Theory Marks"
                value={marks[sub]?.theory || ""}
                onChange={(e) => handleMarksChange(sub, "theory", e.target.value)}
              />
              <input
                className="input"
                placeholder="Internal Marks"
                value={marks[sub]?.internal || ""}
                onChange={(e) => handleMarksChange(sub, "internal", e.target.value)}
              />
            </div>
          </div>
        ))}

        {/* Buttons */}
        <button className="btn preview-btn" onClick={() => setShowPreview(true)}>
          Preview
        </button>

        <button className="btn submit-btn" onClick={handleSubmit}>
          Submit
        </button>
      </div>

      {/* PREVIEW */}
      {showPreview && (
        <MarksPreview
          semester={semester}
          student={student}
          marks={marks}
          config={config}
        />
      )}
    </div>
  );
}
