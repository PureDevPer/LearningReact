import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Movie from './Movie'


class App extends Component {

  // Render: componentWillMount() -> render() -> componentDidMount()

  // update: componentWillReceiveProps() -> shouldComponentUpdate() -> componentWillUpdate() -> 
  //        render() -> component

  state = {
  }

  componentDidMount(){
    //fetch('https://yts.am/api/v2/list_movies.json?sort_by=rating')
    //.then(response => console.log(response))
    //.then(potato => potato.json() )
    //.then(json => console.log(json))
    /*
    .then(json => {
      this.setState({
        movies: json.data.movies
      })
    })
    */
    //.catch(err => console.log(err))
    this._getMovies();
  }

  /*
  componentDidMount(){
    setTimeout(() => {
      this.setState({
        movies: [
          {
            title: "Matrix",
            poster: "https://upload.wikimedia.org/wikipedia/en/0/06/Ultimate_Matrix_Collection_poster.jpg",
          },
          {
            title: "Full Metal Jacket",
            poster: "http://www.gstatic.com/tv/thumb/v22vodart/10114/p10114_v_v8_ab.jpg"
          },
          {
            title: "Oldboy",
            poster: "http://www.gstatic.com/tv/thumb/v22vodart/35948/p35948_v_v8_ab.jpg"
          },
          {
            title: "Star Wars",
            poster: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Star_wars2.svg/440px-Star_wars2.svg.png"
          },
          {
            title: "Transporter",
            poster: "https://upload.wikimedia.org/wikipedia/en/3/30/Transporter_Trilogy_cover.jpg"
          }
        
        ]
      })
    }, 1000)
  }
*/

  _renderMovies = () => {
    const movies = this.state.movies.map((movie, index) => {
      console.log(movie)
      return (
        <Movie 
        title={movie.title_english} 
        poster = {movie.medium_cover_image} 
        key={movie.id} 
        genres={movie.genres} 
        synopsis = {movie.synopsis}
        />
      );
    });
    return movies;
  }


  _getMovies = async () => {
    // After _callApi() runs, this.setState will execute
    const movies = await this._callApi()
    this.setState({
      movies
    })
  }



  _callApi = () => {
    return fetch('https://yts.am/api/v2/list_movies.json?sort_by=download_count')
    .then(potato => potato.json() )
    //.then(json => console.log(json))
    .then(json => json.data.movies)
    .catch(err => console.log(err))
  }

  render() {
    const {movies} = this.state;
    return (
      <div className={movies ? "App" : "App--loading"}>
      
        {this.state.movies ? this._renderMovies() : 'Loading'}
      </div>
    );
  }
}



export default App;
