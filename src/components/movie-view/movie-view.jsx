import { Button, Card, Row, Col } from "react-bootstrap";

export const MovieView = ({ movie, onBackClick }) => {
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
      <Button onClick={onBackClick}> Back </Button>
    </Row>
  );
};
