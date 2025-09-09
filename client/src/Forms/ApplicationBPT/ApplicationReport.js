import React, { useState } from "react";

const ApplicationReport = () => {
  const [applicationNo, setApplicationNo] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFetch = async () => {
    if (!applicationNo) {
      setError("Please enter an application number.");
      return;
    }

    setLoading(true);
    setError("");
    setData(null);

    try {
      const response = await fetch(
        `http://localhost:4000/api/bpt/application/${applicationNo}`
      );

      if (!response.ok) {
        throw new Error("Application No not found");
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-20 bg-white shadow-lg rounded-md">
      <h1 className="text-2xl font-bold text-blue-600 text-center mb-6">
        Application Report
      </h1>

      <div className="flex items-center gap-3 mb-6">
        <input
          type="text"
          placeholder="Enter Application No"
          value={applicationNo}
          onChange={(e) => setApplicationNo(e.target.value)}
          className="flex-1 p-2 border rounded-md"
        />
        <button
          onClick={handleFetch}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Fetch
        </button>
      </div>

      {/* Status messages */}
      {loading && <p className="text-gray-500">Fetching data...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {/* Report Display */}
      {data && (
        <div className="space-y-6 text-left">
       
<section>
  <h2 className="text-lg font-semibold text-gray-700 border-b pb-1">
    Administration
  </h2>
  <p><strong>Application No:</strong> {data.administration?.application_no}</p>
  <p><strong>Course Code:</strong> {data.administration?.course_code}</p>
  <p><strong>Course Name:</strong> {data.administration?.course_name}</p>
  <p><strong>Ad No:</strong> {data.administration?.ad_no}</p>
  <p><strong>Ad Date:</strong> {data.administration?.ad_date}</p>
  <p><strong>Date of Entry:</strong> {data.administration?.date_of_entry}</p>
  <p><strong>Last Date of Receiving Application:</strong> {data.administration?.last_date}</p>
</section>
  
          <section>
            <h2 className="text-lg font-semibold text-gray-700 border-b pb-1">
              Personal Details
            </h2>
            <p><strong>Name:</strong> {data.personal?.name}</p>
            <p><strong>Father Name:</strong> {data.personal?.father_name}</p>
            <p><strong>Date of Birth:</strong> {data.personal?.dob}</p>
            <p><strong>Gender:</strong> {data.personal?.gender}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-700 border-b pb-1">
              Identity
            </h2>
            <p><strong>Aadhar:</strong> {data.identity?.aadhar}</p>
            <p><strong>Passport:</strong> {data.identity?.passport_number}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-700 border-b pb-1">
              Contact Details
            </h2>
            <p><strong>Father Email:</strong> {data.contact?.father_email}</p>
            <p><strong>Corr Address:</strong> {data.contact?.corr_address}</p>
            <p><strong>Corr Mobile:</strong> {data.contact?.corr_mobile}</p>
            <p><strong>Corr Email:</strong> {data.contact?.corr_email}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-700 border-b pb-1">
              Course Selection
            </h2>
            <p><strong>Hall Ticket:</strong> {data.courseSelection?.hall_ticket}</p>
            <p><strong>Rank:</strong> {data.courseSelection?.rank}</p>
          </section>
        </div>
      )}
    </div>
  );
};

export default ApplicationReport;
