import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Form, Container, Row, Col } from "react-bootstrap";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5050/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token); // Store token from server
        navigate("/home"); // Redirect to home page after successful login
      } else {
        showAlertMessage("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      showAlertMessage("An error occurred during login.");
    }
  };

  const showAlertMessage = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };

  return (
    <Container fluid="md" className="d-flex align-items-center justify-content-center min-vh-100">
      <Row className="w-100">
        <Col className="text-center">
          <h1 className="font-weight-bold">LOGIN</h1>
          <p className="text-muted">This information will not be displayed publicly.</p>

          {showAlert && (
            <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible className="mt-3">
              <div className="d-flex justify-content-between">
                <span>{alertMessage}</span>
              </div>
            </Alert>
          )}

          <Form onSubmit={handleSubmit} className="mt-4">
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label><strong>Email</strong></Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formPassword">
              <Form.Label><strong>Password</strong></Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;