import React, { useContext } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FormContext } from "./formContext"; // Import FormContext
import { FaRedo, FaSignOutAlt } from "react-icons/fa";

const Dashboard = () => {
  const { formData, setFormData } = useContext(FormContext); // Access form state
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = (e) => {
    e.preventDefault();
    navigate("/surgery");
  };

    const handleLogout = () => {
      setFormData({}); // Clear form data
      localStorage.clear(); // Clear all items in localStorage
      navigate("/login"); // Redirect to the login page (or any other page)
  };

const handleReprint = () => {
  navigate("/reprintCard"); // Navigate to reprint card page
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
            <h2 className="text-center text-dark mb-4 fw-bold">
              Patient Registration
            </h2>
            <Form onSubmit={handleNext}>
              <Row className="mb-3">
                <Col md={2}>
                  <Form.Group>
                    <Form.Label className="fw-semibold text-dark">
                      Title
                    </Form.Label>
                    <Form.Select
                      name="title"
                      value={formData.title || ""}
                      onChange={handleChange}
                    >
                      <option value="">Select</option>
                      <option value="Mr">Mr</option>
                      <option value="Mrs">Mrs</option>
                      <option value="Master">Master</option>
                      <option value="Selvan">Selvan</option>
                      <option value="Selvi">Selvi</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fw-semibold text-dark">
                      Patient Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="patientName"
                      placeholder="Enter Patient Name"
                      value={formData.patientName || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label className="fw-semibold text-dark">
                      Patient Mobile
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="mobile"
                      placeholder="Enter Patient Mobile"
                      value={formData.mobile || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fw-semibold text-dark">
                      F/O or C/O
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="fatherOrCO"
                      placeholder="F/O or C/O"
                      value={formData.fatherOrCO || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={2}>
                  <Form.Group>
                    <Form.Label className="fw-semibold text-dark">
                      Age
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="age"
                      placeholder="Enter Age"
                      value={formData.age || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label className="fw-semibold text-dark">
                      Gender
                    </Form.Label>
                    <div>
                      <Form.Check
                        inline
                        label="Male"
                        name="gender"
                        type="radio"
                        value="Male"
                        checked={formData.gender === "Male"}
                        onChange={handleChange}
                      />
                      <Form.Check
                        inline
                        label="Female"
                        name="gender"
                        type="radio"
                        value="Female"
                        checked={formData.gender === "Female"}
                        onChange={handleChange}
                      />
                      <Form.Check
                        inline
                        label="Other"
                        name="gender"
                        type="radio"
                        value="Other"
                        checked={formData.gender === "Other"}
                        onChange={handleChange}
                      />
                    </div>
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fw-semibold text-dark">
                      Attender Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="attenderName"
                      placeholder="Enter Attender Name"
                      value={formData.attenderName || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fw-semibold text-dark">
                      Attender Mobile
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="attenderMobile"
                      placeholder="Enter Attender Mobile"
                      value={formData.attenderMobile || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={12}>
                  <Form.Group>
                    <Form.Label className="fw-semibold text-dark">
                      Address
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="address"
                      placeholder="Enter Address"
                      value={formData.address || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fw-semibold text-dark">
                      District
                    </Form.Label>
                    <Form.Control
                      as="select"
                      name="district"
                      value={formData.district || ""}
                      onChange={handleChange}
                    >
                      <option value="">Select District</option>
                      <option value="CHENGALPET">CHENGALPET</option>
                      <option value="KALLAKURICHI">KALLAKURICHI</option>
                      <option value="KANCHEEPURAM">KANCHEEPURAM</option>
                      <option value="RANIPET">RANIPET</option>
                      <option value="THIRUVALLUR">THIRUVALLUR</option>
                      <option value="THIRUVANNAMALAI">THIRUVANNAMALAI</option>
                      <option value="VILLUPURAM">VILLUPURAM</option>
                    </Form.Control>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fw-semibold text-dark">
                      Other District
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="otherDistrict"
                      placeholder="Enter District"
                      value={formData.otherDistrict || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={12}>
                  <Form.Group>
                    <Form.Label className="fw-semibold text-dark">
                      Email
                    </Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Enter Email"
                      value={formData.email || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fw-semibold text-dark">
                      Visual Right
                    </Form.Label>
                    <Form.Select
                      name="visualRight"
                      value={formData.visualRight || ""}
                      onChange={handleChange}
                    >
                      <option value="">Select</option>
                      <option value="NOPL">NOPL</option>
                      <option value="PL+">PL+</option>
                      <option value="HM+">HM+</option>
                      <option value="CFCF">CFCF</option>
                      <option value="1/60">1/60</option>
                      <option value="2/60">2/60</option>
                      <option value="3/60">3/60</option>
                      <option value="4/60">4/60</option>
                      <option value="5/60">5/60</option>
                      <option value="6/60">6/60</option>
                      <option value="6/36">6/36</option>
                      <option value="6/24">6/24</option>
                      <option value="6/18">6/18</option>
                      <option value="6/12">6/12</option>
                      <option value="6/9">6/9</option>
                      <option value="6/6">6/6</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fw-semibold text-dark">
                      Visual Left
                    </Form.Label>
                    <Form.Select
                      name="visualLeft"
                      value={formData.visualLeft || ""}
                      onChange={handleChange}
                    >
                      <option value="">Select</option>
                      <option value="NOPL">NOPL</option>
                      <option value="PL+">PL+</option>
                      <option value="HM+">HM+</option>
                      <option value="CFCF">CFCF</option>
                      <option value="1/60">1/60</option>
                      <option value="2/60">2/60</option>
                      <option value="3/60">3/60</option>
                      <option value="4/60">4/60</option>
                      <option value="5/60">5/60</option>
                      <option value="6/60">6/60</option>
                      <option value="6/36">6/36</option>
                      <option value="6/24">6/24</option>
                      <option value="6/18">6/18</option>
                      <option value="6/12">6/12</option>
                      <option value="6/9">6/9</option>
                      <option value="6/6">6/6</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fw-semibold text-dark">
                      Own Glasses
                    </Form.Label>
                    <div>
                      <Form.Check
                        inline
                        label="Yes"
                        name="ownGlasses"
                        type="radio"
                        value="Yes"
                        checked={formData.ownGlasses === "Yes"}
                        onChange={handleChange}
                      />
                      <Form.Check
                        inline
                        label="No"
                        name="ownGlasses"
                        type="radio"
                        value="No"
                        checked={formData.ownGlasses === "No"}
                        onChange={handleChange}
                      />
                    </div>
                  </Form.Group>
                </Col>
              </Row>

              <Button
                type="submit"
                className="mt-3 w-100 btn-danger rounded-3 p-2 fw-semibold shadow-sm"
              >
                Next
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Dashboard;
