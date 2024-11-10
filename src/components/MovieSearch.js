import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';
import { useNavigate } from 'react-router-dom';


const OMDB_API_KEY = process.env.REACT_APP_OMDB_API_KEY;

const MovieSearch = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  // Load default movies on component mount
  useEffect(() => {
    const fetchDefaultMovies = async () => {
      try {
        const response = await axios.get(`https://www.omdbapi.com/`, {
          params: {
            s: 'Harry Potter', // Default search term
            apikey: OMDB_API_KEY,
          },
        });
        setMovies(response.data.Search || []);
      } catch (error) {
        console.error('Error fetching default movies:', error);
      }
    };

    fetchDefaultMovies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;

    try {
      const response = await axios.get(`https://www.omdbapi.com/`, {
        params: {
          s: query,
          apikey: OMDB_API_KEY,
        },
      });
      setMovies(response.data.Search || []);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const handleMovieClick = (imdbID) => {
    navigate(`/movie/${imdbID}`);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center movie-search-heading my-3">FilmFolio</h1>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="search-bar-container my-5">
        <input
          type="text"
          className="search-input"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="search-button">Search</button>
      </form>

      {/* Movie Results */}
      <div className="row">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="col-md-3" onClick={() => handleMovieClick(movie.imdbID)}>
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieSearch;
