import React from 'react'

class SingleMovie extends React.Component {
  state = { movie: { Title: "Loading..."} }

  fetchMovie = () => {
    fetch(`/api/movies/${this.props.match.params.id}`)
      .then(response => response.json())
      .then(movie => this.setState({ movie }))
  }

  render(){
    return(
      <div className="single-movie">
        <h1>{this.state.movie.Title}</h1>
        <div className="movie-data">
          <img src={this.state.movie.Poster} alt={this.state.movie.Title}/>
          <table>
            <tbody>
              {
                ["Year", "Rated", "Released", "Runtime", "Genre",
                "Director", "Writer", "Actors", "Plot", "Language",
                "Country"].map(dataPoint => (
                  <tr key={dataPoint}>
                    <td>{dataPoint}</td>
                    <td>{this.state.movie[dataPoint]}</td>
                  </tr>
                ))
              }
              <tr>
                <td>Rating</td>
                <td>{this.state.movie.Metascore}/100</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    )
  }

  componentDidMount(){
    this.fetchMovie()
  }
}



export default SingleMovie
