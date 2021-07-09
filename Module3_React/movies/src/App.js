import React, { Component } from 'react';
import Movies from './Components/Movies/Movies';
import Header from './Components/Header/Header';
import axios from "axios";
import {API_URL,API_KEY} from "./API/secrets"
class App extends Component{
  state = {
    MoviesData : [],
    currentMovie : "Avenger"
  };

  async componentDidMount(){
    let data = await axios.get(API_URL + "/search/movie",{
      params : {api_key : API_KEY, page : 1, query : this.state.currentMovie}});

    this.setState({
      MoviesData : data.data.results
    })
  }

  render(){
    return <div className="App">
      <Header></Header>
      <Movies moviesData = {this.state.MoviesData}></Movies>
    </div>
  }
}
export default App;