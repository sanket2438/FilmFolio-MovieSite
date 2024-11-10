// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MovieSearch from './components/MovieSearch';
import MovieDetails from './components/MovieDetails';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MovieSearch />} />
        <Route path="/movie/:imdbID" element={<MovieDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
