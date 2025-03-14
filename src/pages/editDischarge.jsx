import React, { useContext } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FormContext } from "./formContext"; // Import FormContext
import Select from "react-select"; // Import react-select
import { FaRedo, FaSignOutAlt } from "react-icons/fa";
import api from "../api";

const EditDischarge = () => {
  const { formData, setFormData } = useContext(FormContext);
  const navigate = useNavigate();

  // 🔹 Fix: Define isSubmitting state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleMedicationChange = (selectedOptions) => {
  setFormData({
    ...formData,
    medication: selectedOptions.map((option) => option.value), // ✅ Store value instead of label
  });
};



const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("Form submitted"); // ✅ Debugging Check

  setIsSubmitting(true);
  setErrorMessage("");
  setSuccessMessage("");

  // Get current date and time
  const now = new Date();
  const currentDate = now.toISOString().split("T")[0];
  const currentTime = now.toLocaleTimeString([], { hour12: true });
  const registrationDateTime = `${currentDate} ${currentTime}`;

  try {
    const updatedFormData = { ...formData, registrationDateTime };

    console.log("Sending data:", updatedFormData); // ✅ Debug API request

    const response = await api.post("/api/patients", updatedFormData);

    console.log("Response received:", response.status); // ✅ Debug response status

    if (response.status === 201) {
      setTimeout(
        () => window.alert("Patient Data added Successfully! ✅"),
        100
      ); // ✅ Alert Fix
      setTimeout(() => {navigate("/dashboard");
      window.location.reload();  
    } ,500);

      setFormData({
        dateOfDischarge: "",
        finalDiagnosis: "",
        medication: [],
        others: "",
        firstVisit: "",
        secondVisit: "",
        followPlace: "",
        referredBy: "",
      });
    } else {
      throw new Error("Failed to submit data. Please try again.");
    }
  } catch (error) {
    console.error("Error:", error.message);
    setErrorMessage(error.message);
  } finally {
    setIsSubmitting(false);
  }
};

 const handleLogout = () => {
   setFormData({}); // Clear form data
   localStorage.clear(); // Clear all items in localStorage
   navigate("/login"); // Redirect to the login page (or any other page)
 };

  const handleBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  const handleReprint = () => {
    navigate("/reprintCard"); // Navigate to reprint card page
  };

const medicationOptions = [
  { label: "QUIN - PD EYE DROPS - 1 Hr (1 WEEK)" },
  { label: "FLURE E/D - 3 TIMES/DAY" },
  { label: "MOXAP DEXA (MOXIFLOXACIN + DEXAMETHASONE)" },
  {
    label:
      "MOXIFLOXACIN 0.5% + DEXAMETHASONE 0.1% EYE DROPS - 10 TIMES (1 WEEK)",
  },
  { label: "T. CIFRAN 500 MG 1-0-1 X 5 DAYS" },
  { label: "T. PARA 500 MG - 1-0-1 X 3 DAYS" },
  { label: "T. RANTAC 150 MG 1-0-1 X 5 DAYS" },
].map((item) => ({
  value: item.label, // label-ஏ value-ஆக மாற்றி pass செய்கிறோம்
  label: item.label,
}));

console.log(medicationOptions);

  // Convert selected values for react-select
const selectedMedications = medicationOptions.filter(
  (option) => formData.medication?.includes(option.value) // ✅ Ensure the value is checked
);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #ff9966, #ff5e62)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button
        variant="secondary"
        onClick={handleLogout}
        className="btn-warning rounded-3 p-2 fw-semibold shadow-sm d-flex align-items-center"
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          zIndex: 10,
        }}
      >
        <FaSignOutAlt className="me-2" /> Logout
      </Button>

      <Button
        variant="primary"
        onClick={handleReprint}
        className="btn-info rounded-3 p-2 fw-semibold shadow-sm d-flex align-items-center"
        style={{
          position: "absolute",
          top: "70px",
          right: "20px",
          zIndex: 10,
        }}
      >
        <FaRedo className="me-2" /> Reprint Card
      </Button>

      <Container className="d-flex justify-content-center align-items-center">
        <Card
          className="p-4 shadow-lg rounded-4 w-100"
          style={{
            maxWidth: "900px",
            border: "none",
            backgroundColor: "#ffffffd9",
          }}
        >
          <Card.Body>
            <h2 className="text-center mb-4 fw-bold">Discharge</h2>

            <Form onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Col md={12}>
                  <Form.Group>
                    <Form.Label className="fw-semibold">
                      Date of Discharge
                    </Form.Label>
                    <Form.Control
                      type="date"
                      name="dateOfDischarge"
                      value={formData?.dateOfDischarge || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="3">
                  Final Diagnosis
                </Form.Label>
                <Col sm="9">
                  <Form.Select
                    name="finalDiagnosis"
                    value={formData.finalDiagnosis}
                    onChange={handleChange}
                  >
                    <option value="">Select Diagnosis</option>
                    <option value="CORNEAL_OPACITY">CORNEAL OPACITY</option>
                    <option value="GLAUCOMA">GLAUCOMA</option>
                    <option value="LEFT_EYE_APHAKIA">LEFT EYE APHAKIA</option>
                    <option value="LEFT_EYE_HYPERMATURE_CATARACT">
                      LEFT EYE HYPERMATURE CATARACT
                    </option>
                    <option value="LEFT_EYE_IMC">LEFT EYE IMC</option>
                    <option value="LEFT_EYE_IMMATURE_CATARACT">
                      LEFT EYE IMMATURE CATARACT
                    </option>
                    <option value="LEFT_EYE_IMMATURE_CATARACT_NUCLEAR_SCLEROSIS">
                      Left Eye Immature Cataract/Nuclear Sclerosis I/MIN
                      /Posterior Sub Capsular Cataract
                    </option>
                    <option value="LEFT_EYE_MATURE_CATARACT">
                      LEFT EYE MATURE CATARACT
                    </option>
                    <option value="LEFT_EYE_MSC">LEFT EYE MSC</option>
                    <option value="LEFT_EYE_PCIOL">LEFT EYE PCIOL</option>
                    <option value="LEFT_EYE_PTERYGIUM">
                      LEFT EYE PTERYGIUM
                    </option>
                    <option value="NORMAL">NORMAL</option>
                    <option value="PRESBYOPIA">PRESBYOPIA</option>
                    <option value="PTERYGIUM">pterygium</option>
                    <option value="REFRACTIVE_ERROR">REFRACTIVE ERROR</option>
                    <option value="RIGHT_EYE_APHAKIA">RIGHT EYE APHAKIA</option>
                    <option value="RIGHT_EYE_HYPERMATURE_CATARACT">
                      RIGHT EYE HYPERMATURE CATARACT
                    </option>
                    <option value="RIGHT_EYE_IMC">RIGHT EYE IMC</option>
                    <option value="RIGHT_EYE_IMMATURE_CATARACT">
                      RIGHT EYE IMMATURE CATARACT
                    </option>
                    <option value="RIGHT_EYE_IMMATURE_CATARACT_NUCLEAR_SCLEROSIS">
                      Right Eye Immature Cataract/Nuclear Sclerosis III/
                      Posterior Sub Capsular Cataract
                    </option>
                    <option value="RIGHT_EYE_MATURE_CATARACT">
                      RIGHT EYE MATURE CATARACT
                    </option>
                    <option value="RIGHT_EYE_MSC">RIGHT EYE MSC</option>
                    <option value="RIGHT_EYE_PCIOL">RIGHT EYE PCIOL</option>
                    <option value="RIGHT_EYE_PTERYGIUM">
                      RIGHT EYE PTERYGIUM
                    </option>
                  </Form.Select>
                </Col>
              </Form.Group> */}

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="3">
                  Medication
                </Form.Label>
                <Col sm="9">
                  <Select
                    options={medicationOptions}
                    isMulti
                    value={selectedMedications}
                    onChange={handleMedicationChange}
                    className="basic-multi-select"
                    classNamePrefix="select"
                  />
                </Col>
              </Form.Group>

              <Row className="mb-3">
                <Col md={12}>
                  <Form.Group>
                    <Form.Label className="fw-semibold">Others</Form.Label>
                    <Form.Control
                      type="text"
                      name="others"
                      value={formData?.others || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fw-semibold">Ist Visit</Form.Label>
                    <Form.Control
                      type="date"
                      name="firstVisit"
                      value={formData?.firstVisit || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fw-semibold">IInd Visit</Form.Label>
                    <Form.Control
                      type="date"
                      name="secondVisit"
                      value={formData?.secondVisit || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={12}>
                  <Form.Group>
                    <Form.Label className="fw-semibold">
                      Follow Place
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="followPlace"
                      value={formData?.followPlace || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={12}>
                  <Form.Group>
                    <Form.Label className="fw-semibold">Referred By</Form.Label>
                    <Form.Select
                      name="referredBy"
                      value={formData.referredBy || ""}
                      onChange={handleChange}
                    >
                      <option value="">Select Referral Source</option>
                      <option value="Social Media">Social Media</option>
                      <option value="Public Announcement">
                        Public Announcement
                      </option>
                      <option value="Mandram">Mandram</option>
                      <option value="Doctor Referral">Doctor Referral</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Camp">Camp</option>
                      <option value="Hospital">Hospital</option>
                      <option value="Direct Walk In">Direct Walk In</option>
                      <option value="Others">Others</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Button
                type="submit"
                className="w-100 btn-danger fw-semibold p-2 rounded-3 shadow-sm"
              >
                Submit
              </Button>

              {/* <Button
                onClick={() => window.print()}
                className="mt-3 w-100 btn-success rounded-3 p-2 fw-semibold shadow-sm"
              >
                Print
              </Button> */}

              <Button
                onClick={handleBack}
                className="mt-3 w-100 btn-secondary rounded-3 p-2 fw-semibold shadow-sm"
              >
                Back
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default EditDischarge;
