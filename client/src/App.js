import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import MovieList from './pages/MovieList'
import SingleMovie from './pages/SingleMovie'
import Navbar from './components/Navbar'

const App = () => (
  <BrowserRouter>
    <Navbar/>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/movies" component={MovieList} />
      <Route path="/movies/:id" component={SingleMovie} />
    </Switch>
  </BrowserRouter>
)

export default App
