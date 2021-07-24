import axios from "axios";
import React, { Component } from "react";
import { API_KEY, API_URL } from "../../API/secrets";
import "./MoviePage.css";
import YouTube from "react-youtube";

class MoviePage extends Component {
  state = {
      videoObject :{}
  };

  async componentDidMount() {
    // https://api.themoviedb.org/3/movie/791373/videos?api_key=79c3c18afb821ec5f4942ef5a4a44f40&language=en-US
    let response = await axios.get(
      `${API_URL}/movie/${this.props.location.state.id}/videos?api_key=${API_KEY}&language=en-US`
    );
    console.log(response);
    
    let videoObject = response.data.results.filter(videoObject =>{
        if(videoObject.site == "YouTube" && videoObject.type == "Trailer"){
            return true;
        }
        return false;
    });
    if(videoObject.length){
      this.setState({
          videoObject : videoObject[0]
      })
    }
  }
  render() {
    const opts = {
      height:"100%",
      width: "100%",
      playerVars: {
        autoplay: 0,
      },
    };
  
    let { title, tagline, poster_path, vote_average, overview } =
      this.props.location.state;
    return (
      <div className="movie-page">
        <div className="movie-page-poster">
          <img src={poster_path} />
        </div>
        
        <div className="movie-page-details">
            <div className="movie-title-info">
                <h1>{title} </h1>
                <span className ="imdb-rating">IMDB {vote_average}</span>
                <br/>
                <span className = "tagline">{tagline}</span>
                <br/><br/>
                <p>{overview}</p>
            </div>

            <div className="trailer">
                <YouTube videoId={this.state.videoObject.key} opts={opts}></YouTube>
            </div>
        </div>

      </div>
    );
  }
}

export default MoviePage;
