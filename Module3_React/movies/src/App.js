import React, { Component } from "react";
import Movies from "./Components/Movies/Movies";
import Header from "./Components/Header/Header";
import Pagination from "./Components/Pagination/Pagination";
import axios from "axios";
import { API_URL, API_KEY } from "./API/secrets";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MoviePage from "./Components/MoviePage/MoviePage";
import Favourites from "./Components/Favourites/Favourites";

class App extends Component {
  state = {
    MoviesData: [],
    currentMovie: "justice",
    pages: [],
    currentPage: 1,
  };

  async componentDidMount() {
    let data = await axios.get(API_URL + "/search/movie", {
      params: { api_key: API_KEY, page: 1, query: this.state.currentMovie },
    });
    // console.log(data);
    let pageCount = data.data.total_pages;
    let pagesArray = [];

    for (let i = 1; i <= pageCount; i++) {
      pagesArray.push(i);
    }
    this.setState({
      MoviesData: data.data.results,
      pages: pagesArray,
    });
  }

  setMovies = async (newMovieName) => {
    let data = await axios.get(API_URL + "/search/movie", {
      params: { api_key: API_KEY, page: 1, query: newMovieName },
    });
    console.log(data);
    let pageCount = data.data.total_pages;
    let pagesArray = [];

    for (let i = 1; i <= pageCount; i++) {
      pagesArray.push(i);
    }
    this.setState({
      MoviesData: data.data.results,
      currentMovie: newMovieName,
      pages: pagesArray,
      currentPage: 1,
    });
  };

  setPage = async (pageCount) => {
    let data = await axios.get(API_URL + "/search/movie", {
      params: {
        api_key: API_KEY,
        page: pageCount,
        query: this.state.currentMovie,
      },
    });

    this.setState({
      MoviesData: data.data.results,
      currentPage: pageCount,
    });
  };

  nextPage = async () => {
    let data = await axios.get(API_URL + "/search/movie", {
      params: {
        api_key: API_KEY,
        page: this.state.currentPage + 1,
        query: this.state.currentMovie,
      },
    });

    this.setState({
      MoviesData: data.data.results,
      currentPage: this.state.currentPage + 1,
    });
  };

  previousPage = async () => {
    let data = await axios.get(API_URL + "/search/movie", {
      params: {
        api_key: API_KEY,
        page: this.state.currentPage - 1,
        query: this.state.currentMovie,
      },
    });

    this.setState({
      MoviesData: data.data.results,
      currentPage: this.state.currentPage - 1,
    });
  };

  render() {
    return (
      <Router>
        <div className="App">
          <Header setMovies={this.setMovies}></Header>
          <Switch>
            <Route path="/" exact>
              {/* conditonal rendering */}

              {this.state.MoviesData.length ? (
                <React.Fragment>
                  <Movies moviesData={this.state.MoviesData}></Movies>
                  <Pagination
                      pages={this.state.pages}
                      currentPage={this.state.currentPage}
                      nextPage={this.nextPage}
                      previousPage={this.previousPage}
                      setPage={this.setPage}
                  ></Pagination>
                </React.Fragment>
              ) : (
                <h1 style={{ "text-align": "center", "margin-top": "200px" }}>
                  OOPS NO MOVIES FOUND!!!
                </h1>
              )}
            </Route>

            <Route path="/fav" exact>
              <Favourites></Favourites>
            </Route>

            <Route path = "/moviePage" exact component = {MoviePage}></Route>

          </Switch>
        </div>
      </Router>
    );
  }
}
export default App;
