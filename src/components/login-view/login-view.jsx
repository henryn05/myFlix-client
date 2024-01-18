import { useState } from "react";
import { Button, Form, Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export const LoginView = ({onLoggedIn}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password
    };

    fetch("https://https://myflix-hn05.onrender.com/login", {
      method: "POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedIn(data.user, data.token);
        } else {
          alert("No such user");
        }
      })
      .catch((e) => {
        alert("Error occured");
      });
  };

  return (
    <Card className="p-5 mt-5">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength="5"
            maxLength="25"
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength="5"
            maxLength="25"
          />
        </Form.Group>
        <Row className="d-flex text-center">
          <Button className="mt-4" type="submit"> Login</Button>
          <Link to="/signup" className="mt-4">New User? Create an Account!</Link>
        </Row>
      </Form>
    </Card>
  );
};
