import React, { useState, useEffect } from "react";
import { Row, Col, Card, Form, Button } from "react-bootstrap";

export const ProfileView = (user, movies) => {
  const [username, setUsername] = useState(user.Username);
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(user.Birthday);

  if (!Array.isArray(movies)) {
    console.error("Movies is not an array");
  } else {
    let favoriteMovies = movies.filter(m => user.FavoriteMovies.includes(m._id))
  };

  const token = localStorage.getItem('token');

  const handleUpdate = (event) => {
    const data = {
      Username: username,
      Email: email,
      Birthday: birthday
    };

    fetch("https://henry-nguyen-myflix-02bc4a1c06a2.herokuapp.com/users/:username", {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }).then(async (response) => {
      if (response.ok) {
        const updatedUser = await response.json();
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUsername(updatedUser);
        alert("Successfully updated info");
      } else {
        alert("Failed to update info")
      };
    }).catch(error => {
      console.error(error)
    })
  };

  const handleDelete = () => {
    fetch("https://henry-nguyen-myflix-02bc4a1c06a2.herokuapp.com/users/:username", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      if (response.ok) {
        setUsername(null);
        alert("Successfully deleted user")
        localStorage.clear();
        useNavigate("/");
      } else {
        alert("Failed to delete user")
      }
    })
  };

  return (
    <Card className="p-5 mt-5">
      <Form onSubmit={handleUpdate}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username:{user.Username}</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength="5"
              maxLength="25"
            />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
        </Form.Group>
        <Form.Group controlId="formBirthday">
          <Form.Label>Birthday:</Form.Label>
            <Form.Control
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              required
            />
        </Form.Group>
        <Row>
          <Button className="mt-4" variant="primary" type="submit"> Save Changes</Button>
        </Row>
      </Form>
    </Card>
  );
};
