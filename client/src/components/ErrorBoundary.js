import React, { useState } from "react";

const ErrorBoundary = ({ children }) => {
    const [hasError, setHasError] = useState(false);

    // Catch errors in render
    const handleError = () => setHasError(true);

    // Try rendering children
    try {
        if (hasError) throw new Error("Render failed");
        return children;
    } catch (error) {
        console.error("Error caught by ErrorBoundary:", error);
        setHasError(true);
        return (
            <div style={{ padding: "20px", textAlign: "center", color: "red" }}>
                <h2>Something went wrong.</h2>
                <p>Please refresh the page and try again.</p>
                <button onClick={() => window.location.reload()}
                    className="px-4 py-2 mt-4 bg-blue-500 text-white rounded" >
                    Refresh
                </button>
            </div>
        );
    }
};

export default ErrorBoundary;
