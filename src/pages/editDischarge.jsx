import React, { useContext } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FormContext } from "./formContext"; // Import FormContext

const EditDischarge = () => {
  const { formData, setFormData } = useContext(FormContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Data:", formData);
    navigate("/next-page"); // Update the path as needed
  };

    const handleLogout = () => {
      setFormData({}); // Clear form data
      localStorage.clear(); // Clear all items in localStorage
      navigate("/login"); // Redirect to the login page (or any other page)
    };
  
    const handleBack = () => {
      navigate(-1); // Navigate to the previous page
    };

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
        className="btn-warning rounded-3 p-2 fw-semibold shadow-sm"
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          zIndex: 10, // Ensure the button is above other elements
        }}
      >
        Logout
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

              {/* <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fw-semibold">
                      Vision In Right Eye
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="visionRightEye"
                      value={formData?.visionRightEye || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fw-semibold">
                      Vision In Left Eye
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="visionLeftEye"
                      value={formData?.visionLeftEye || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row> */}

              <Form.Group as={Row} className="mb-3">
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
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="3">
                  Medication
                </Form.Label>
                <Col sm="9">
                  <Form.Select
                    name="medication"
                    value={formData.medication}
                    onChange={handleChange}
                  >
                    <option value="">Select Medication</option>
                    <option value="QUIN_PD_EYE_DROPS_1HR">
                      QUIN - PD EYE DROPS - 1 Hr (1 WEEK)
                    </option>
                    <option value="FLURE_ED_3TIMES_DAY">
                      FLURE E/D - 3 TIMES/DAY
                    </option>
                    <option value="MOXAP_DEXA">
                      MOXAP DEXA (MOXIFLOXACIN + DEXAMETHASONE)
                    </option>
                    <option value="MOXIFLOXACIN_DEXAMETHASONE">
                      MOXIFLOXACIN 0.5% + DEXAMETHASONE 0.1% EYE DROPS - 10
                      TIMES (1 WEEK)
                    </option>
                    <option value="T_CIFRAN_500MG">
                      T. CIFRAN 500 MG 1-0-1 X 5 DAYS
                    </option>
                    <option value="T_PARA_500MG">
                      T. PARA 500 MG - 1-0-1 X 3 DAYS
                    </option>
                    <option value="T_RANTAC_150MG">
                      T. RANTAC 150 MG 1-0-1 X 5 DAYS
                    </option>
                  </Form.Select>
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
