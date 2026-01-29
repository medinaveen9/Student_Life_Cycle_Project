import React from 'react';
import { CircularProgress } from '@mui/material';
import { FaEdit, FaTrash } from "react-icons/fa";
import VisibilityIcon from "@mui/icons-material/Visibility";
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import "../../../styles/StipendManagement/StipendTable.css";

const StipendRow = (
    { data, dataLoaded, selected, selectAll, handleRowSelect, handleSelectAll,
      handleView, handleRowEdit, editRowId, leaves, handleChangeLeaves,
      handleLeavesUpdate, handleDelete, handleApproval, user, handleSelectedRowEdit }
) => {
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
                <th className="border px-2 py-1">Update</th>
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
                        <td className="border px-2 py-1">
                            {editRowId === row.id 
                            ? <input min="0" value={leaves ?? row.leaves} 
                                onChange={handleChangeLeaves} className="w-16 border px-1.5 py-1.5" /> 
                            : row.leaves}
                        </td>
                        <td className="border px-2 py-1">{row.present}</td>
                        <td className="border px-2 py-1">{row.stipend}</td>
                        <td className="border px-2 py-1">
                            <button className="text-blue-600 hover:text-blue-800" onClick={() => handleSelectedRowEdit(row)}>
                            <FaEdit />
                            </button>
                        </td>
                        <td className="border px-2 py-1">
                            <button className="text-blue-600 hover:text-blue-800" onClick={() => handleLeavesUpdate(row)}>
                            Update
                            </button>
                        </td>
                        <td className="border px-2 py-1">
                            <button className="text-red-600 hover:text-blue-800" onClick={() => handleDelete(row)}>
                            <FaTrash />
                            </button>
                        </td>
                        {user.role === "Verifier" ? (
                            <td className="border px-2 py-1">
                                {row.verifier_status === "Pending" && (
                                <HourglassEmptyIcon style={{ color: "orange", fontSize: "20px" }} titleAccess="Pending" onClick={() => handleApproval(row)}/>
                                )}
                                {row.verifier_status === "approved" && (
                                <CheckCircleIcon style={{ color: "green", fontSize: "20px" }} titleAccess="Approved" />
                                )}
                                {row.verifier_status === "rejected" && (
                                <CancelIcon style={{ color: "red", fontSize: "20px" }} titleAccess="Rejected" />
                                )}
                            </td>
                            ) : (user.role === "Approver" || user.role === "FA" || user.role === "FC") ? (
                                <td className="border px-2 py-1">
                                {row.approver_status === "Pending" && (
                                    <HourglassEmptyIcon style={{ color: "orange", fontSize: "20px" }} titleAccess="Pending" onClick={() => handleApproval(row)} />
                                )}
                                {row.approver_status === "approved" && (
                                    <CheckCircleIcon style={{ color: "green", fontSize: "20px" }} titleAccess="Approved" />
                                )}
                                {row.approver_status === "rejected" && (
                                    <CancelIcon style={{ color: "red", fontSize: "20px" }} titleAccess="Rejected" />
                                )}
                                </td>
                            ) : user.role === "Checker" ? (
                                <td className="border px-2 py-1">
                                {row.checker_status === "Pending" && (
                                    <HourglassEmptyIcon style={{ color: "orange", fontSize: "20px" }} titleAccess="Pending" onClick={() => handleApproval(row)} />
                                )}
                                {row.checker_status === "approved" && (
                                    <CheckCircleIcon style={{ color: "green", fontSize: "20px" }} titleAccess="Approved" />
                                )}
                                {row.checker_status === "rejected" && (
                                    <CancelIcon style={{ color: "red", fontSize: "20px" }} titleAccess="Rejected" />
                                )}
                                </td>
                            ) : null}
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

export default StipendRow
