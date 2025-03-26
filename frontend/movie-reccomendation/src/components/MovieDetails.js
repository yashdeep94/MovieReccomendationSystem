import React, { useEffect, useContext, useState } from 'react';
import '../css/movieDetails.css';
import MovieContext from '../contexts/MovieContext';
import { useNavigate } from 'react-router-dom';

const MovieDetails = () => {
  const globalStates = useContext(MovieContext);
  const [overStar, setOverStar] = useState(false);
  const [starClicked, setStarClicked] = useState(false);
  const [links, setLinks] = useState([]);
  const rating_count = [[0.5, 1], [1.5, 2], [2.5, 3], [3.5, 4], [4.5, 5]];
  const navigate = useNavigate();
  useEffect(() => {
    if (!globalStates.isLogin) {
      navigate('/');
    } else {
      const cookieValue = document.cookie.split("; ").find((row) => row.startsWith("Auth-Token="))?.split("=")[1];
      fetch(`http://127.0.0.1:8000/api/movie/?movieid=${globalStates.selectedMovie.pk}&links=true`, {headers: {
        "Auth-Token": cookieValue,
      },}).then(response => {
        return response.json();
      }).then(data => {
        let parsedData = JSON.parse(data);
        setLinks(parsedData);
      });
      if (globalStates.selectedMovie.pk in globalStates.userMovieData) {
        setStarClicked(globalStates.userMovieData[globalStates.selectedMovie.pk]);
        setOverStar(globalStates.userMovieData[globalStates.selectedMovie.pk]);
      }
    }
  }, []);
  const handleRate = () => {
    let rateBox = document.getElementById("rateBox");
    rateBox.style.display = "grid";
    document.getElementById("overlay").style.display = "block";
  }
  const handleCloseRateBox = () => {
    let rateBox = document.getElementById("rateBox");
    rateBox.style.display = "";
    document.getElementById("overlay").style.display = "";
  }
  const handleOnMouseHover = (starId) => {
    setOverStar(starId);
  }
  const handleOnMouseOut = () => {
    if (starClicked === false) {
      setOverStar(false);
    }
    else {
      setOverStar(starClicked);
    }
  }
  const handleStarClicked = (starId) => {
    if (starId !== starClicked) {
      setStarClicked(starId);
    } else {
      setStarClicked(false);
    }
  }
  const handleRateRequest = () => {
    if (starClicked !== false) {
      const cookieValue = document.cookie.split("; ").find((row) => row.startsWith("Auth-Token="))?.split("=")[1];
      let data = {
        "rating": true,
        "movieId": globalStates.selectedMovie.pk,
        "movie_rating": starClicked
      };
      fetch("http://127.0.0.1:8000/api/user/", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Auth-Token": cookieValue,
        },
      }).then(response => {
        if (response.status === 200) {
          return response.json();
        }
      }).then(data => {
        let parsedData = JSON.parse(data);
        globalStates.setUserMovieData(parsedData);
        handleCloseRateBox();
      })
    }
  }
  return (
    <>
      {globalStates.isLogin && <section className='movieDetailsSection'>
        <div>
          <div>
            <img src={`http://127.0.0.1:8000/api/${globalStates.selectedMovie.fields.poster}`} alt="poster" id='singlePoster' />
          </div>
          <div>Release Year : {globalStates.selectedMovie.fields.name.split("(").length !== 1 && globalStates.selectedMovie.fields.name.split("(")[1].split(")")[0]}</div>
        </div>
        <div id='movieDetailsGrid'>
          <div>Title : {globalStates.selectedMovie.fields.name}</div>
          <div>Genre : {globalStates.selectedMovie.fields.genre}</div>
          <div>Description</div>
        </div>
        <div id='lastDiv'>
          <div>
            <div>Movie Watching Links</div>
            {links.length === 0 && <div>No Links Available.</div>}
            {links.map((element, index) => {
              return <div key={element.pk}><a href={element.fields.url} target='_blank'>Link {index+1}</a></div>
            })}
          </div>
          <div>
            <input type="button" value={globalStates.selectedMovie.pk in globalStates.userMovieData ? "Already Rated" : "Rate"} className='customButton' onClick={handleRate} />
          </div>
        </div>
        <div id='rateBox'>
          <div>
            <button className='svgBtn' onClick={handleCloseRateBox}>
              <svg viewBox="0 0 512 512"><path d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4  L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1  c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1  c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z" /></svg>
            </button>
          </div>
          <div id='starDiv'>
            {rating_count.map((element) => {
              return <React.Fragment key={element}>
                <div>
                  <div>
                    <svg viewBox='0 0 100 100' className={overStar >= element[0] ? "overStar" : "notOverStar"} onMouseOver={() => { handleOnMouseHover(element[0]) }} onMouseOut={handleOnMouseOut} onClick={() => { handleStarClicked(element[0]) }}><path d="m 100 0 l -20 35 l -61 0 l 47 25 l -20 39 l 54 -20" /></svg>
                  </div>
                  <div>
                    <svg viewBox='0 0 100 100' className={overStar >= element[1] ? "overStar" : "notOverStar"} onMouseOver={() => { handleOnMouseHover(element[1]) }} onMouseOut={handleOnMouseOut} onClick={() => { handleStarClicked(element[1]) }}><path d="m 0 0 l 20 35 l 61 0 l -47 25 l 20 39 l -54 -20" /></svg>
                  </div>
                </div>
              </React.Fragment>
            })}
          </div>
          <div>
            <input type="button" value="Rate" className='customButton rateButton' onClick={handleRateRequest} />
          </div>
        </div>
        <div id='overlay'></div>
      </section>}
    </>
  )
}

export default MovieDetails
