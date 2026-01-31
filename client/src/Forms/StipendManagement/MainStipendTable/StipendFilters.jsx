import React from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';


const StipendFilters = ({
    rollNo, setRollNo,
    currentMonth, setCurrentMonth,
    course, setCourse,
    year, setYear,
    fetchStipends, months,
    selectStipendYear, setSelectStipendYear, years
}) => {
    return (
        <div className="filter-container">
            <TextField className="m-4" style={{ minWidth: 200 }} label="Roll No" value={rollNo}
                onChange={(e) => setRollNo(e.target.value)} 
                onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    fetchStipends(); // uses current rollNo from state
                }
            }} />
            <FormControl className="m-4" style={{ minWidth: 200 }}>
                <InputLabel>Stipend Year</InputLabel>
                <Select value={selectStipendYear} label="Stipend Year"
                    onChange={(e) => setSelectStipendYear(e.target.value)}>
                    {years.map((year) => (
                        <MenuItem key={year} value={year}>{year} </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl className="m-4" style={{ minWidth: 200 }}>
                <InputLabel>Month</InputLabel>
                <Select value={currentMonth} label="Month" onChange={(e) => setCurrentMonth(e.target.value)}>
                <MenuItem value="All">All</MenuItem>
                {months.map((month) => (
                    <MenuItem key={month.number} value={month.number}>
                    {month.name}
                    </MenuItem>
                ))}
                </Select>
            </FormControl>
            <FormControl className="m-4" style={{ minWidth: 200 }}>
                <InputLabel>Course</InputLabel>
                <Select value={course}  label="Course" onChange={(e) => setCourse(e.target.value)} >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Bachelor of Science Nursing">Bachelor of Science Nursing</MenuItem>
                <MenuItem value="A.H.S">A.H.S</MenuItem>
                </Select>
            </FormControl>
            <FormControl className="m-4" style={{ minWidth: 200 }}>
                <InputLabel>Year</InputLabel>
                <Select value={year} label="Year" onChange={(e) => setYear(e.target.value)} >
                <MenuItem value="All">All</MenuItem>
                {[1, 2, 3, 4].map((yr) => (
                    <MenuItem key={yr} value={yr}> {yr} </MenuItem>
                ))}
                </Select>
            </FormControl>
        </div>
    )
}

export default StipendFilters
