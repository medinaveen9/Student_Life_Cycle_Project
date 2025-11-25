import React, { useEffect, useMemo, useState } from "react";
import "../../styles/MarksMemo/PGD_NMT_memo.css";

// Reusable MarksEntry component
// Props:
// - initialData: { semester, rollNo, name, parentName, examMonthYear, dateOfIssue, subjects: [{paper,name,max,secured}], image }
// - onSubmit: function called with final form data
// - subjectCount: default number of paper rows (default 4)
const defaultPapers = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

const MarksEntry = ({ initialData = {}, onSubmit = (d) => console.log(d), subjectCount = 4 }) => {
  const [showPreview, setShowPreview] = useState(false);

  const defaultSubjects = useMemo(() => {
    if (Array.isArray(initialData.subjects) && initialData.subjects.length) return initialData.subjects;
    return Array.from({ length: subjectCount }).map((_, i) => ({ paper: defaultPapers[i] || String(i + 1), name: "", max: "", secured: "" }));
  }, [initialData.subjects, subjectCount]);

  const [form, setForm] = useState({
    semester: initialData.semester || "",
    rollNo: initialData.rollNo || "",
    name: initialData.name || "",
    parentName: initialData.parentName || "",
    examMonthYear: initialData.examMonthYear || "",
    dateOfIssue: initialData.dateOfIssue || "",
    subjects: defaultSubjects
  });

  const [imageFile, setImageFile] = useState(initialData.imageFile || null);
  const [imagePreview, setImagePreview] = useState(initialData.imagePreview || null);

  useEffect(() => {
    if (imageFile && typeof imageFile !== "string") {
      const url = URL.createObjectURL(imageFile);
      setImagePreview(url);
      return () => URL.revokeObjectURL(url);
    }
    // if imageFile is a string (existing url/base64) keep it
    if (typeof imageFile === "string") setImagePreview(imageFile);
  }, [imageFile]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubjectChange(index, field, value) {
    setForm((prev) => ({
      ...prev,
      subjects: prev.subjects.map((s, i) => (i === index ? { ...s, [field]: value } : s))
    }));
  }

  function addSubject() {
    setForm((prev) => ({
      ...prev,
      subjects: [...prev.subjects, { paper: String(prev.subjects.length + 1), name: "", max: "", secured: "" }]
    }));
  }

  function removeSubject(index) {
    setForm((prev) => ({ ...prev, subjects: prev.subjects.filter((_, i) => i !== index) }));
  }

  function handleImageChange(e) {
    const file = e.target.files && e.target.files[0];
    if (file) setImageFile(file);
  }

  function openPreview() {
    // Basic validation: require rollNo and name
    if (!form.rollNo || !form.name) {
      alert("Please fill at least Roll No. and Student Name before preview.");
      return;
    }
    setShowPreview(true);
  }

  function handleSubmit() {
    // Prepare payload
    const payload = { ...form, image: imagePreview, imageFile };
    onSubmit(payload);
    alert("Submitted. See console or onSubmit callback.");
  }

  return (
    <div className="marks-container">
      {!showPreview ? (
        <>
          <h2 className="title">Marks Entry Form</h2>

          <div className="form-group">
            <label>Semester</label>
            <select name="semester" value={form.semester} onChange={handleChange}>
              <option value="">Select</option>
              <option value="I Semester">I Semester</option>
              <option value="II Semester">II Semester</option>
              <option value="III Semester">III Semester</option>
              <option value="IV Semester">IV Semester</option>
            </select>
          </div>

          <div className="form-grid">
            <label>
              Roll No.
              <input name="rollNo" value={form.rollNo} onChange={handleChange} />
            </label>

            <label>
              Student Name
              <input name="name" value={form.name} onChange={handleChange} />
            </label>

            <label>
              S/O or D/O
              <input name="parentName" value={form.parentName} onChange={handleChange} />
            </label>

            <label>
              Exam Month / Year
              <input name="examMonthYear" value={form.examMonthYear} onChange={handleChange} />
            </label>

            <label>
              Date of Issue
              <input type="date" name="dateOfIssue" value={form.dateOfIssue} onChange={handleChange} />
            </label>
          </div>

          <table className="marks-table">
            <thead>
              <tr>
                <th>Paper</th>
                <th>Subject</th>
                <th>Max Marks</th>
                <th>Marks Secured</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {form.subjects.map((sub, i) => (
                <tr key={i}>
                  <td>{sub.paper}</td>
                  <td>
                    <input value={sub.name} onChange={(e) => handleSubjectChange(i, "name", e.target.value)} />
                  </td>
                  <td>
                    <input value={sub.max} onChange={(e) => handleSubjectChange(i, "max", e.target.value)} />
                  </td>
                  <td>
                    <input value={sub.secured} onChange={(e) => handleSubjectChange(i, "secured", e.target.value)} />
                  </td>
                  <td>
                    <button type="button" className="remove-sub" onClick={() => removeSubject(i)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ marginTop: 8 }}>
            <button type="button" onClick={addSubject} className="add-sub">
              Add Subject
            </button>
          </div>

          <div style={{ marginTop: 12 }}>
            <label>
              Upload Image (optional)
              <input type="file" accept="image/*" onChange={handleImageChange} />
            </label>
            {imagePreview && (
              <div style={{ marginTop: 8 }}>
                <img src={imagePreview} alt="preview" style={{ maxWidth: 160, border: "1px solid #ccc" }} />
              </div>
            )}
          </div>

          <div className="btn-group">
            <button onClick={openPreview} className="preview-btn">
              Preview
            </button>
            <button onClick={handleSubmit} className="submit-btn">
              Submit
            </button>
          </div>
        </>
      ) : (
        <div className="preview">
          <h2 className="memo-header">NIZAM’S INSTITUTE OF MEDICAL SCIENCES</h2>
          <h3 className="memo-title">MEMORANDUM OF MARKS</h3>

          <div className="preview-meta">
            <p>
              <strong>Semester:</strong> {form.semester}
            </p>
            <p>
              <strong>Roll No:</strong> {form.rollNo}
            </p>
            <p>
              <strong>Name:</strong> {form.name}
            </p>
            <p>
              <strong>S/o / D/o:</strong> {form.parentName}
            </p>
            <p>
              <strong>Exam Month/Year:</strong> {form.examMonthYear}
            </p>
            <p>
              <strong>Date of Issue:</strong> {form.dateOfIssue}
            </p>
          </div>

          {imagePreview && (
            <div className="preview-image">
              <img src={imagePreview} alt="student" style={{ maxWidth: 220 }} />
            </div>
          )}

          <table className="preview-table">
            <thead>
              <tr>
                <th>Paper</th>
                <th>Subject</th>
                <th>Max Marks</th>
                <th>Marks Secured</th>
              </tr>
            </thead>
            <tbody>
              {form.subjects.map((s, i) => (
                <tr key={i}>
                  <td>{s.paper}</td>
                  <td>{s.name}</td>
                  <td>{s.max}</td>
                  <td>{s.secured}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="btn-group">
            <button onClick={() => setShowPreview(false)} className="back-btn">
              Back to Edit
            </button>
            <button onClick={handleSubmit} className="submit-btn">
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarksEntry;
