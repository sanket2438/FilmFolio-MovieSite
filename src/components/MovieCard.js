import React from 'react';


const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <img src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300'} alt={movie.Title} />
      <div className="movie-card-body">
        <h5 className="movie-title">{movie.Title}</h5>
        <p className="movie-year">{movie.Year}</p>
      </div>
    </div>
  );
};

export default MovieCard;
