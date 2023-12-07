import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { onBackClick } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState ([]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch("https://henry-nguyen-myflix-02bc4a1c06a2.herokuapp.com/movies")
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
            _id: movie._id,
            title: movie.Title,
            image: movie.Image,
            description: movie.Description,
            releaseYear: movie.ReleaseYear,
            featured: movie.Featured,
            genre: {
              name: movie.Genre.Name,
              description: movie.Genre.Description
            },
            director: {
              name: movie.Director.Name,
              bio: movie.Director.Bio,
              birthdate: movie.Director.Birthdate
            },
          };
        });
        console.log("Movies from API:", moviesFromApi);
        setMovies(moviesFromApi);
      })
      .catch((error) => {
        console.error('Error fetching movies:', error);
      });
  }, []);

  if (selectedMovie) {
    return <MovieView movie={selectedMovie}
      onBackClick={() => setSelectedMovie(null)} />;
  };

  if (movies.length === 0) {
    return <div>Your movie list is empty!</div>
  };

return (
  <div>
    {movies.map((movie, index) => {
      console.log(`Movie ${index + 1} ID:`, movie._id); // Log the _id for each movie
      return (
        <MovieCard
          key={String(movie._id)}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            console.log('Clicked movie:', newSelectedMovie); // Log the clicked movie
            setSelectedMovie(newSelectedMovie);
          }}
        />
      );
    })}
  </div>
);

};
