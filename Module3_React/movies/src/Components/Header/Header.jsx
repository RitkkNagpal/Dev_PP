import React, { Component } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
class Header extends Component {
  state = {
    movieSearch: "",
  };

  handleOnChange = (e) => {
    let newMovieName = e.target.value;
    this.setState({
      movieSearch: newMovieName,
    });
  };

  handleOnKeyPress = (e) => {
    let setMovies = this.props.setMovies;
    if (e.key == "Enter") {
      setMovies(this.state.movieSearch);
    }
  };
  render() {
    return (
      <div className="header">
        <div className="logo">
          <img src="NetflixLogo.svg" alt="" />
        </div>
        <div className="search-btn">
          <input
            className="search-movies"
            value={this.state.movieSearch}
            type="text"
            onChange={this.handleOnChange}
            onKeyPress={this.handleOnKeyPress}
            placeholder="Search"
          />
        </div>
        <div className="header-links">
          <div className="header-link">
            <Link to="/">Home</Link>
          </div>

          <div className="header-link">
            <Link to="/fav">Favourites</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
