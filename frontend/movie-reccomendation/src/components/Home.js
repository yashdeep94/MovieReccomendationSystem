import React, { useContext, useEffect } from 'react';
import MovieContext from '../contexts/MovieContext';
import { Link, useNavigate } from 'react-router-dom';
import MoviePosterPreview from './MoviePosterPreview';
import '../css/home.css';

const Home = () => {
    const globalStates = useContext(MovieContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (!globalStates.isLogin) {
            navigate('/');
        } else {
            const cookieValue = document.cookie.split("; ").find((row) => row.startsWith("Auth-Token="))?.split("=")[1];
            fetch("http://127.0.0.1:8000/api/movie/?all=true", {
                headers: {
                    "Auth-Token": cookieValue,
                },
            }).then(response => {
                if (response.status === 200) {
                    return response.json();
                }
            }).then(data => {
                let parsedData = JSON.parse(data);
                globalStates.setAllMovieData(parsedData);
                let copiedParsedData = Array.from(parsedData);
                copiedParsedData.sort(function(a, b){return ((a.fields.sum_of_rating/a.fields.no_of_user_rated) - (b.fields.sum_of_rating/b.fields.no_of_user_rated))})
                copiedParsedData.reverse();
                globalStates.setTrendingMovieData(copiedParsedData);
            })
            fetch("http://127.0.0.1:8000/api/user/", {
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
            })
            fetch("http://127.0.0.1:8000/api/recommended/", {
                headers: {
                    "Auth-Token": cookieValue,
                },
            }).then(response => {
                if (response.status === 200) {
                    return response.json();
                }
            }).then(data => {
                let parsedData = JSON.parse(data);
                globalStates.setReccomendedMovieData(parsedData);
            })
        }
    }, []);
    return (
        <>
            {globalStates.isLogin && <section>
                {globalStates.recommendedMovieData.length !== 0 && <>
                    <div className='movieSectionHeading'>Reccomended Movies</div>
                    <div className='posterGrid'>
                        {globalStates.recommendedMovieData.slice(0, 5).map((element) => {
                            return <React.Fragment key={element.pk}>
                                <MoviePosterPreview movieData={element} />
                            </React.Fragment>
                        })}
                        <div>
                            <Link to={`/all/reccomended`} className='customButton'>Show All</Link>
                        </div>
                    </div>
                </>}
                <div className='movieSectionHeading'>Trending Movies</div>
                <div className='posterGrid'>
                    {globalStates.trendingMovieData.slice(0, 5).map((element) => {
                        return <React.Fragment key={element.pk}>
                            <MoviePosterPreview movieData={element} />
                        </React.Fragment>
                    })}
                    <div>
                        <Link to={`/all/trending`} className='customButton'>Show All</Link>
                    </div>
                </div>
                <div className='movieSectionHeading'>Other Movies</div>
                <div className='posterGrid'>
                    {globalStates.allMovieData.slice(0, 5).map((element) => {
                        return <React.Fragment key={element.pk}>
                            <MoviePosterPreview movieData={element} />
                        </React.Fragment>
                    })}
                    <div>
                        <Link to={`/all/all`} className='customButton'>Show All</Link>
                    </div>
                </div>
            </section>}
        </>
    )
}

export default Home
