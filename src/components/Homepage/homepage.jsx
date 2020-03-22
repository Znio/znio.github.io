import React from 'react';
import banner from '../../images/banner.jpg';

import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import InfiniteScroll from '../../common/infiniteScroll';
import { Loader } from '../../common/loader';
import MovieContainer from '../../common/MovieContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = process.env.REACT_APP_API_URL;

class Homepage extends React.Component {
    state = {
        movieList: [],
        search: '',
        releaseDate: new Date(),
        showLoader: false
    }

    componentDidMount() {
        this.page = 1;
        this.fetchLatestMovieList();
    }

    fetchLatestMovieList = async () => {
        this.setState({ showLoader: true });

        try {
            const response = await axios.get(`${API_URL}movie/now_playing`,
                {
                    params: {
                        api_key: API_KEY,
                        // 'primary_release_date.lte': new Date(),
                        // sort_by: 'release_date.desc',
                        page: this.page,
                    }
                });
            if (response) {

                const movieList = response.data.results;

                this.setState({
                    movieList: [...this.state.movieList, ...movieList]
                });
                this.setState({ showLoader: false })
            }
        }
        catch (error) {
            this.setState({ showLoader: false })
        }
    }

    inputHandler = event => {
        const key = event.target.name;
        const value = event.target.value;

        this.setState({
            [key]: value
        });
    }

    transformMovieList = (movieData) => {
        const convertedData = [];
        let count = 0;

        while (count < movieData.length) {
            let temp = {};
            temp = { ...movieData[count] };
            count++;
            temp = { ...temp, urls: movieData.slice(count, count + 4) };
            convertedData.push({ ...temp });
            count = count + 4;
        }
        return convertedData;
    }

    scrollHandler = () => {
        this.page++;
        this.fetchLatestMovieList()
    }


    render() {
        const {
            movieList,
            search,
            showLoader
        } = this.state;
        const response = this.transformMovieList([...movieList]);
        return (
            <InfiniteScroll scrollHandler={this.scrollHandler}>
                <div className="main-content-holder homepage-holder">
                    <div className="banner-holder">
                        <img src={banner} alt="banner" className="banner-img" />
                        <Container className="search-holder">
                            <Row className="search-content">
                                <Col sm={12} md={10}>
                                    <Form.Group className="mb-md-0">
                                        <Form.Control
                                            type="text"
                                            name="search"
                                            placeholder="What are you looking for?"
                                            onChange={this.inputHandler}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col sm={12} md={2}>
                                    <Link to={`/MovieListing/${search}`}>
                                        <Button variant="primary" type="button">
                                            Search <FontAwesomeIcon className="icon" icon="chevron-right" />  
                                        </Button>
                                    </Link>
                                </Col>
                            </Row>
                        </Container>
                    </div>

                    <Container className="movie-list-holder">
                        <div className="section-header">
                            <h2>Latest Movies</h2>
                            <p className="see-all">
                                <Link to="/MovieListing/">see all</Link>
                            </p>
                        </div>
                        <div className="movie-list-content">
                            {response.filter(Boolean).map((data, index) => (
                                <MovieContainer
                                    movieData={data}
                                    id = {data.id}
                                    moviePoster = {data.poster_path}
                                    movieTitle = {data.original_title}
                                    movieUrls = {data.urls}
                                    key={index}
                                />
                            )
                            )}
                        </div>
                    </Container>
                </div>
                {
                    showLoader && <Loader />
                }

            </InfiniteScroll>
        )
    }
}

export default Homepage;