import React from "react";
import "../styles/WelcomePage.css";

const WelcomePage = ({ user }) => {
    const username = user?.user_name || "Guest";
    return (
        <div className="welcome-container">
        <div className="welcome-card">
            <h1>Welcome, {username}! </h1>
            <p>Your dashboard is ready.</p>
        </div>
        </div>
    );
};

export default WelcomePage;
