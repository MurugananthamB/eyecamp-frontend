import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  Container,
  Spinner,
  Alert,
  Button,
  Form,
  InputGroup,
} from "react-bootstrap";
import { FaPrint, FaTimes } from "react-icons/fa";
import api from "../api";

const PatientTable = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPatients, setFilteredPatients] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await api.get("/api/patients");
        setPatients(response.data);
        setFilteredPatients(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching patient data. Please try again later.");
        setLoading(false);
      }
    };
    fetchPatients();
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (!value.trim()) {
      setFilteredPatients(patients);
      return;
    }

    const filtered = patients.filter((patient) =>
      [
        patient.regNo,
        patient.patientName,
        patient.email,
        patient.attenderMobile,
      ].some((field) =>
        field?.toString().toLowerCase().includes(value.toLowerCase())
      )
    );

    setFilteredPatients(filtered);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setFilteredPatients(patients);
  };
  const handlePrint = (patient) => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
    <html>
<head>
    <title>Patient Discharge Card</title>
    <style>
        @page { size: landscape; margin: 10px; }
        body { font-family: Arial, sans-serif; font-size: 11px; margin: 10px; width: 100%; }
        .container { width: 100%; padding: 10px; }
        .header { display: flex; justify-content: space-between; align-items: center; }
         .header img { width: 50px; height: auto; }
        .hospital-details { text-align: center; font-size: 11px; }
        .right-top { text-align: right; font-size: 11px; margin-top: 50px }
        .section-title { font-weight: bold; text-decoration: underline; margin-top: 12px; font-size: 11px; }
        .row { display: flex; justify-content: space-between; margin-bottom: 5px; }
        .label { font-weight: bold; width: 45%; font-size: 11px; }
        .value { width: 65%; font-size: 11px; }
        .medi ul {
    padding-left: 15px; /* Indentation */
}

.medi ul li {
    margin-bottom: 5px; /* Adds space between list items */
    line-height: 1.5; /* Increases spacing between lines */
}
        .content-table { width: 100%; border-collapse: collapse; table-layout: fixed; }
        .content-table td { padding: 4px; vertical-align: top; font-size: 11px; }
        .left { width: 50%; vertical-align: top; }
        .right { width: 50%; }
        .signature { text-align: right; margin-top: 25px; font-weight: bold; font-size: 11px; margin-right: 70px; }
    </style>
</head>
<body onload="setTimeout(() => { window.print(); window.close(); }, 1000);">
    <div class="container">
        <div class="header">
         <img src="data:image/png;base64,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" alt="Hospital Logo" />
            <div class="hospital-details">
                <div>Adhiparasakthi Hospital</div>
                <div>Melmaruvathur, Kancheepuram District</div>
                <div>Tamil Nadu, India 603319</div><br>
                <div><b>PATIENT DISCHARGE CARD</b></div>
            </div>
            <div class="right">
                <div class="row"><div class="label">Date of Discharge:</div> 
                    <div class="value">${
                      patient.dateOfDischarge
                        ? new Date(patient.dateOfDischarge).toLocaleDateString()
                        : "N/A"
                    }</div>
                </div><br>
                <div class="row"><div class="label">Final Diagnosis:</div> 
                    <div class="value"><b>${
                      patient.finalDiagnosis || "N/A"
                    }</b></div>
                </div>
            </div>
        </div>

        <div>____________________________________________________________</div>

        <table class="content-table">
            <tr>
                <td class="left">
                    <div class="section-title">A. PATIENT'S RECORDS</div><br>
                    <div class="row"><div class="label">UHID No:</div> <div class="value">${
                      patient.regNo || "N/A"
                    }</div></div>
                    <div class="row"><div class="label">Patient Name:</div> <div class="value">${
                      patient.patientName || "N/A"
                    }</div></div>
                     <div class="row"><div class="label">Patient Mobile:</div> <div class="value">${
                       patient.mobile || "N/A"
                     }</div></div>
                    <div class="row"><div class="label">Age:</div> <div class="value">${
                      patient.age || "N/A"
                    } - ${patient.gender || "N/A"}</div></div>
                    <div class="row"><div class="label">Address:</div> <div class="value">${
                      patient.address || "N/A"
                    }</div></div>
                    <div class="row"><div class="label">District:</div> <div class="value">${
                      patient.district || "N/A"
                    }</div></div><br>

                    <div class="section-title">B. PRE-OPERATIVE EXAMINATION</div><br>
                    <div class="row"><div class="label">Visual Acuity</div> <div class="value">Right Eye: ${
                      patient.visualRight || "N/A"
                    }, Left Eye: ${patient.visualLeft || "N/A"}</div></div>
                    <div class="row"><div class="label">With Own Glasses:</div> <div class="value">${
                      patient.ownGlasses || "No"
                    }</div></div>
                    <div class="row"><div class="label">Provisional Diagnosis:</div> <div class="value"><b>${
                      patient.diagnosis || "N/A"
                    }</b></div></div><br>

                    <div class="section-title">C. SURGERY</div><br>
                    <div class="row"><div class="label">Date:</div> <div class="value">${
                      patient.surgeryDate
                        ? new Date(patient.surgeryDate).toLocaleDateString()
                        : "N/A"
                    }</div></div>
                    <div class="row"><div class="label">Place:</div> <div class="value">${
                      patient.surgeryPlace || "N/A"
                    }</div></div>
                    <div class="row"><div class="label">Operated Eye:</div> <div class="value">${
                      patient.operatedEye || "N/A"
                    }</div></div>
                    <div class="row"><div class="label">Procedure:</div> <div class="value">${
                      patient.procedureName || "N/A"
                    }</div></div>
                    <div class="row"><div class="label">Surgeon Name:</div> <div class="value">${
                      patient.surgeonName || "N/A"
                    }</div></div>
                </td>
                
                <td class="right">
                    <div class="section-title">D. MEDICATION ON DISCHARGE</div>
                    <div class="row">
                       <div class="medi">
    ${
      Array.isArray(patient.medication) && patient.medication.length > 0
        ? `<ul style="padding-left:15px;">${patient.medication
            .map(
              (med) =>
                `<li style="margin-bottom:5px; line-height:1.5;">${med}</li>`
            )
            .join("")}</ul>`
        : "N/A"
    }
</div>
                    </div>
                    <div class="section-title">FOLLOW-UP</div><br>
                    <div class="row"><div class="label">1st Visit:</div> 
                    <div class="value">${
                      patient.firstVisit
                        ? new Date(patient.firstVisit).toLocaleDateString()
                        : "N/A"
                    }</div>
                </div>
                <div class="row"><div class="label">2nd Visit:</div> 
                    <div class="value">${
                      patient.secondVisit
                        ? new Date(patient.secondVisit).toLocaleDateString()
                        : "N/A"
                    }</div>
                </div><br>
                    <div class="row"><div class="label">PLACE:</div> <div class="value">${
                      patient.followPlace || "N/A"
                    }</div></div><br>
                    <div class="row"><div class="label">Right Eye:</div> <div class="value">${
                      patient.visualRight || "N/A"
                    }</div></div>
                    <div class="row"><div class="label">Left Eye:</div> <div class="value">${
                      patient.visualLeft || "N/A"
                    }</div></div><br><br>
<br>                    <div class="signature">
                        <div>Doctor Signature</div>
                    </div>
                </td>
            </tr>
        </table>
    </div>
</body>
</html>


    `);
    printWindow.document.close();
  };

  return (
    <div className="patient-table-container">
      <Container fluid className="p-4 patient-table-box">
        <h1 className="text-center mb-4">Patient Details</h1>

        <div className="d-flex justify-content-end">
          <Button
            className="fw-bold px-4 py-2 rounded-pill shadow-sm"
            variant="warning"
            onClick={() => navigate("/dashboard")}
          >
            Back
          </Button>
        </div>

        {/* Search Bar with Clear Button */}
        <InputGroup className="mb-3 w-75 mx-auto">
          <Form.Control
            type="text"
            placeholder="Search any detail..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          {searchQuery && (
            <Button variant="outline-secondary" onClick={clearSearch}>
              <FaTimes />
            </Button>
          )}
        </InputGroup>

        {loading ? (
          <div className="text-center">
            <Spinner animation="border" />
          </div>
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : filteredPatients.length === 0 ? (
          <Alert variant="info">No patient data available.</Alert>
        ) : (
          <div className="table-responsive">
            <Table striped bordered hover className="table-sm">
              <thead className="table-dark">
                <tr>
                  <th>UHID</th>
                  <th>Title</th>
                  <th>Patient Name</th>
                  <th>Patient Mobile</th>
                  <th>Father/CO</th>
                  <th>Attender Name</th>
                  <th>Attender Mobile</th>
                  <th>Gender</th>
                  <th>Age</th>
                  <th>District</th>
                  <th>Email</th>
                  <th>Visual Right</th>
                  <th>Visual Left</th>
                  <th>Procedure Name</th>
                  <th>Surgeon Name</th>
                  <th>Date of Discharge</th>
                  <th>Diagnosis</th>
                  <th>Registraton Date & Time</th>
                  <th>OT Date</th>
                  <th>Surgery Date</th>
                  <th>Follow Place</th>
                  <th>Final Diagnosis</th> {/* NEW FIELD */}
                  <th>Medications</th> {/* NEW FIELD */}
                  <th>First Visit</th>
                  <th>Second Visit</th>
                  <th className="sticky-column">Action</th>
                </tr>
              </thead>

              <tbody>
                {[...filteredPatients]
                  .sort((a, b) => b.regNo - a.regNo)
                  .map((patient) => (
                    <tr key={patient._id}>
                      <td>{patient.regNo}</td>
                      <td>{patient.title}</td>
                      <td>{patient.patientName}</td>
                      <td>{patient.mobile}</td>
                      <td>{patient.fatherOrCO}</td>
                      <td>{patient.attenderName}</td>
                      <td>{patient.attenderMobile}</td>
                      <td>{patient.gender}</td>
                      <td>{patient.age}</td>
                      <td>{patient.district}</td>
                      <td>{patient.email}</td>
                      <td>{patient.visualRight}</td>
                      <td>{patient.visualLeft}</td>
                      <td>{patient.procedureName}</td>
                      <td>{patient.surgeonName}</td>
                      <td>
                        {patient.dateOfDischarge
                          ? new Date(
                              patient.dateOfDischarge
                            ).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td>{patient.diagnosis}</td>
                      <td>
                        {new Date(
                          patient.registrationDateTime
                        ).toLocaleDateString() || "N/A"}
                      </td>
                      <td>
                        {new Date(patient.otDateTime).toLocaleDateString() ||
                          "N/A"}
                      </td>
                      <td>
                        {new Date(patient.surgeryDate).toLocaleDateString() ||
                          "N/A"}
                      </td>
                      <td>{patient.followPlace}</td>
                      <td>{patient.finalDiagnosis || "N/A"}</td>{" "}
                      {/* NEW FIELD */}
                      <td>{patient.medication?.join(", ") || "N/A"}</td>{" "}
                      {/* FIXED */}
                      <td>
                        {new Date(patient.firstVisit).toLocaleDateString() ||
                          "N/A"}
                      </td>
                      <td>
                        {new Date(patient.secondVisit).toLocaleDateString() ||
                          "N/A"}
                      </td>
                      <td className="sticky-column">
                        <Button
                          variant="primary"
                          size="sm"
                          title="Print Patient Details"
                          onClick={() => handlePrint(patient)}
                        >
                          <FaPrint /> Print
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        )}
      </Container>

      {/* CSS Styles */}
      <style>{`
        /* Full-screen container */
        .patient-table-container {
          height: 100vh;  /* Full viewport height */
          width: 100vw;   /* Full viewport width */
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          background: linear-gradient(to right, #ff9966, #ff5e62);
        }

        /* Table container */
        .patient-table-box {
          width: 100%;
          height: 100%;
          background: white;
          border-radius: 0;
          padding: 20px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        /* Scrollable table area */
        .table-responsive {
          flex-grow: 1;
          overflow-y: auto;  /* Vertical scrolling */
          overflow-x: auto;  /* Horizontal scrolling */
          border: 1px solid #ddd;
          position: relative;
        }

        /* Sticky Table Header */
        .table thead {
          position: sticky;
          top: 0;
          background: white;
          z-index: 10;
        }
        .table thead th {
          background-color: #343a40; /* Dark background */
          color: white;
          text-align: left;
          padding: 12px;
          border-bottom: 2px solid #000;
        }

        /* Sticky Action Column */
        .sticky-column {
          position: sticky;
          right: 0;
          background: white;
          box-shadow: -2px 0 3px rgba(0, 0, 0, 0.1);
          z-index: 10;
          min-width: 100px;
          text-align: center;
        }

        /* Make header for sticky-column also sticky */
        .table thead .sticky-column {
          position: sticky;
          right: 0;
          z-index: 11;  /* Ensure it stays above other headers */
          background-color: #343a40; /* Match header color */
          color: white;
        }

        /* Table Styling */
        .table tbody td {
          padding: 12px;
          border-bottom: 1px solid #ddd;
        }

        /* Improve Scrollbar Visibility */
        .table-responsive::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        .table-responsive::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 4px;
        }

        .table-responsive::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </div>
  );
};

export default PatientTable;
