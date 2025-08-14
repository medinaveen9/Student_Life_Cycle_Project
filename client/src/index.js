// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';

// import reportWebVitals from './reportWebVitals';
// import { BrowserRouter } from 'react-router-dom';
// import App from './App';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </React.StrictMode>
// );

// // Optional: To measure performance
// reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { CourseProvider } from './CourseContext';  // ✅ import context provider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CourseProvider>   {/* ✅ Wrap the app here */}
        <App />
      </CourseProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// Optional: To measure performance
reportWebVitals();
