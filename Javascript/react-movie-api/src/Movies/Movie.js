import PropTypes from "prop-types";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export function Movie({ movie, config }) {
  return (
    <li>
      <Link to={`/Movies/${movie.id}`}>
        {config.images?.base_url && (
          <img
            src={config.images.base_url + "w342" + movie.poster_path}
            alt={movie.title + " Poster"}
          />
        )}
        <h3>{movie.title}</h3>
      </Link>
    </li>
  );
}

Movie.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    poster_path: PropTypes.string.isRequired,
  }).isRequired,
};
