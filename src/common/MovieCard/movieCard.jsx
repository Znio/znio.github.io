import React from 'react';
import { Link } from 'react-router-dom';
import { Col } from 'react-bootstrap';
import defaultImage from '../../images/default-image-portrait.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const CDN = process.env.REACT_APP_CDN;

const MovieCard = ({
    id,
    posterPath,
    movieTitle,
    releaseDate,
    movieRating
}) => (
        <Col
            sm={12}
            md={4}
            lg={3}

            className="movie-holder"
        >
            <Link to={`/movieDetails/${id}`}>
                <div className="movie">
                    <img
                        src={posterPath ? `${CDN}w500${posterPath}` : defaultImage}
                        className="movie-banner"
                        alt={movieTitle}
                    />
                    <div className="movie-content">
                        <div className="movie-title mt-2">
                            {movieTitle}
                        </div>
                        <div className="movie-info mt-2">
                            <div className="movie-release-date">
                                {releaseDate}
                            </div>
                            <div className="movie-ratings">
                                <FontAwesomeIcon icon="star" />{movieRating}
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </Col>
    )
export default MovieCard;