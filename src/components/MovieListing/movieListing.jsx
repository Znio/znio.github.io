import React from 'react';
import banner from '../../images/banner.jpg';
import defaultImage from '../../images/default-image-portrait.png';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { debounce } from '../../helper';
// import InfiniteScroll from '../../common/infiniteScroll';
import { Loader } from '../../common/loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MovieCard from '../../common/MovieCard';

const CDN = process.env.REACT_APP_CDN;
const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = process.env.REACT_APP_API_URL;

const SortingList = {
    name: 'name',
    ratings: 'ratings',
    releaseDate: 'releaseDate',
}
class MovieListing extends React.Component {
    constructor(props) {
        super(props);
        this.delayedCallback = debounce(this.fetchSearchMovieList, 720);
        this.page = 1;
    }
    state = {
        movieList: [],
        searchMovieName: '',
        sortBy: 'popularity.asc',
        posterPath: defaultImage,
        movieTitle: '',
        releaseDate: new Date(),
        movieRatings: 0,
        activeSort: '',
        showLoader: false
    }
    componentDidMount() {
        console.log('ovieName');
        const { movieName } = this.props.match.params
        console.log(movieName);

        if (movieName) {
            console.log('movieName', movieName)
            this.fetchSearchMovieList(movieName)
        }
        else
            this.fetchSortedMovieList()
    }

    fetchSearchMovieList = async (movieName) => {
        this.setState({ showLoader: true });
        try {
            const searchResponse = await axios.get(`${API_URL}search/movie`,
                {
                    params: {
                        api_key: API_KEY,
                        query: movieName,
                    }
                }
            );
            if (searchResponse) {
                const movieListResponse = searchResponse.data.results;
                this.setState({
                    movieList: [...movieListResponse]
                });
            }
            this.setState({ showLoader: false });
        }
        catch (error) {
            this.setState({ showLoader: false });
        }
    }

    fetchSortedMovieList = async () => {
        this.setState({ showLoader: true });
        const { releaseDate, sortBy } = this.state
        console.log('fetch', sortBy);
        try {
            const sortResponse = await axios.get(`${API_URL}discover/movie`,
                {
                    params: {
                        api_key: API_KEY,
                        page: this.page,
                        sort_by: sortBy,
                        "primary_release_date.lte": releaseDate
                    }
                }

            );
            if (sortResponse) {
                const movieList = sortResponse.data.results;
                this.setState({
                    movieList: [...movieList]
                });
            }
            this.setState({ showLoader: false });
        }

        catch (error) {
            this.setState({ showLoader: false });
        }
    }

    onSearchInputHandler = event => {
        const key = event.target.name;
        const value = event.target.value;

        // this.delayedCallback(value)

        this.setState({
            [key]: value
        })

        // delayedCallback
    }

    // scrollHandler = () => {
    //     this.page++;
    //     this.fetchSortedMovieList()
    // }

    handleSortBy = async () => {
        const { activeSort, sortBy } = this.state;
        console.log('handleSortBy', activeSort);
        switch (activeSort) {
            case 'name':
                await this.setState({
                    sortBy: sortBy === 'original_title.asc' ? 'original_title.desc' : 'original_title.asc',
                });

                break;

            case 'ratings':
                this.setState({
                    sortBy: sortBy === 'vote_average.asc' ? 'vote_average.desc' : 'vote_average.asc',
                });
                break;

            case 'releaseDate':
                this.setState({
                    sortBy: sortBy === 'primary_release_date.asc' ? 'primary_release_date.desc' : 'primary_release_date.asc',
                });
                break;
        }

        this.fetchSortedMovieList(sortBy)
    }

    setActiveSort = async (sort) => {
        await this.setState({
            activeSort: sort
        })
        this.handleSortBy();
    }

    getActiveClass = (sortBy) => {

        const { activeSort } = this.state;
        console.log(
            'getActiveClass', activeSort
        )
        if (activeSort === sortBy)
            return 'sort-item active'
        else
            return 'sort-item'
    }


    render() {
        const {
            movieList,
            searchMovieName,
            showLoader,
            sortBy
        } = this.state;
        return (
            <div className="main-content-holder homepage-holder">
                <div className="banner-holder">
                    <img src={banner} alt="banner" className="banner-img" />
                    <Container className="search-holder">
                        <Row className="search-content">
                            <Col sm={12} md={10}>
                                <Form.Group className="mb-md-0">
                                    <Form.Control
                                        type="text"
                                        name="searchMovieName"
                                        placeholder="What are you looking for?"
                                        onChange={this.onSearchInputHandler}
                                    />
                                </Form.Group>
                            </Col>
                            <Col sm={12} md={2}>
                                <Link to={`/movieListing/${searchMovieName}`}>
                                    <Button variant="primary" type="submit" onClick={() => this.fetchSearchMovieList(searchMovieName)}>
                                        Search
                                        <FontAwesomeIcon className="icon" icon="chevron-right" />
                                    </Button>
                                </Link>
                            </Col>
                        </Row>
                    </Container>
                </div>

                <Container className="movie-list-holder">
                    <div className="section-header">
                        <h2>Showing {movieList.length} Movies</h2>
                        <p className="see-all" onClick={this.fetchSortedMovieList}>
                            <a>see all</a>
                        </p>
                    </div>
                    <div className="sorting-section mb-5">
                        <div className="mr-md-3 sort-header">Sort By</div>
                        <div className={this.getActiveClass(SortingList.name)} onClick={() => this.setActiveSort(SortingList.name)}>
                            Name <FontAwesomeIcon icon={`${sortBy === 'original_title.asc' ? 'arrow-up' : 'arrow-down'}`} />
                        </div>
                        <div className={this.getActiveClass(SortingList.ratings)} onClick={() => this.setActiveSort(SortingList.ratings)}>
                            Rating <FontAwesomeIcon icon={`${sortBy === 'vote_average.asc' ? 'arrow-up' : 'arrow-down'}`} />
                        </div>
                        <div className={this.getActiveClass(SortingList.releaseDate)} onClick={() => this.setActiveSort(SortingList.releaseDate)}>
                            release date <FontAwesomeIcon icon={`${sortBy === 'primary_release_date.asc' ? 'arrow-up' : 'arrow-down'}`} />
                        </div>
                    </div>

                    <div className="movie-list">
                        <Row>
                            {movieList.filter(Boolean).map((data, index) =>
                                (
                                    <MovieCard
                                        id={data.id}
                                        posterPath={data.poster_path}
                                        movieTitle={data.original_title}
                                        releaseDate={data.release_date}
                                        movieRating={data.vote_average}
                                        key={index}
                                    />
                                )
                            )}
                        </Row>
                    </div>
                </Container>
                {
                    showLoader && <Loader />
                }
            </div>
        )
    }
}

export default MovieListing;