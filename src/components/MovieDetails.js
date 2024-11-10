import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';


const OMDB_API_KEY = process.env.REACT_APP_OMDB_API_KEY;

const MovieDetails = () => {
  const { imdbID } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`https://www.omdbapi.com/`, {
          params: {
            i: imdbID,
            apikey: OMDB_API_KEY,
          },
        });
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [imdbID]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="movie-details-container">
      <button className="back-button" onClick={() => navigate(-1)}>Go Back</button>
      
      <div className="movie-details-card">
        <img 
          src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300'} 
          className="movie-details-poster" 
          alt={movie.Title} 
        />
        <div className="movie-details-content">
          <h2 className="movie-details-title">{movie.Title}</h2>
          <p><strong>Year:</strong> {movie.Year}</p>
          <p><strong>Genre:</strong> {movie.Genre}</p>
          <p><strong>Director:</strong> {movie.Director}</p>
          <p><strong>Actors:</strong> {movie.Actors}</p>
          <p><strong>Plot:</strong> {movie.Plot}</p>
          <p><strong>IMDB Rating:</strong> {movie.imdbRating}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
