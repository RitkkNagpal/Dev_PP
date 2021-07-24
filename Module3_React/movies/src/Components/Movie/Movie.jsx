import React, { Component } from "react";
import { API_KEY, API_URL, IMG_URL } from "../../API/secrets";
import "./Movie.css";
import { Link } from "react-router-dom";
import axios from "axios";

class Movies extends Component {
  state = {
    detailedMovieObj: {},
  };

  async componentDidMount() {
    // get detailed movie object
    let response = await axios.get(
      // call by id
      `${API_URL}/movie/${this.props.movie.id}?api_key=${API_KEY}`
    );

    // let detailedMovieObject = responseData;

    let posterPath = IMG_URL + response.data.poster_path;
 
    this.setState({
      detailedMovieObj: {...response.data, poster_path : posterPath},
    });
  }

  render() {
    let { title, poster_path, vote_average } = this.props.movie;
    let posterPath = IMG_URL + poster_path;
    return (
      <div className="movie-item">
        <div className="movie-poster">
          <Link
            to={{ pathname: "/moviePage", state: this.state.detailedMovieObj }}
          >
            <img src={posterPath} alt="" />
          </Link>
        </div>
        <div className="movie-info">
          <div className="movie-title">{title}</div>
          <div className="movie-rating">IMDB {vote_average}</div>
        </div>
      </div>
    );
  }
}

export default Movies;
