import React, { Component } from 'react';
import Movie from "../Movie/Movie"
class Movies extends Component {
    state = {  }
    render() { 
        return (<React.Fragment>
            {
                this.props.moviesData.map((movieObject)=>{
                    return<Movie key = {movieObject.id} movie = {movieObject}></Movie>
                })
            }
        </React.Fragment>);
    }
}
 
export default Movies;