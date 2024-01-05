import React, { useState } from "react";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const ProfileView = ({ user, setUser, movies, addFavMovie, removeFavMovie }) => {
  const [username, setUsername] = useState(user.Username);
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(user.Birthday);

if (!user) {
  console.error("User is undefined");
} else if (!user.FavoriteMovies) {
  console.error("User's FavoriteMovies is undefined");
} else if (!Array.isArray(movies)) {
  console.error("Movies is not an array");
} else {
  let favoriteMovies = movies.filter((m) => user.Favorite_movies.includes(m._id));
}

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

    fetch(`https://henry-nguyen-myflix-02bc4a1c06a2.herokuapp.com/users/${user.Username}`, {
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
    fetch(`https://henry-nguyen-myflix-02bc4a1c06a2.herokuapp.com/users/${user.Username}`, {
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
      <Card>
        <h2>Favorite Movies:</h2>
        <Row>
          {user.Favorite_movies && user.Favorite_movies.length > 0 ? (
            user.Favorite_movies.map((movieId) => {
              const movie = movies.find((m) => m._id === movieId);
              return (
                <Col key={movie._id} md={3}>
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
            <p>No favorite movies yet!</p>
          )}
        </Row>
      </Card>
      <Card className="p-5 mt-5">
      </Card>
      <Card className="p-5 mt-5">
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
          <Row>
            <Button
              className="mt-4"
              variant="primary"
              type="submit"
              onClick={handleUpdate}
            >
              Save Changes
            </Button>
            <Button
              className="mt-4"
              variant="danger"
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