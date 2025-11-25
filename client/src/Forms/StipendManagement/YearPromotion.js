import React, { useState } from "react";
import "../../styles/StipendManagement/PromotionYear.css";
import axiosInstance from "../../components/AxiosInstance";
import CircularProgress from "@mui/material/CircularProgress";

const PromoteStudents = () => {
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const [selected, setSelected] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const [promoteData, setPromoteData] = useState({
    course: "",
    batchYear: "",
    currentYear: "",
    newDOJ: "",
  });

  // handle change in filter form
  const handlePromoteChange = (e) => {
    const { name, value } = e.target;
    setPromoteData((prev) => ({ ...prev, [name]: value }));
  };

  // fetch students based on filters
  const handleGetStudents = async (e) => {
    e.preventDefault();
    try {
      setDataLoading(true);
      const res = await axiosInstance.get("/api/stipend/filter-students", {
        params: promoteData,
      });
      setStudents(res.data.students || []);
      setSelected([]);
      setSelectAll(false);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to fetch students");
    } finally {
      setDataLoading(false);
    }
  };

    // handle select/deselect all
    const handleSelectAll = (e) => {
        const checked = e.target.checked;
        setSelectAll(checked);
        setSelected(checked ? students.map((s) => s.id) : []);
    };

    // handle row selection
    const handleRowSelect = (id) => {
        setSelected((prev) => {
            let updated;
            if (prev.includes(id)) {
            updated = prev.filter((x) => x !== id);
            } else {
            updated = [...prev, id];
            }

            // if all selected → header checked, else unchecked
            setSelectAll(updated.length === students.length);
            return updated;
        });
    };

  // promote selected students
  const handlePromoteSelected = async () => {
    if (selected.length === 0) {
      alert("No students selected");
      return;
    }
    else if (!promoteData.newDOJ) {
      alert("Please select Date of Joining (DOJ)");
      return;
    }   
    try {
      setLoading(true);
      const res = await axiosInstance.put("/api/stipend/promote-students", {
        ...promoteData,
        selectedStudents: selected,
      });
      alert(res.data.message || "Promotion successful");
      setStudents([]);
      setSelected([]);
      setSelectAll(false);
      setPromoteData({ course: "", batchYear: "", currentYear: "" });
    } catch (err) {
      alert(err.response?.data?.message || "Promotion failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="promotion-main p-4">
      <form className="study-main mb-6" onSubmit={handleGetStudents}>
        <div className="sub-study-main">Promotion</div>

        {/* Course */}
        <div className="form-group">
          <label className="form-label">Course</label>
          <select
            className="form-input"
            name="course"
            required
            value={promoteData.course}
            onChange={handlePromoteChange}
          >
            <option value="">Select</option>
            <option value="A.H.S">A.H.S</option>
            <option value="Bachelor of Science Nursing">Bachelor of Science Nursing</option>
          </select>
        </div>

        {/* Batch Year */}
        <div className="form-group">
          <label className="form-label">Batch Year</label>
          <input
            type="number"
            className="form-input"
            name="batchYear"
            placeholder="Enter batch year (ex: 2023)"
            required
            value={promoteData.batchYear}
            onChange={handlePromoteChange}
          />
        </div>

        {/* Current Year */}
        <div className="form-group">
          <label className="form-label">Current Year</label>
          <select
            className="form-input"
            name="currentYear"
            required
            value={promoteData.currentYear}
            onChange={handlePromoteChange}
          >
            <option value="">Select</option>
            {[1, 2, 3, 4].map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading || dataLoading}
          className="button-style"
          style={{
            cursor: loading ? "not-allowed" : "pointer",
            backgroundColor: loading ? "#ccc" : "",
          }}
        >
          Get Students
        </button>
      </form>

        {/* DOJ input field */}
        

      {/* TABLE SECTION */}
      <div className="mt-4 overflow-x-auto" style = {{display : "flex", flexDirection : "column", gap : "25px"}}>
        {dataLoading ? (
          <div className="text-center p-4">
            <CircularProgress />
          </div>
        ) : students.length > 0 ? (
          <>
            <div className="form-group">
                <label className="form-label">Date of Joining (DOJ)</label>
                <input type="date" className="form-input"
                    name="newDOJ" value={promoteData.newDOJ} onChange={handlePromoteChange}
                    required
                    style={{ padding: "10px", borderRadius: "8px", border: "1px solid #ccc",
                    fontSize: "14px",  outline: "none", width : "30%",    transition: "border-color 0.2s ease",            
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#4b1d77")}
                    onBlur={(e) => (e.target.style.borderColor = "#ccc")}
                />
            </div>
            <div className="mb-3 flex justify-between items-center">
              <h3 className="font-semibold text-lg">
                {students.length} students found
              </h3>
              <button
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:bg-gray-400"
                onClick={handlePromoteSelected}
                disabled={selected.length === 0 || loading}
              >
                Promote Selected ({selected.length})
              </button>
            </div>

            <table className="min-w-full border border-gray-400 text-sm text-center">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-2 py-1">
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th className="border px-2 py-1">Roll No</th>
                  <th className="border px-2 py-1">Name</th>
                  <th className="border px-2 py-1">Course</th>
                  <th className="border px-2 py-1">Year</th>
                  <th className="border px-2 py-1">Batch Year</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s, idx) => (
                  <tr key={idx}>
                    <td className="border px-2 py-1">
                      <input
                        type="checkbox"
                        checked={selected.includes(s.id)}
                        onChange={() => handleRowSelect(s.id)}
                      />
                    </td>
                    <td className="border px-2 py-1">{s.roll_no}</td>
                    <td className="border px-2 py-1">{s.name}</td>
                    <td className="border px-2 py-1">{s.course}</td>
                    <td className="border px-2 py-1">{s.year}</td>
                    <td className="border px-2 py-1">{s.batchYear}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <div className="text-center p-4 text-gray-500">
            No students found. Use the filters above.
          </div>
        )}
      </div>
    </div>
  );
};

export default PromoteStudents;
