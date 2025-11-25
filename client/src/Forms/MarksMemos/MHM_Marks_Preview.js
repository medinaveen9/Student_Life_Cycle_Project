import "../../styles/MarksMemo/MHM_memo.css";

export default function MarksPreview({ semester, student, marks, config }) {

    const getTotal = (s) => {
        const th = Number(marks[s]?.theory || 0);
        const inter = Number(marks[s]?.internal || 0);
        return th + inter;
    };

  return (
    <div className="preview-box">
      <h1 className="title">MEMORANDUM OF MARKS</h1>

      <div className="top-info">
        <p><strong>Roll No:</strong> {student.rollNo}</p>
        <p><strong>Date:</strong> ___________</p>
      </div>

      <p><strong>Name:</strong> {student.name}</p>
      <p><strong>S/O / D/O:</strong> {student.parentName}</p>

      <h3 className="semester-title">{config.title}</h3>
      <p>
        Final Examination held in the month of {student.examMonth} {student.examYear}
      </p>

      <table className="marks-table">
        <thead>
          <tr>
            <th>PAPER</th>
            <th>SUBJECT</th>
            <th>THEORY<br/>(Max / Sec)</th>
            <th>INTERNAL<br/>(Max / Sec)</th>
            <th>TOTAL<br/>(Max / Sec)</th>
            <th>RESULT</th>
          </tr>
        </thead>

        <tbody>
          {config.subjects.map((sub, i) => {
            const th = Number(marks[sub]?.theory || 0);
            const inter = Number(marks[sub]?.internal || 0);
            const total = th + inter;
            const result = total >= 50 ? "Pass" : "Fail";

            return (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{sub}</td>
                <td>75 / {th}</td>
                <td>25 / {inter}</td>
                <td>100 / {total}</td>
                <td>{result}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="footer-section">
        <p><strong>Aggregate in Words:</strong> _________________________</p>
        <p><strong>Aggregate:</strong> ________</p>
      </div>

      <p className="signature">EXECUTIVE REGISTRAR</p>
    </div>
  );
}
