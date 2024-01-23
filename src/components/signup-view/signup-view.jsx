import{ useState } from "react";
import { Button, Form, Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    };

    fetch("https://myflix-api-hn05.onrender.com/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => {
      if (response.ok) {
        alert("Signup successful");
        window.location.reload();
      } else {
        alert("Signup failed");
      }
    });
  };

  return (
    <Card className="p-5 mt-5">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength="5"
              maxLength="25"
              placeholder="Username"
              className="mb-4"
            />
        </Form.Group>
        <Form.Group controlId="formPassword">
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="5"
              maxLength="25"
              placeholder="Password"
              className="mb-4"
            />
        </Form.Group>
        <Form.Group controlId="formEmail">
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email"
              className="mb-4"
            />
        </Form.Group>
        <Form.Group controlId="formBirthday">
            <Form.Control
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              required
            />
        </Form.Group>
        <Row className="text-center">
          <Button className="mt-4" type="submit"> Signup</Button>
          <Link to="/login" className="mt-4">Have an Account? Login!</Link>
        </Row>
      </Form>
    </Card>
  );
};

