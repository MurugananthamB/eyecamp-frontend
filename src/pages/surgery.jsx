import React, { useContext } from "react";
import { Container, Form, Button, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FormContext } from "./formContext";

const Surgery = () => {
  const navigate = useNavigate();
  const { formData, setFormData } = useContext(FormContext); // Use FormContext

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle Submit
  const handleNext = (e) => {
    e.preventDefault();
    navigate("/editdischarge");
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
        padding: "20px",
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

      <Card
        className="p-4 shadow-lg rounded-4 w-100"
        style={{
          maxWidth: "900px",
          border: "none",
          backgroundColor: "#ffffffd9",
        }}
      >
        <Container>
          <h3 className="mb-4 text-center fw-bold">Surgery Booking</h3>
          <Form onSubmit={handleNext}>
            {/* Registration Datetime */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="3">
                Registration Datetime
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="datetime-local"
                  name="registrationDatetime"
                  value={formData.registrationDatetime}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>

            {/* OT In Datetime */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="3">
                OT In Datetime
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="datetime-local"
                  name="otDatetime"
                  value={formData.otDatetime}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>

            {/* Surgery Date */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="3">
                Surgery Date
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="date"
                  name="surgeryDate"
                  value={formData.surgeryDate}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>

            {/* Surgery Place */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="3">
                Surgery Place
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  name="surgeryPlace"
                  value={formData.surgeryPlace}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>

            {/* Operated Eye (Radio Buttons) */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="3">
                Operated Eye
              </Form.Label>
              <Col sm="9">
                <Form.Check
                  type="radio"
                  label="Right"
                  name="operatedEye"
                  value="Right"
                  checked={formData.operatedEye === "Right"}
                  onChange={handleChange}
                  inline
                />
                <Form.Check
                  type="radio"
                  label="Left"
                  name="operatedEye"
                  value="Left"
                  checked={formData.operatedEye === "Left"}
                  onChange={handleChange}
                  inline
                />
              </Col>
            </Form.Group>

            {/* Procedure Name */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="3">
                Procedure Name
              </Form.Label>
              <Col sm="9">
                <Form.Select
                  name="procedureName"
                  value={formData.procedureName}
                  onChange={handleChange}
                >
                  <option value="">Select Procedure</option>
                  <option value="LEFT EYE SICS WITH SURGICAL APHAKIA">
                    LEFT EYE SICS WITH SURGICAL APHAKIA
                  </option>
                  <option value="LEFT EYE SICS WITH ACIOL IMPLANTATION">
                    LEFT EYE SICS WITH ACIOL IMPLANTATION
                  </option>
                  <option value="LEFT EYE SICS WITH IRISCLAW LENS">
                    LEFT EYE SICS WITH IRISCLAW LENS
                  </option>
                  <option value="LEFT EYE SICS WITH PCIOL IMPLANTATION">
                    LEFT EYE SICS WITH PCIOL IMPLANTATION
                  </option>
                  <option value="LEFT EYE SICS WITH ACIOL">
                    LEFT EYE SICS WITH ACIOL
                  </option>
                  <option value="LEFT EYE SICS WITH ANTERIOR VIRECTOMY">
                    LEFT EYE SICS WITH ANTERIOR VIRECTOMY
                  </option>
                  <option value="LEFT EYE SICS WITH IRIS CLAW IOL">
                    LEFT EYE SICS WITH IRIS CLAW IOL
                  </option>
                  <option value="LEFT EYE SICS WITH PCIOL">
                    LEFT EYE SICS WITH PCIOL
                  </option>
                  <option value="RIGHT EYE SICS WITH SURGICAL APHAKIA">
                    RIGHT EYE SICS WITH SURGICAL APHAKIA
                  </option>
                  <option value="RIGHT EYE SICS WITH ACIOL IMPLANTATION">
                    RIGHT EYE SICS WITH ACIOL IMPLANTATION
                  </option>
                  <option value="RIGHT EYE SICS WITH IRISCLAW LENS">
                    RIGHT EYE SICS WITH IRISCLAW LENS
                  </option>
                  <option value="RIGHT EYE SICS WITH PCIOL IMPLANTATION">
                    RIGHT EYE SICS WITH PCIOL IMPLANTATION
                  </option>
                  <option value="RIGHT EYE CATARACT EXTRACTION">
                    RIGHT EYE CATARACT EXTRACTION
                  </option>
                  <option value="RIGHT EYE SICS WITH ACIOL">
                    RIGHT EYE SICS WITH ACIOL
                  </option>
                  <option value="RIGHT EYE SICS WITH ANTERIOR VITRECTOMY">
                    RIGHT EYE SICS WITH ANTERIOR VITRECTOMY
                  </option>
                  <option value="RIGHT EYE SICS WITH IRIS CLAW IOL">
                    RIGHT EYE SICS WITH IRIS CLAW IOL
                  </option>
                  <option value="RIGHT EYE SICS WITH PCIOL">
                    RIGHT EYE SICS WITH PCIOL
                  </option>
                  <option value="SICS ONLY">SICS ONLY</option>
                </Form.Select>
              </Col>
            </Form.Group>

            {/* Surgeon Name */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="3">
                Surgeon Name
              </Form.Label>
              <Col sm="9">
                <Form.Select
                  name="surgeonName"
                  value={formData.surgeonName}
                  onChange={handleChange}
                >
                  <option value="">Select Surgeon</option>
                  <option value="Dr Arun Kumar">Dr Arun Kumar</option>
                  <option value="Dr Ashwini">Dr Ashwini</option>
                  <option value="Dr Balakrishnan">Dr Balakrishnan</option>
                  <option value="Dr Elakkiya">Dr Elakkiya</option>
                  <option value="Dr Gangadhar">Dr Gangadhar</option>
                  <option value="Dr Gangadharan">Dr Gangadharan</option>
                  <option value="Dr Kauser Parveen">Dr Kauser Parveen</option>
                  <option value="Dr Malarchelvi">Dr Malarchelvi</option>
                  <option value="Dr Manish">Dr Manish</option>
                  <option value="Dr Nivas">Dr Nivas</option>
                  <option value="Dr Padmaja">Dr Padmaja</option>
                  <option value="Dr Padmaja*">Dr Padmaja*</option>
                  <option value="Dr Padmapriya">Dr Padmapriya</option>
                  <option value="Dr Pavan">Dr Pavan</option>
                  <option value="Dr Prem Anand">Dr Prem Anand</option>
                  <option value="Dr Premanand">Dr Premanand</option>
                  <option value="Dr Priya">Dr Priya</option>
                  <option value="Dr Pushpa">Dr Pushpa</option>
                  <option value="Dr R. Santhanalakshmi">
                    Dr R. Santhanalakshmi
                  </option>
                  <option value="Dr Rajesh Kannan">Dr Rajesh Kannan</option>
                  <option value="Dr Ranganathan">Dr Ranganathan</option>
                  <option value="Dr Rathnakumar">Dr Rathnakumar</option>
                  <option value="Dr Rekha Sankar">Dr Rekha Sankar</option>
                  <option value="Dr Senthil Kumar">Dr Senthil Kumar</option>
                  <option value="Dr Shankar">Dr Shankar</option>
                  <option value="Dr Shankar (Chettinad)">
                    Dr Shankar (Chettinad)
                  </option>
                  <option value="Dr Shiva Ranjini">Dr Shiva Ranjini</option>
                  <option value="Dr Shivakumar">Dr Shivakumar</option>
                  <option value="Dr Shivakumar*">Dr Shivakumar*</option>
                  <option value="Dr Sree Lakshmi">Dr Sree Lakshmi</option>
                  <option value="Dr Srinivasan">Dr Srinivasan</option>
                  <option value="Dr Srividya">Dr Srividya</option>
                  <option value="Dr Subasree">Dr Subasree</option>
                  <option value="Dr Venkatesan Chellappa">
                    Dr Venkatesan Chellappa
                  </option>
                </Form.Select>
              </Col>
            </Form.Group>

            {/* Submit Button */}
            <Button
              type="submit"
              className="mt-3 w-100 btn-danger rounded-3 p-2 fw-semibold text-white"
            >
              Next
            </Button>

            <Button
              onClick={handleBack}
              className="mt-3 w-100 btn-secondary rounded-3 p-2 fw-semibold shadow-sm"
            >
              Back
                      </Button>
                      
          </Form>
        </Container>
      </Card>
    </div>
  );
};

export default Surgery;
