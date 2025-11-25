import React from "react";
import "../../styles/CourseApplication/CourseSelection.css";

const courses = ["BPT", "MPT", "MSc", "B.Sc", "BPT Lateral", "MPT Neuro"];

export default function CourseSelection({ onSelectCourse }) {
    return (
        <div className="course-container">
            <h2 className="course-title">Select a Course</h2>
            <div className="course-grid">
                {courses.map((course) => (
                    <div key={course} className="course-card" onClick={() => onSelectCourse(course)}>
                        {course}
                    </div>
                ))}
            </div>
        </div>
    );
}


