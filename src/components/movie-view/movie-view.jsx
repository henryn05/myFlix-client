import { Button, Card, Row, Col } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m.id === movieId);

  if (!movie) {
    return <div>Loading...</div>
  }

  return (
    <Row>
      <Card className="my-3 h-100">
        <Card.Img variant="top" src={movie.Image}/>
        <Card.Text>Title: {movie.Title}</Card.Text>
        <Card.Text>Description: {movie.Description}</Card.Text>
        <Card.Text>Release Year: {movie.ReleaseYear}</Card.Text>
        <Card.Text>Genre: {movie.Genre.Name}</Card.Text>
        <Card.Text>Director: {movie.Director.Name}</Card.Text>
      </Card>
      <Link to={`/`}>
        <Button className="back-button">Back</Button>
      </Link>
    </Row>
  );
};
