import React, {useState} from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Table, TableBody,
    TableRow, TableCell, TextField, FormControl, Select, MenuItem } from "@mui/material";
import axiosInstance from "../../../components/AxiosInstance";


const StipendDialogs = ({ 
    open, setOpen, showModal, setShowModal, selectedRow, handleApprovalSubmit, loading, 
    editOpen, setEditOpen, editRowData, editLeaves, setEditLeaves, editStatus, setEditStatus, data, setData
     
    }) => {

    const [leavesEditLoading, setLeavesEditLoading] = useState(false);
    
    const totalDays = editRowData
            ? Number(editRowData.leaves || 0) + Number(editRowData.present || 0)
            : 0;

    const presentDays =
        (editStatus === "Regular" || editStatus === "Re-admission")
            ? totalDays - Number(editLeaves || 0)
            : 0;

    // Handle status change
    const handleStatus = (e) => {
        const value = e.target.value;
        if(value === "Re-admission" && editRowData.student_status !== "Long Absent") {
            alert("Status can be changed to Re-admission only when student is Long Absent.");
            return;
        }
        // Reset leaves if status is not Regular
        if (value !== "Regular" || value !== "Re-admission") {
            setEditLeaves(totalDays);
        }
        else {
            setEditLeaves(editRowData ? editRowData.leaves : 0);
        }
        setEditStatus(e.target.value);
    }

    // Handle leaves update submission
        const handleLeavesUpdate = async () => {
            const leavesNum = Number(editLeaves);
            const presentNum = Number(presentDays);
            const totalDaysNum = Number(totalDays);
            const actualStipendNum = Number(editRowData?.actual_stipend || 0);

            if (Number(editRowData.leaves) === leavesNum && editStatus === editRowData.student_status) {
                alert("No changes made to leaves.");
                return;
            }

            let calculatedStipend = 0;

            if ((editStatus === "Regular" || editStatus === "Re-admission" ) && totalDaysNum > 0) {
                const perDayStipend = actualStipendNum / totalDaysNum;
                const calStipend = perDayStipend * presentNum;

                const roundedStipend =
                    calStipend % 1 < 0.5
                    ? Math.floor(calStipend)
                    : Math.ceil(calStipend);

                calculatedStipend = roundedStipend;
            }

            try {
                setLeavesEditLoading(true);

                const res = await axiosInstance.put(
                "/api/stipend/update_leaves_present",
                {
                    id: editRowData.id,
                    leaves: leavesNum,
                    present: presentNum,
                    status: editStatus,
                    stipend: calculatedStipend,
                    is_status_changed: editRowData.student_status !== editStatus
                }
                );

                if (res.status === 200) {
                alert("Leaves and Present days updated successfully.");

                setData(prevData =>
                    prevData.map(item =>
                    item.id === editRowData.id
                        ? {
                            ...item,
                            leaves: leavesNum,
                            present: presentNum,
                            stipend: calculatedStipend,
                            student_status: editStatus
                        }
                        : item
                    )
                );
                } else {
                alert("Failed to update leaves. Please try again.");
                }
            } catch (err) {
                console.error("Error updating leaves:", err);
            } finally {
                setLeavesEditLoading(false);
                setEditOpen(false);
            }
        };


    return (
        <>
            {/* APPROVAL CONFIRMATION */}
            <Dialog open={showModal} onClose={() => setShowModal(false)} maxWidth="md" fullWidth>
                <DialogTitle className="text-lg font-bold">Confirmation</DialogTitle>
                <DialogContent dividers className="text-center">Are you sure you want to proceed?</DialogContent>
                <DialogActions className="justify-center gap-4">
                <Button variant="outlined" onClick={() => setShowModal(false)}>Cancel</Button>
                <Button variant="contained" name = "approved" color="success" disabled={loading} onClick={handleApprovalSubmit} sx={{ "&.Mui-disabled": { filter: "blur(1px)", opacity: 0.6, cursor: "not-allowed" } }}>Approved</Button>
                </DialogActions>
            </Dialog>

        {/* VIEW STIPEND DETAILS */}
        <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
            <DialogTitle>Stipend Details</DialogTitle>
            <DialogContent dividers>
            {selectedRow && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", padding: "8px" }}>
                <div><strong>Roll No:</strong> {selectedRow.roll_no}</div>
                <div><strong>Name:</strong> {selectedRow.name}</div>
                <div><strong>Course:</strong> {selectedRow.course}</div>
                <div><strong>Account No:</strong> {selectedRow.account_no}</div>
                <div><strong>Leaves:</strong> {selectedRow.leaves}</div>
                <div><strong>Present Days:</strong> {selectedRow.present || "N/A"}</div>
                <div><strong>Stipend:</strong> {selectedRow.stipend || "N/A"}</div>
                <div><strong>Verifier ID:</strong> {selectedRow.verifier_id || "N/A"}</div>
                <div><strong>Verifier Name:</strong> {selectedRow.verifier_name || "N/A"}</div>
                <div><strong>Verifier Status:</strong> {selectedRow.verifier_status || "N/A"}</div>
                <div><strong>Approver ID:</strong> {selectedRow.approver_id || "N/A"}</div>
                <div><strong>Approver Name:</strong> {selectedRow.approver_name || "N/A"}</div>
                <div><strong>Approver Status:</strong> {selectedRow.approver_status || "N/A"}</div>
                <div><strong>Form Filled ID:</strong> {selectedRow.checker_id || "N/A"}</div>
                <div style={{ gridColumn: "span 2" }}><strong>Form Filled Name:</strong> {selectedRow.checker_name || "N/A"}</div>
                </div>
            )}
            </DialogContent>
            <DialogActions><Button onClick={() => setOpen(false)} variant="contained">Close</Button></DialogActions>
        </Dialog>

        {/* EDIT STIPEND */}
        <Dialog open={editOpen} onClose={() => setEditOpen(false)} maxWidth="sm" fullWidth>
            <DialogTitle>Edit Stipend Details</DialogTitle>
            <DialogContent dividers>
            <Table size="small">
                <TableBody>
                <TableRow><TableCell><b>Roll No</b></TableCell><TableCell>{editRowData?.roll_no}</TableCell></TableRow>
                <TableRow><TableCell><b>Name</b></TableCell><TableCell>{editRowData?.name}</TableCell></TableRow>
                <TableRow>
                    <TableCell><b>No of Absents</b></TableCell>
                    <TableCell><TextField type="number" size="small" fullWidth value={editLeaves} onChange={(e) => setEditLeaves(e.target.value)} /></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell><b>Present Days</b></TableCell>
                    <TableCell><TextField size="small" fullWidth value={presentDays} /></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell><b>Status</b></TableCell>
                    <TableCell>
                    <FormControl size="small" fullWidth>
                        <Select value={editStatus} onChange={handleStatus}>
                        {["Regular", "Long Absent", "Discontinue", "Re-admission"].map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                        </Select>
                    </FormControl>
                    </TableCell>
                </TableRow>
                </TableBody>
            </Table>
            </DialogContent>
            <DialogActions sx={{ px: 3, py: 2 }}>
            <Button onClick={() => setEditOpen(false)} color="inherit">Cancel</Button>
            <Button onClick={handleLeavesUpdate} variant="contained" disabled={leavesEditLoading}>{leavesEditLoading ? "Updating..." : "Update Details"}</Button>
            </DialogActions>
        </Dialog>
        </>
    );
};

export default StipendDialogs;