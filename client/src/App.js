import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Switch } from 'react-router-dom';
import {MovieCard, MovieList} from './Movies/MovieCard';


import SavedList from './Movies/SavedList';


export default function App () {
  const [saved, setSaved] = useState([]); // Stretch: the ids of "saved" movies
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const getMovies = () => {
      axios
        .get('http://localhost:5001/api/movies') // Study this endpoint with Postman
        .then(response => {
          // Study this response with a breakpoint or log statements
          // and set the response data as the 'movieList' slice of state
          setMovieList(response.data)
        })
        .catch(error => {
          console.error('Server Error', error);
        });
    }
    getMovies();
  }, []);

  const addToSavedList = id => {
    // This is stretch. Prevent the same movie from being "saved" more than once
      if(saved.includes(movieList[id])){
        alert('Movie already favorited')
      }else{
        let clone = [...saved,movieList[id]]
        setSaved(clone) 
      }
  };

  return (
      <div>
        <SavedList list={saved} />

        <Switch>
          <Route exact path = '/'>
            <MovieList movies = {movieList}/>
          </Route>
          <Route path = '/movies/:id'>
            <MovieCard save = {addToSavedList}/>
          </Route>
        </Switch>
     
      </div>
  );
}
