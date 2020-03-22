import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import VideoModal from '../../common/videoModal'
import { convertDate } from '../../helper'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CDN = process.env.REACT_APP_CDN;
const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = process.env.REACT_APP_API_URL;
class MovieDetails extends React.Component {
   state = {
      toggleVideoModal: false,
      productionCompanies: [],
      genres: [],
      productionCountries: [],
      movieLanguages: [],
      videoSrc: [],
      imageList: [],
      banner: '',
      ratings: 0.0,
      movieTitle: '',
      movieDescription: '',
      duration: '',
      releaseDate: ''
   }

   componentDidMount() {
      window.scrollTo(0, 0);
      this.fetchMovieDetail()
   }

   fetchMovieDetail = async () => {
      const { movie_id } = this.props.match.params;
      const response = await axios.get(`${API_URL}movie/${movie_id}`,
         {
            params: {
               api_key: API_KEY,
               page: 1,
               append_to_response: 'videos,images'
            }
         });
      const movieDetail = response.data
      this.setState({
         productionCompanies: [...movieDetail.production_companies],
         genres: [...movieDetail.genres],
         productionCountries: [...movieDetail.production_countries],
         movieLanguages: [...movieDetail.spoken_languages],
         videoSrc: movieDetail.videos.results[0].key,
         banner: movieDetail.backdrop_path,
         ratings: movieDetail.vote_average,
         movieTitle: movieDetail.original_title,
         movieDescription: movieDetail.overview,
         duration: movieDetail.runtime,
         releaseDate: movieDetail.release_date,
         imageList: [...movieDetail.images.backdrops]
      })

      console.log('this.state.videoSrc', this.state.videoSrc[0].key)
   }

   handleToggleVideoModal = () => {
      this.setState({
         toggleVideoModal: !this.state.toggleVideoModal
      })
   }

   render() {
      const {
         toggleVideoModal,
         productionCompanies,
         productionCountries,
         movieLanguages,
         videoSrc,
         imageList,
         genres,
         banner,
         ratings,
         movieTitle,
         movieDescription,
         duration,
         releaseDate
      } = this.state
      return (
         <div className="main-content-holder movie-details-holder">
            <div className="banner-holder">
               <img src={`${CDN}original${banner}`} alt="banner" className="banner-img" />
               <div className="banner-movie-info-section">
                  <Container className="banner-movie-info-content">
                     <Row className="banner-movie-info-rating-section">
                        <Col sm={6} md={5} className="banner-movie-info">
                           <div className="banner-movie-companies">
                              {productionCompanies.slice(0, 2).map((company, index) => (
                                 <p className="mb-0" key={index}>{company.name}</p>
                              ))}
                           </div>
                           <div className="banner-movie-duration-genre">
                              <p className="banner-movie-duration mb-0">{duration}min</p>
                              {genres.slice(0, 2).map((genre, index) => (
                                 <span className="banner-movie-genre mb-0 mr-2 has-comma" key={index}>{genre.name}</span>
                              ))}
                           </div>
                        </Col>
                        <Col sm={6} className="banner-movie-rating">
                           {ratings}
                        </Col>
                     </Row>
                     <Row className="banner-movie-title-trailer-section">
                        <Col sm={12} md={9} className="banner-movie-title">
                           <div>{movieTitle}</div>
                        </Col>
                        <Col sm={12} md={3} className="banner-movie-title-btn" >
                           <div className="trailer-btn" onClick={this.handleToggleVideoModal}>
                              <FontAwesomeIcon icon="play" />
                           </div>
                        </Col>
                     </Row>
                  </Container>
               </div>
            </div>
            <Container>
               <Row className="movie-details-overview-holder justify-content-between">
                  <Col sm={12} md={4} className="movie-details-holder mb-4">
                     <div className="movie-details-content">
                        <p className="sub-header">Details</p>
                        <div className="movie-details-section">
                           <div className="movie-details-content movie-country">
                              <div className="details-content-title">country</div>
                              <div className="details-content-data">
                                 {productionCountries.map((country, index) => (
                                    <span className="mr-1 has-coma" key={index}>{country.iso_3166_1}</span>
                                 ))}
                              </div>
                           </div>
                           <div className="movie-details-content">
                              <div className="details-content-title">Language</div>
                              <div className="details-content-data">
                                 {movieLanguages.map((language, index) => (
                                    <span className="mr-1" key={index} >{language.iso_639_1},</span>
                                 ))}
                              </div>
                           </div>
                           <div className="movie-details-content">
                              <div className="details-content-title">release date</div>
                              <div className="details-content-data">
                                 {
                                    convertDate(releaseDate, "DD MMMM YYYY")
                                 }
                              </div>
                           </div>
                        </div>
                     </div>
                  </Col>
                  <Col sm={12} md={7} className="movie-overview-holder mb-4">
                     <div className="movie-overview-content-holder">
                        <p className="sub-header">overview</p>
                        <div className="movie-overview-section">
                           <div className="movie-overview-content movie-overview">
                              {movieDescription}
                           </div>
                           <div className="movie-overview-content movie-genre">
                              {genres.map((genre, index) => (
                                 <p key={index} className="list-items">{genre.name}</p>
                              ))}

                           </div>
                        </div>
                     </div>
                  </Col>
               </Row>
               <Row className="movie-company-trailer-holder">
                  <Col sm={12} md={4}>
                     <div className="movie-company-list">
                        <p className="sub-header">production Companies</p>
                        {productionCompanies.map((company, index) => (
                           <div className="movie-company list-items" key={index}>
                              <p className="mb-0">{company.name}</p>
                           </div>
                        ))}
                     </div>
                     <div className="movie-image-holder">
                        <p className="sub-header">Photo Gallery</p>
                        <div className="movie-image-list">
                           {imageList.slice(0, 6).map((image, index) => (
                              <div className="movie-image w-50" key={index}>
                                 <img src={`${CDN}w300${image.file_path}`} alt="" />
                              </div>
                           ))}

                        </div>
                     </div>
                  </Col>
                  <Col sm={12} md={8}>
                     {console.log(videoSrc, "{`https://www.youtube.com/embed/${videoSrc}`}")}
                     <iframe width="100%" height="345" src={`https://www.youtube.com/embed/${videoSrc}`}>
                     </iframe>
                  </Col>
               </Row>
            </Container>
            <VideoModal
               toggleVideoModal={toggleVideoModal}
               handleToggleVideoModal={this.handleToggleVideoModal}
               videoSrc={videoSrc}
            />
         </div>
      )
   }
}

export default MovieDetails;