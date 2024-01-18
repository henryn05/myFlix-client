import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";

import { useState, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [movies, setMovies] = useState ([]);

  const [searchInput, setSearchInput] = useState("");
  const [genreSelect, setGenreSelect] = useState("");

  useEffect(() => {
    if (!token) return;

    fetch("https://myflix-hn05.onrender.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((movies) => {
        const filteredMovies = filterMovies(movies);
        setMovies(filteredMovies);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, [token, genreSelect, searchInput]);

  const filterMovies = (movies) => {
    return movies.reduce((filtered, movie) => {
      const matchesGenre = !genreSelect || movie.Genre.Name.toLowerCase() === genreSelect.toLowerCase();
      const matchesSearch = !searchInput || movie.Title.toLowerCase().includes(searchInput.toLowerCase());

      if (matchesGenre && matchesSearch) {
        filtered.push(movie);
      }

      return filtered;
    }, []);
  };

  const addFavMovie = (id) => {
    fetch(`https://myflix-hn05.onrender.com/users/${user.Username}/movies/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        alert("Failed to add movie");
      }
    }).then((user) => {
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        alert("Successfully added movie");
      }
    }).catch(error => {
      console.error(error);
    });
  };

  const removeFavMovie = (id) => {
    fetch(`https://myflix-hn05.onrender.com/users/${user.Username}/movies/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        alert("Failed to remove movie");
      }
    }).then((user) => {
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        alert("Successfully removed movie")
      }
    }).catch(error => {
      console.error(error);
    });
  };

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  const handleGenreSelect = (e) => {
    setGenreSelect(e.target.value);
  };

  return (
    <BrowserRouter>
      <NavigationBar
        movies={movies}
        user={user}
        onLoggedOut={() => {
          setUser(null);
        }}
        handleSearchInput={handleSearchInput}
        handleGenreSelect={handleGenreSelect}
        searchInput={searchInput}
        genreSelect={genreSelect}
      />
      <Row className="d-flex justify-content-center">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={6}>
                    <SignupView/>
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={6}>
                    <LoginView
                      onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                      }}
                    />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <Col md={12}>
                    <ProfileView
                      user={user}
                      setUser={setUser}
                      movies={movies}
                    />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>Your movie list is empty!</Col>
                ) : (
                  <Col md={12}>
                    <MovieView
                      movies={movies}
                      addFavMovie={addFavMovie}
                      removeFavMovie={removeFavMovie}
                      />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <div>Your movie list is empty!</div>
                ) : (
                  <>
                    {movies.map((movie) => (
                      <Col className="mb-4" key={movie._id} md={3}>
                        <MovieCard
                          movie={movie}
                          removeFavMovie={removeFavMovie}
                          addFavMovie={addFavMovie}
                          isFavorite={user.Favorite_movies
                            .includes(movie._id)}
                          />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};