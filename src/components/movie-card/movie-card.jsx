import PropTypes from "prop-types";
import { Button, Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
  return (
    <Card className="h-100">
      <Card.Img variant="top" src={movie.Image} />
      <Card.Body>
        <Card.Title><span className="Title">{movie.Title}</span></Card.Title>
        <Card.Text>{movie.Description}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip id="tooltip">View More Info</Tooltip>}
          >
            <Button>More</Button>
          </OverlayTrigger>
        </Link>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
    Image: PropTypes.string,
    Director: PropTypes.object,
    Genre: PropTypes.object
  }).isRequired,
};