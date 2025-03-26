import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import MovieContext from '../contexts/MovieContext';
import '../css/moviePosterPreview.css';

const MoviePosterPreview = (props) => {
  const globalState = useContext(MovieContext);
  const navigate = useNavigate();
  const handleSelectedMovie = (movie) => {
    globalState.setSelectedMovie(movie);
    navigate('/movie');
  }
  return (
    <div className='moviePostersPreview' onClick={() => handleSelectedMovie(props.movieData)}>
      <div>
        <img src={`http://127.0.0.1:8000/api/${props.movieData.fields.poster}`} alt="imgs" />
      </div>
      <div className={props.movieData.fields.name.length > 20 ? "scrollText" : ""}>
        <span>{props.movieData.fields.name}</span>
        {/* {props.movieData.fields.name.length > 25 && <span>{props.movieData.fields.name}</span>} */}
      </div>
    </div>
  )
}

export default MoviePosterPreview
