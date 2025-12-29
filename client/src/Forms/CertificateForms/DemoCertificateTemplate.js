import React from "react";
import "../../styles/Certificates/DemoCertificateTemplate.css";

const ProvisionalCertificate = () => {
  return (
    <div className="page-wrapper">
      <div className="paper-container">
        <div className="outer-border">

          <div className="inner-lines">
            <div className="top-line"></div>
            <div className="bottom-line"></div>
            <div className="left-line"></div>
            <div className="right-line"></div>
          </div>

          <div className="content">
            <div className="header">
              <h1>Nizam's Institute of Medical Sciences</h1>
              <p>(A University established under the State Act, 1989)</p>
              <p className = "para_bold">Punjagutta, Hyderabad-500082, Telangana, India.</p>
            </div>

            <div className="roll-row">
              <div>Roll No. 2014014</div>
              <div>145324 - 800247</div>
            </div>

            <div className="certificate-title">
              <h2>PROVISIONAL CERTIFICATE</h2>
            </div>

            <div className="body-text">
              <p>This is to certify that</p>
              <div className="name">DUBBAKA KAVYA</div>
              <p className="parent-name">D/O DUBBAKA SRINIVAS</p>
              <p>has been duly admitted to the</p>
              <div className="course">Master in Hospital Management</div>
              <p>having passed in the Final Examinations</p>
              <p>held in May 2023</p>
            </div>

            <div className="footer">
              <div>
                <div>Place: Hyderabad</div>
                <div>Date: 06/07/2024</div>
              </div>
              <div className="registrar">Executive Registrar</div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProvisionalCertificate;
