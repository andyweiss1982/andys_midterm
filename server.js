if (process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}

const express = require('express')
const axios = require('axios')
const app = express()
const path = require("path")

app.get('/api/movies/search/:searchTerm/:page', (request, response) => {
  const { searchTerm } = request.params

  axios.get(`http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=${searchTerm}&page=${request.params.page}`)
    .then(omdbResponse => {
      const movies = omdbResponse.data.Search || []
      const totalResults = omdbResponse.data.totalResults ? Number(omdbResponse.data.totalResults) : 0
      response.json({ movies, totalResults })
    })
})

app.get(`/api/movies/:id`, (request, response) => {
  const { id } = request.params

  axios.get(`http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&i=${id}`)
    .then(omdbResponse => {
      response.json(omdbResponse.data)
    })
})

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')))
  // Handle React routing, return all requests to React app
  app.get('*', (request, response) => {
    response.sendFile(path.join(__dirname, 'client/build', 'index.html'))
  })
}

const port = process.env.PORT || 8000
app.listen(port, () => console.log(`Server is up on port ${port}`))
