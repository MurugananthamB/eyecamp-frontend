import React, { useState } from "react";
import {
  Container,
  Form,
  Button,
  Card,
  Alert,
  Row,
  Col,
  InputGroup,
} from "react-bootstrap";
import { FaUser, FaIdBadge, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import api from "../api";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    employeeId: "",
    password: "",
    passwordConfirmation: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, employeeId, password, passwordConfirmation } = formData;

    if (!firstName || !employeeId || !password || !passwordConfirmation) {
      setError("All fields are required.");
      return;
    }
    if (password !== passwordConfirmation) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await api.post("/api/users/register", {
        firstName,
        employeeId,
        password,
      });
      console.log("Response:", response.data);

      setSuccess(true);
      setError(null);
    } catch (err) {
      console.error("Error:", err.response ? err.response.data : err.message);

      let errorMessage = "An error occurred while submitting the form.";
      if (err.response) {
        errorMessage = err.response.data.message || err.message;
      } else if (err.request) {
        errorMessage =
          "No response from the server. Please check your network connection.";
      } else {
        errorMessage =
          err.message || "Something went wrong. Please try again later.";
      }

      setError(errorMessage);
      setSuccess(false);
    }
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
      <Container>
        <Row className="justify-content-center">
          <Col md={7} lg={6}>
            <Card
              className="p-4 shadow-lg rounded-4"
              style={{ maxWidth: "500px", margin: "auto" }}
            >
              <h2 className="text-center text-danger mb-4">
                Create an Account
              </h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <FaUser />
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      name="firstName"
                      placeholder="Enter your name"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      style={{ height: "45px", paddingLeft: "10px" }}
                    />
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Employee ID</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <FaIdBadge />
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      name="employeeId"
                      placeholder="Enter your Employee ID"
                      value={formData.employeeId}
                      onChange={handleChange}
                      required
                      style={{ height: "45px", paddingLeft: "10px" }}
                    />
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <FaLock />
                    </InputGroup.Text>
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      style={{ height: "45px", paddingLeft: "10px" }}
                    />
                    <InputGroup.Text
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ cursor: "pointer" }}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </InputGroup.Text>
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <FaLock />
                    </InputGroup.Text>
                    <Form.Control
                      type={showConfirmPassword ? "text" : "password"}
                      name="passwordConfirmation"
                      placeholder="Confirm your password"
                      value={formData.passwordConfirmation}
                      onChange={handleChange}
                      required
                      style={{ height: "45px", paddingLeft: "10px" }}
                    />
                    <InputGroup.Text
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      style={{ cursor: "pointer" }}
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </InputGroup.Text>
                  </InputGroup>
                </Form.Group>

                <Button
                  variant="danger"
                  type="submit"
                  className="w-100"
                  style={{
                    fontWeight: "bold",
                    background: "#ff5e62",
                    border: "none",
                    padding: "12px",
                    fontSize: "16px",
                    transition: "0.3s",
                  }}
                  onMouseOver={(e) => (e.target.style.background = "#e04a50")}
                  onMouseOut={(e) => (e.target.style.background = "#ff5e62")}
                >
                  Signup
                </Button>
              </Form>

              {success && (
                <Alert variant="success" className="mt-3 text-center">
                  Signup successful! You can now <a href="/login">Login</a>.
                </Alert>
              )}
              {error && (
                <Alert variant="danger" className="mt-3 text-center">
                  {error}
                </Alert>
              )}

              <p className="text-center mt-3">
                Already have an account?{" "}
                <a href="/login" className="text-danger">
                  Login here
                </a>
              </p>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;
