import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import defaultImage from '../../images/default-image-portrait.png';

const CDN = process.env.REACT_APP_CDN;

const MovieContainer = ({
    id,
    moviePoster,
    movieTitle,
    movieUrls,
}) => {
    return (
        <Row className="movie-list">
            <Col sm={12} md={6} className="p-0 single-movie-holder">
                <div className="movie-item">
                    <Link to={`/movieDetails/${id}`}>
                        <img
                            src={moviePoster ? `${CDN}w780${moviePoster}` : defaultImage}
                            className="movie-banner"
                            alt={movieTitle}
                        />
                    </Link>
                </div>
            </Col>
            <Col sm={12} md={6} className="p-0 multiple-movie-holder movie-item">
                {
                    movieUrls.map((movieData, index) => (

                        <div className="movie-item" key={index}>
                            <Link to={`/movieDetails/${movieData.id}`}>
                                <img
                                    src={movieData.poster_path ? `${CDN}w342${movieData.poster_path}` : defaultImage}
                                    className="movie-banner"
                                    alt={movieData.original_title}
                                />
                            </Link>
                        </div>

                    ))
                }
            </Col>
        </Row>)
}

export default MovieContainer;