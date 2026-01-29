import React from 'react';


const StipendActions = (
    { selected, handleBulkApproval, downloadReport, downloadExcelReport, data, user, loading }
) => {
    return (
        <div className="mb-4 flex justify-end gap-4">
            <button
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
                onClick={handleBulkApproval}
                disabled={selected.length === 0 || loading}
            >
                Approve
            </button>
            <button onClick={() => downloadReport(data)} disabled={loading}
                className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
            >
                Download PDF Report
            </button>
            {(user.role === "FA" || user.role === "FC") && (
                <button onClick={() => downloadExcelReport(data)} disabled={loading}
                className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
                > Download Excel Report </button>
            )}
        </div>
    )
}

export default StipendActions
