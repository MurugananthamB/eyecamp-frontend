import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { FaIdBadge, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import api from "../api";

const Login = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!employeeId || !password) {
      setError("Please enter both Employee ID and Password.");
      return;
    }

    try {
      const response = await api.post("api/users/login", {
        employeeId,
        password,
      });

      localStorage.setItem("employeeData", JSON.stringify(response.data));

      setSuccess(true);
      setError(null);

      navigate("/dashboard"); // Redirect to dashboard after login
    } catch (err) {
      console.error("Error:", err.response ? err.response.data : err.message);
      let errorMessage = "An error occurred while logging in.";

      if (err.response) {
        errorMessage = err.response.data.message || err.message;
      } else if (err.request) {
        errorMessage =
          "No response from the server. Please check your network connection.";
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
        padding: "20px",
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={8} lg={5}>
            {" "}
            {/* More balanced width */}
            <Card className="p-4 shadow-lg rounded-4">
              <h2 className="text-center text-danger mb-4">Welcome Back!</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Employee ID</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <FaIdBadge />
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="Enter Employee ID"
                      value={employeeId}
                      onChange={(e) => setEmployeeId(e.target.value)}
                      required
                      style={{ height: "45px", padding: "10px" }}
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
                      placeholder="Enter Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      style={{ height: "45px", padding: "10px" }}
                    />
                    <InputGroup.Text
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ cursor: "pointer" }}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
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
                  Login
                </Button>
              </Form>

              {success && (
                <Alert variant="success" className="mt-3 text-center">
                  Login successful! Redirecting...
                </Alert>
              )}
              {error && (
                <Alert variant="danger" className="mt-3 text-center">
                  {error}
                </Alert>
              )}

              <p className="text-center mt-3">
                Don't have an account?{" "}
                <a href="/register" className="text-danger">
                  Sign up here
                </a>
              </p>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;


