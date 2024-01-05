import { Button, Card, Row, Col } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export const MovieView = ({ movies, addFavMovie, removeFavMovie }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m._id === movieId);

  if (!movie) {
    return <div>Movie is loading...</div>
  }

  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  return (
    <Row className="m-3">
      <Col sm={12}>
        <Card className="h-100">
          <Card.Img variant="top" src={movie.Image} />
          <Card.Body>
            <Card.Text>Title: {movie.Title}</Card.Text>
            <Card.Text>Description: {movie.Description}</Card.Text>
            <Card.Text>Release Year: {movie.ReleaseYear}</Card.Text>
            <Card.Text>Genre: {movie.Genre.Name}</Card.Text>
            <Card.Text>Director: {movie.Director.Name}</Card.Text>
          </Card.Body>
          <div className="text-center m-3">
            <Link to={"/"}>
              <Button className="back-button">Back</Button>
            </Link>
            {user.Favorite_movies.includes(movie._id) ? (
              <Button
                className="mx-3"
                onClick={() => removeFavMovie(movie._id)}>
                  Remove from Favorite List
              </Button>
            ) : (
              <Button
                className="mx-3"
                onClick={() => addFavMovie(movie._id)}>
                Add to Favorite List
              </Button>
            )}
          </div>
        </Card>
      </Col>
    </Row>
  );
};
