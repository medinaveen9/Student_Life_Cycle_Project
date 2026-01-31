import React, { useEffect, useState, useRef } from "react";
import axiosInstance from "../../../components/AxiosInstance";
import { useNavigate } from "react-router-dom";
import "../../../styles/StipendManagement/StipendTable.css";

import StipendFilters from "./StipendFilters";
import StipendRow from "./StipendRow";
import StipendDialogs from "./StipendDialog";
import StipendActions from "./StipendActions";

const StipendTable = ({ setEditableData, user }) => {
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [dataLoaded, setDataLoaded] = useState(false);
    const fetchOnce = useRef(false);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const [selected, setSelected] = useState([]); // track selected row ids
    const [selectAll, setSelectAll] = useState(false); // header checkbox state
    const [selectedItem, setSelectedItem] = useState(null); // single selected item for edit/approval
    const [loading, setLoading] = useState(false); // loading state for API calls

    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
    const [course, setCourse] = useState("All");
    const [year, setYear] = useState("All");
    const [rollNo, setRollNo] = useState("");

    const currentYear = new Date().getFullYear();
    const startYear = 2015; // or any year you want
    const endYear = currentYear + 30; // optional future years
    const [selectStipendYear, setSelectStipendYear] = useState(currentYear);
    const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);

    // Edit leaves and present days
    const [leaves, setLeaves] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);

    const [editRowId, setEditRowId] = useState(null);
    const [editOpen, setEditOpen] = useState(false);
    const [editRowData, setEditRowData] = useState(null);
    // edit dialog fields
    const [editLeaves, setEditLeaves] = useState("");
    const [editStatus, setEditStatus] = useState("Regular");

    const months = [
        { number: 1, name: "January" }, { number: 2, name: "February" },
        { number: 3, name: "March" }, { number: 4, name: "April" },
        { number: 5, name: "May" }, { number: 6, name: "June" },
        { number: 7, name: "July" }, { number: 8, name: "August" },
        { number: 9, name: "September" }, { number: 10, name: "October" },
        { number: 11, name: "November" }, { number: 12, name: "December" },
    ];

    const fetchStipends = async () => {
        try {
            setDataLoaded(true);
            const response = await axiosInstance.get("/api/stipend/stipend_details", {
                params: { role: user.role, month: currentMonth, course : course, 
                    year : year, roll_no : rollNo || "", stipend_year : selectStipendYear  },
            });
            const result = response.data;

            if (result.success) {
                setData(result.data);
            } else {
                console.error("Failed to fetch stipends:", result.error);
            }
        } catch (err) {
        console.error("Error fetching stipend data:", err);
        } finally {
        setDataLoaded(false);
        }
    };

    // Fetch data from API
    useEffect(() => {
        
        if (!fetchOnce.current) {
        fetchStipends();
        }
    }, [currentMonth, course, year, selectStipendYear]);

    //Handle row edit
    const handleSelectedRowEdit = (row) => {
        setEditRowData(row);
        setEditLeaves(row.leaves || "");
        setEditStatus(row.student_status || "Regular");
        setEditOpen(true);
    };

    // Handle header checkbox
    const handleSelectAll = () => {
        if (selectAll) {
        setSelected([]);
        setSelectAll(false);
        } else {
        const allIds = data.map((row) => row.id);
        setSelected(allIds);
        setSelectAll(true);
        }
    };

    // Handle change of leaves input (single row edit)
    const handleChangeLeaves = (e) => {
        setLeaves(Number(e.target.value));
    };

    // Handle row checkbox toggle
    const handleRowSelect = (id) => {
        let updatedSelected = [];
        if (selected.includes(id)) {
        updatedSelected = selected.filter((rowId) => rowId !== id);
        } else {
        updatedSelected = [...selected, id];
        }
        setSelected(updatedSelected);
        setSelectAll(updatedSelected.length === data.length);
    };

    // Handle View
    const handleView = (row) => {
        setSelectedRow(row);
        setOpen(true);
    };

    // Handle Edit
    const handleEdit = (row) => {
        setEditableData(row);
        navigate("/stipendform");
    };

    const handleRowEdit = (row) => {
        setEditRowId(row.id);
    }

    // Handle Delete
        const handleDelete = async (row) => {
        if (!window.confirm(`Are you sure you want to delete stipend record for ${row.name} (Roll No: ${row.roll_no})?`)) { 
            return;
        }
        try {
            setLoading(true);
            const response = await axiosInstance.delete("/api/stipend/delete_student_stipend", {
            params: { id: row.id, userInfo : user },
            });
            const result = response.data;
            if (result.success) {
            alert("Stipend record deleted successfully");
            setData((prevData) => prevData.filter((item) => item.id !== row.id));
            } else {
            alert("Failed to delete stipend record: " + result.error);
            }
        } catch (err) {
            console.error("Error deleting stipend record:", err);
            alert("Error deleting stipend record");
        }
        finally {
            setLoading(false);
            setEditRowId(null);
        }
        };

    // Handle Approval
    const handleApproval = (row) => {
        setSelectedItem(row);
        setShowModal(true);
    };

    // Handle bulk approval
    const handleBulkApproval = async () => {
        setLoading(true);
        if (selected.length === 0) return;
        try{
        const result = await axiosInstance.post("/api/stipend/bulk_approval", {
            ids: selected, role: user.role, userInfo : user
        });
        if(result.data.success){
            alert("Stipends approved successfully");
            setData((prevData) =>
            prevData.map((item) =>
                selected.includes(item.id)  
                ? { ...item, [`${user.role.toLowerCase()}_status`]: "approved" }
                : item
            )
            );
            
            setSelected([]);
            setSelectAll(false);  
        } else {
            alert("Failed to approve stipends: " + result.data.error);
        }
        }
        catch(err){
        console.error("Error approving stipends:", err);
        alert("Error approving stipends");
        } finally {
        setLoading(false);
        }
    };

    const handleApprovalSubmit = async (e) => {
        e.preventDefault();
        const status  = e.target.name;
        try {
        setLoading(true);
        const response = await axiosInstance.get("/api/stipend/action_status", {
            params: { id: selectedItem.id, status : status, role : user.role, userInfo : user },
        });
        const result = response.data;
        if (result.success) {
            alert("Stipend approved successfully");
            if(status === "approved"){
            setData((prevData) =>
                prevData.map((item) =>
                item.id === selectedItem.id
                    ? { ...item, [`${user.role.toLowerCase()}_status`]: "approved" }
                    : item
                )
            );
            } else if(status === "rejected"){
            setData((prevData) =>
                prevData.map((item) => 
                item.id === selectedItem.id
                    ? { ...item, [`${user.role.toLowerCase()}_status`]: "rejected" }
                    : item  
                )
            );
            }
            setSelectedItem(null);
            setShowModal(false);
        } else {
            alert("Failed to approve stipend: " + result.error);
        }
        } catch (err) {
        console.error("Error approving stipend:", err);
        alert("Error approving stipend");
        } finally {
        setLoading(false);
        }
    };

    // Download PDF Report
    const downloadReport = async (data) => {
        try {
        // 🔹 Dynamically get month, year, and batch
        const now = new Date();
        const month = now.toLocaleString("en-US", { month: "long" }); // e.g. "September"
        const Present_year = now.getFullYear(); // e.g. 2025
        const batch = `${Present_year - 1}-${Present_year}`; // auto: "2024-2025"

        setLoading(true);
        const response = await axiosInstance.post(
            "api/report/stipend_report",
            { currentMonth, year, batch, course, user, selectStipendYear }, // send to backend
            {
            headers: { "Content-Type": "application/json" },
            responseType: "blob", // important for PDF
            params: { role: user.role, month: currentMonth, course : course, year : year, roll_no : rollNo || "" },
            }
        );

        // Create PDF blob
        const fileBlob = new Blob([response.data], { type: "application/pdf" });

        // Create a link for download
        const url = window.URL.createObjectURL(fileBlob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `Stipend_Report_${month}_${year}.pdf`);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
        } catch (error) {
        console.error("Error downloading stipend report:", error);
        } finally {
        setLoading(false);
        }
    };

    //Download Excel Report
    const downloadExcelReport = async (data) => {
        try {
        // 🔹 Dynamically get month, year, and batch
        const now = new Date();
        const month = now.toLocaleString("en-US", { month: "long" }); // e.g. "October"
        const Present_year = now.getFullYear(); // e.g. 2025
        const batch = `${Present_year - 1}-${Present_year}`; // auto: "2024-2025"

        setLoading(true);

        const response = await axiosInstance.post(
            "api/report/stipend_excel", // backend endpoint for Excel
            {  currentMonth, year, batch, course, user, selectStipendYear },
            {
            headers: { "Content-Type": "application/json" },
            responseType: "blob", // important for Excel
            params: { role: user.role, month: currentMonth, course : course, 
                year : year, roll_no : rollNo || "" , stipend_year : selectStipendYear  },
            }
        );

        // Create Excel blob
        const fileBlob = new Blob(
            [response.data],
            { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }
        );

        // Create a link for download
        const url = window.URL.createObjectURL(fileBlob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
            "download",
            `Stipend_Report_${month}_${year}.xlsx`
        );
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
        } catch (error) {
        console.error("Error downloading Excel stipend report:", error);
        } finally {
        setLoading(false);
        }
    };


    return (
        <React.Fragment>
            <StipendFilters
                rollNo={rollNo}
                setRollNo={setRollNo}
                currentMonth={currentMonth}
                setCurrentMonth={setCurrentMonth}
                course={course}
                setCourse={setCourse}
                year={year}
                setYear={setYear}
                fetchStipends={fetchStipends}
                months ={months}
                selectStipendYear ={selectStipendYear}
                setSelectStipendYear ={setSelectStipendYear}
                years ={years}
            />
        
        <div className="mt-16 overflow-x-auto p-4">
            {/* Dynamic heading */}
            {(() => {
            const now = new Date();
            const displayYear = now.getFullYear();
            const batch = `${displayYear - 1}-${displayYear}`;
            const monthObj = months.find((m) => Number(m.number) === Number(currentMonth));
            const monthLabel = currentMonth === "All" ? "ALL MONTHS" : (monthObj ? monthObj.name.toUpperCase() : String(currentMonth).toUpperCase());
            const courseLabel = course === "All" ? "ALL COURSES" : course.toUpperCase();
            const yearLabel = year === "All" ? "" : `YEAR ${year}`;
            const stipendWord = currentMonth === "All" ? "STIPENDS" : "STIPEND";
            return (
                <h2 className="text-xl font-bold mb-4 text-center">
                Verification and Approval
                </h2>
            );
            })()}

            <StipendActions
                selected={selected}
                handleBulkApproval={handleBulkApproval}
                downloadReport={downloadReport}
                downloadExcelReport={downloadExcelReport}
                data={data}
                user={user}
                loading={loading}
            /> 

            <StipendRow
                data={data}
                dataLoaded={dataLoaded}
                selected={selected}
                selectAll={selectAll}
                handleRowSelect={handleRowSelect}
                handleSelectAll={handleSelectAll}
                handleView={handleView}
                handleRowEdit={handleRowEdit}
                editRowId={editRowId}
                leaves={leaves}
                handleChangeLeaves={handleChangeLeaves}
                handleDelete={handleDelete}
                handleApproval={handleApproval}
                user={user}
                handleSelectedRowEdit = {handleSelectedRowEdit}
            />
        </div>
        
        <StipendDialogs
            open={open}
            setOpen={setOpen}
            showModal={showModal}
            setShowModal={setShowModal}
            selectedRow={selectedRow}
            handleApprovalSubmit={handleApprovalSubmit}
            loading={loading}
            editOpen ={editOpen}
            setEditOpen={setEditOpen}
            editRowData={editRowData}
            setEditRowData={setEditRowData}
            editLeaves={editLeaves}
            setEditLeaves={setEditLeaves}
            editStatus = {editStatus}
            setEditStatus={setEditStatus}
            data ={data}
            setData={setData}
        />

        </React.Fragment>
    );
};

export default StipendTable;
