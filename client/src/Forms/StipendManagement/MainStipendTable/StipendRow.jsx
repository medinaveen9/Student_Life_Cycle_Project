import React from 'react';
import { CircularProgress } from '@mui/material';
import { FaEdit, FaTrash } from "react-icons/fa";
import VisibilityIcon from "@mui/icons-material/Visibility";
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import "../../../styles/StipendManagement/StipendTable.css";

const roleStatusMap = {
    Verifier: "verifier_status",
    Approver: "approver_status",
    Checker: "checker_status",
    FA: "fa_status",
    FC: "fc_status",
};

const StipendRow = (
    { data, dataLoaded, selected, selectAll, handleRowSelect, handleSelectAll,
      handleView, handleRowEdit, editRowId, leaves, handleChangeLeaves,
      handleLeavesUpdate, handleDelete, handleApproval, user, handleSelectedRowEdit }
    ) => {


    const renderStatusIcon = (status, row) => {
        if (!status) return null;

        switch (status.toLowerCase()) {
            case "pending":
                return (
                    <HourglassEmptyIcon style={{ color: "orange", fontSize: "20px" }}
                        titleAccess="Pending" onClick={() => handleApproval(row)} />
                );

            case "approved":
                return (
                    <CheckCircleIcon
                    style={{ color: "green", fontSize: "20px" }}
                    titleAccess="Approved"
                    />
                );

            case "rejected":
                return (
                    <CancelIcon
                    style={{ color: "red", fontSize: "20px" }}
                    titleAccess="Rejected"
                    />
                );
            default:
                return null;
        }
    };

    return (
        <table className="min-w-full border border-gray-400 text-sm text-center">
            <thead>
            <tr>
                <th className="border px-2 py-2 font-bold text-lg bg-gray-100" colSpan="15">ANNEXURE</th>
            </tr>
            <tr className="bg-gray-200">
                <th className="border px-2 py-1">
                <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
                </th>
                <th className="border px-2 py-1">Roll No.</th>
                <th className="border px-2 py-1">Name</th>
                <th className="border px-2 py-1">Course</th>
                <th className="border px-2 py-1">A/C Number</th>
                <th className="border px-2 py-1">IFSC</th>
                <th className="border px-2 py-1">view</th>
                <th className="border px-2 py-1">Leaves Availed</th>
                <th className="border px-2 py-1">Days Present</th>
                <th className="border px-2 py-1">Stipend</th>
                <th className="border px-2 py-1">Edit</th>
                <th className="border px-2 py-1">Delete</th>
                <th className="border px-2 py-1">Approval</th>
            </tr>
            </thead>

            <tbody>
                {dataLoaded ? (
                    <tr>
                    <td colSpan="15" className="p-4 text-center">
                        <CircularProgress />
                    </td>
                    </tr>
                ) : (
                    <React.Fragment>
                    {data.length > 0 ? data.map((row, idx) => (
                        <tr key={idx}>
                        <td className="border px-2 py-1">
                            <input
                            type="checkbox"
                            checked={selected.includes(row.id)}
                            onChange={() => handleRowSelect(row.id)}
                            />
                        </td>
                        <td className="border px-2 py-1">{row.roll_no}</td>
                        <td className="border px-2 py-1">{row.name}</td>
                        <td className="border px-2 py-1">{row.course}</td>
                        <td className="border px-2 py-1">{row.account_no}</td>
                        <td className="border px-2 py-1">{row.ifsc_code || "IFSC"}</td>
                        <td>
                            <button className="text-blue-600 hover:text-blue-800" onClick={() => handleView(row)}>
                            <VisibilityIcon style={{ color: "#4b1d77" }}/>
                            </button>
                        </td>
                        {(row.student_status === "Regular" || row.student_status === "Re-admission")  ? (
                            <>
                                <td className="border px-2 py-1">
                                    {editRowId === row.id 
                                    ? <input min="0" value={leaves ?? row.leaves} 
                                        onChange={handleChangeLeaves} className="w-16 border px-1.5 py-1.5" /> 
                                    : row.leaves}
                                </td>
                                <td className="border px-2 py-1">{row.present}</td>
                            </> 
                        ) : (
                            <td className="border px-2 py-1 text-center" colSpan={2}>
                                {row.student_status}
                            </td>
                            )
                        }
                        <td className="border px-2 py-1">{row.actual_stipend}</td>
                        <td className="border px-2 py-1">
                            <button
                                disabled={row.payment_status === "approved"}
                                onClick={() => handleSelectedRowEdit(row)}
                                className={`
                                    px-2
                                    ${ row.payment_status === "approved"
                                        ? "text-gray-400 cursor-not-allowed"
                                        : "text-blue-600 hover:text-blue-800 cursor-pointer"
                                    }
                                `}
                            >
                            <FaEdit />
                            </button>
                        </td>
                        <td className="border px-2 py-1">
                            <button
                                disabled={row.payment_status === "approved"}
                                onClick={() => row.payment_status !== "approved" && handleDelete(row)}
                                className={row.payment_status === "approved"
                                    ? "text-gray-400 cursor-not-allowed"
                                    : "text-red-600 hover:text-red-800"}
                            >
                                <FaTrash />
                            </button>
                        </td>
                        {roleStatusMap[user.role] && (
                            <td className="border px-2 py-1">
                                {renderStatusIcon(row[roleStatusMap[user.role]], row)}
                            </td>
                        )}
                        </tr>
                    )) : (
                        <tr>
                        <td className="border px-2 py-4 text-center" colSpan="15">No records found</td>
                        </tr>
                    )}
                    </React.Fragment>
                )}
            </tbody>
        </table>
    )
}

export default StipendRow;
