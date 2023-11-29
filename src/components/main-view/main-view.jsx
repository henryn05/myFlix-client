import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  console.log("Rendered1")
  const [movies, setMovies] = useState ([
    {
      _id: "655128181c4ee4acdf92e2c7",
      Title: 'Jurassic Park',
      Description: 'Adventure in a dinosaur theme park',
      ReleaseYear: 1993,
      Genre: {
        Name: 'Adventure',
        Description: 'Exciting journeys and experiences in unknown or dangerous places.'
      },
      Director: {
        Name: 'Steven Spielberg',
        Bio: "Prolific American filmmaker known for his wide range of successful films, including E.T., Jurassic Park, and Schindler's List.",
        Birthdate: '1946-12-18'
      },
      Image: 'jurassic_park.jpg'
    },
    {
      _id: "655128181c4ee4acdf92e2c8",
      Title: 'Blade Runner 2049',
      Description: 'Sci-fi film set in a dystopian future',
      ReleaseYear: 2017,
      Genre: {
        Name: 'Science Fiction',
        Description: 'Speculative fiction based on imaginative and futuristic scientific and technological advances.'
      },
      Director: {
        Name: 'Denis Villeneuve',
        Bio: 'Canadian filmmaker known for visually stunning and thought-provoking films like Blade Runner 2049 and Arrival.',
        Birthdate: '1967-10-03'
      },
      Image: 'blade_runner_2049.jpg'
    },
    {
      _id: "655128181c4ee4acdf92e2c9",
      Title: 'Pulp Fiction',
      Description: 'Crime and black comedy',
      ReleaseYear: 1994,
      Genre: {
        Name: 'Adventure',
        Description: 'Exciting journeys and experiences in unknown or dangerous places.'
      },
      Director: {
        Name: 'Quentin Tarantino',
        Bio: 'Iconic American director celebrated for his unique storytelling style and bold, genre-defying films like Pulp Fiction and Kill Bill.',
        Birthdate: '1963-03-27'
      },
      Image: 'pulp_fiction.jpg'
    },
    {
      _id: "655128181c4ee4acdf92e2ca",
      Title: 'Inception',
      Description: 'Mind-bending heist thriller',
      ReleaseYear: 2010,
      Genre: {
        Name: 'Science Fiction',
        Description: 'Speculative fiction based on imaginative and futuristic scientific and technological advances.'
      },
      Director: {
        Name: 'Christopher Nolan',
        Bio: 'British director acclaimed for mind-bending narratives and visually groundbreaking films such as Inception and The Dark Knight trilogy.',
        Birthdate: '1970-07-30'
      },
      Image: 'inception.jpg'
    },
    {
      _id: "655128181c4ee4acdf92e2cb",
      Title: 'Goodfellas',
      Description: 'A gripping crime drama based on real-life events.',
      ReleaseYear: 1990,
      Genre: {
        Name: 'Crime',
        Description: 'Involves investigations, mysteries, and criminal activities.'
      },
      Director: {
        Name: 'Martin Scorsese',
        Bio: 'Legendary director recognized for his masterful depictions of crime, morality, and complex characters in films like Goodfellas and The Irishman.',
        Birthdate: '1942-11-17'
      },
      Image: 'goodfellas.jpg'
    },
    {
      _id: "655128181c4ee4acdf92e2cc",
      Title: 'E.T. the Extra-Terrestrial',
      Description: 'A boy befriends an alien',
      ReleaseYear: 1982,
      Genre: {
        Name: 'Science Fiction',
        Description: 'Speculative fiction based on imaginative and futuristic scientific and technological advances.'
      },
      Director: {
        Name: 'Steven Spielberg',
        Bio: "Prolific American filmmaker known for his wide range of successful films, including E.T., Jurassic Park, and Schindler's List.",
        Birthdate: '1946-12-18'
      },
      Image: 'et.jpg'
    },
    {
      _id: "655128181c4ee4acdf92e2cd",
      Title: 'Django Unchained',
      Description: 'A bounty hunter and a slave seek revenge',
      ReleaseYear: 2012,
      Genre: {
        Name: 'Adventure',
        Description: 'Exciting journeys and experiences in unknown or dangerous places.'
      },
      Director: {
        Name: 'Quentin Tarantino',
        Bio: 'Iconic American director celebrated for his unique storytelling style and bold, genre-defying films like Pulp Fiction and Kill Bill.',
        Birthdate: '1963-03-27'
      },
      Image: 'django_unchained.jpg'
    },
    {
      _id: "655128181c4ee4acdf92e2ce",
      Title: 'The Dark Knight',
      Description: 'Batman battles the Joker',
      ReleaseYear: 2008,
      Genre: {
        Name: 'Adventure',
        Description: 'Exciting journeys and experiences in unknown or dangerous places.'
      },
      Director: {
        Name: 'Christopher Nolan',
        Bio: 'British director acclaimed for mind-bending narratives and visually groundbreaking films such as Inception and The Dark Knight trilogy.',
        Birthdate: '1970-07-30'
      },
      Image: 'dark_knight.jpg'
    },
    {
      _id: "655128181c4ee4acdf92e2cf",
      Title: 'The Departed',
      Description: 'Undercover cops in the Irish mob',
      ReleaseYear: 2006,
      Genre: {
        Name: 'Crime',
        Description: 'Involves investigations, mysteries, and criminal activities.'
      },
      Director: {
        Name: 'Martin Scorsese',
        Bio: 'Legendary director recognized for his masterful depictions of crime, morality, and complex characters in films like Goodfellas and The Irishman.',
        Birthdate: '1942-11-17'
      },
      Image: 'the_departed.jpg'
    },
    {
      _id: "655128181c4ee4acdf92e2d0",
      Title: 'Sicario',
      Description: 'A gritty drug war thriller.',
      ReleaseYear: 2015,
      Genre: {
        Name: 'Crime',
        Description: 'Involves investigations, mysteries, and criminal activities.'
      },
      Director: {
        Name: 'Denis Villeneuve',
        Bio: 'Canadian filmmaker known for visually stunning and thought-provoking films like Blade Runner 2049 and Arrival.',
        Birthdate: '1967-10-03'
      },
      Image: 'sicario.jpg'
    }
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    console.log("Rendered2");
    return <MovieView movie={selectedMovie}
      onBackClick={() => setSelectedMovie(null)} />;
  };

  if (movies.length === 0) {
    console.log("Rendered3");
    return <div>Your movie list is empty!</div>
  };

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie._id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );

};
