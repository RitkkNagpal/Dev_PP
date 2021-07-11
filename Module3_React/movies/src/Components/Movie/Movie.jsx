import React, { Component } from 'react';
import { IMG_URL } from '../../API/secrets';
import "./Movie.css"

class Movies extends Component {
    state = {  }
    render() { 
        let{ title, poster_path,vote_average} = this.props.movie;
        let posterPath = IMG_URL + poster_path;
        return (<div className =  "movie-item">
            
            <div className = "movie-poster">
                <img src={posterPath} alt="" />
            </div>
            <div className="movie-info">
                <div className = "movie-title">{title}</div>
                <div className = "movie-rating">IMDB {vote_average}</div>
            </div>
        </div>);
    }
}
 
export default Movies;