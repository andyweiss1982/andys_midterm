import React from 'react'
import { Link } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroller'

class MovieList extends React.Component {
  state = {
    movies: [],
    totalResults: 0,
    minYear: '',
    maxYear: '',
    page: 1
  }

  handleSearch = event => {
    if(event.target.value){
      fetch(`/api/movies/search/${event.target.value}/1`)
        .then(response => response.json())
        .then(data => this.setState({ movies: data.movies, totalResults: data.totalResults }))
    }else{
      this.setState({ movies: [], totalResults: 0})
    }
  }

  getMoreResults = () => {
    let { page } = this.state
    page++
    const title = document.getElementById('title').value
    fetch(`/api/movies/search/${title}/${page}`)
      .then(response => response.json())
      .then(data => {
        const movies = [...this.state.movies, ...data.movies]
        this.setState({ movies, page})
      })
  }

  render(){
    return(
      <div className="movie-list">
        <h1>Search for a movie</h1>
        <input
          type="text"
          placeholder="Title"
          autoComplete="off"
          onChange={this.handleSearch}
          id="title"
        />
        <input
          type="number"
          placeholder="Min Year"
          min="1900"
          max={String((new Date()).getFullYear())}
          value={this.state.minYear}
          onChange={ e => this.setState({ minYear: e.target.value })}
        />
        <input
          type="number"
          placeholder="Max Year"
          min="1900"
          max={String((new Date()).getFullYear())}
          value={this.state.maxYear}
          onChange={ e => this.setState({ maxYear: e.target.value })}
        />
        <InfiniteScroll
          pageStart={this.state.page}
          loadMore={this.getMoreResults}
          hasMore={this.state.totalResults > this.state.movies.length}
          loader={<div className="loader" key={0}>Loading ...</div>}
          className="results"
        >
          {
            this.state.movies
            .filter(movie => {
              if (this.state.minYear){
                return Number(movie.Year) >= Number(this.state.minYear)
              }else{
                return true
              }
            })
            .filter(movie => {
              if(this.state.maxYear){
                return Number(movie.Year) <= Number(this.state.maxYear)
              }else{
                return true
              }
            })
            .map(movie => (
              <Link to={`/movies/${movie.imdbID}`}>
                <div className="movie" key={movie.imdbID}>
                  <h3>{movie.Title} ({movie.Year})</h3>
                  <img src={movie.Poster} alt={movie.Title} />
                </div>
              </Link>
            ))
          }
        </InfiniteScroll>
        <p>Showing {this.state.movies.length} of {this.state.totalResults} movies</p>
      </div>
    )
  }
}
export default MovieList
