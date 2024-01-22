import React, { useState } from "react";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({ user, setUser, movies, addFavMovie, removeFavMovie }) => {
  const [username, setUsername] = useState(user.Username);
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(user.Birthday);

  const token = localStorage.getItem("token");

  //Update user info
  const handleUpdate = (event) => {
    event.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    const data = {
      Username: username,
      Email: email,
      Birthday: birthday
    };

    fetch(`https://myflix-api-hn05.onrender.com/users/${user.Username}`, {
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
        setUser(updatedUser);
        alert("Successfully updated info");
      } else {
        alert("Failed to update info");
      };
    }).catch(error => {
      console.error(error)
    })
  };

  //Delete user info
  const handleDelete = () => {
    fetch(`https://myflix-api-hn05.onrender.com/users/${user.Username}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      if (response.ok) {
        setUser(null);
        alert("Successfully deleted user");
        localStorage.clear();
        useNavigate("/");
      } else {
        alert("Failed to delete user")
      }
    })
  };

  return (
    <Row>
      <Card className="p-5 mt-5">
        <h1 className="text-center mb-4">Favorite Movies</h1>
        <Row>
          {user.Favorite_movies && user.Favorite_movies.length > 0 ? (
            user.Favorite_movies.map((movieId) => {
              const movie = movies.find((m) => m._id === movieId);
              return (
                <Col key={movie._id} md={6} className="mb-4 profile-view">
                  <MovieCard
                    movie={movie}
                    addFavMovie={addFavMovie}
                    removeFavMovie={removeFavMovie}
                    isFavorite={user.Favorite_movies.includes(movie._id)}
                  />
                </Col>
              );
            })
          ) : (
            <p className="text-center">No favorite movies yet!</p>
          )}
        </Row>
      </Card>
      <Card className="p-5 my-5">
        <h1 className="text-center mb-4">User Info</h1>
        <Form onSubmit={handleUpdate}>
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
          <Row className="justify-content-center">
              <Button
                className="mt-4"
                type="submit"
                onClick={handleUpdate}
              >
                Save Changes
              </Button>
              <Button
                className="mt-4"
                onClick={handleDelete}
              >
                Delete Account
              </Button>
          </Row>
        </Form>
      </Card>
    </Row>
  );
};