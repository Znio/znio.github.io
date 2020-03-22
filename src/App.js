import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/style.scss';
import {
  Route,
  BrowserRouter as Router,
  Switch
} from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar, faArrowUp, faArrowDown, faPlay, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Homepage';
import MovieDetails from './components/MovieDetails/';
import MovieListing from './components/MovieListing';

library.add(faStar, faArrowUp, faArrowDown, faPlay, faChevronRight)
function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact={true} path="/MovieDetails/:movie_id" component={MovieDetails} />
        <Route exact path="/" component={Home} />
        <Route exact={true} path="/MovieListing/:movieName" component={MovieListing} />
        <Route exact={true} path="/MovieListing/" component={MovieListing} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
