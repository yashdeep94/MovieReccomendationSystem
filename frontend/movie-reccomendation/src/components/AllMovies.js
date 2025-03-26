import React, {useContext, useState} from 'react';
import { useParams } from 'react-router-dom';
import MovieContext from '../contexts/MovieContext';
import MoviePosterPreview from './MoviePosterPreview';
import '../css/allMoviesSection.css';

const AllMovies = () => {
    const globalStates = useContext(MovieContext);
    const [currentPage, setCurrentPage] = useState(1);
    let param = useParams();
    const handleNextPage = () => {
        if (Math.ceil(globalStates.allMovieData.length/60) !== currentPage){
            setCurrentPage(currentPage + 1);
            window.scrollTo({
                top:0,
                left:0,
                behavior:"smooth",
            })
        }
    }
    const handlePreviousPage = () => {
        if (currentPage !== 1){
            setCurrentPage(currentPage - 1);
            window.scrollTo({
                top:0,
                left:0,
                behavior:"smooth",
            })
        }
    }
  return (
    <>
            {globalStates.isLogin && <section>
                <div className='pageHeading'>{param.section === "reccomended" ? "Reccomended Movies" : param.section === "trending" ? "Trending Movies" : "All Movies"}</div>
                <div className='posterGrid'>
                    {param.section === "reccomended" ? globalStates.recommendedMovieData.length > 60 ? globalStates.recommendedMovieData.slice((currentPage-1)*60, currentPage*60).map((element) => {
                        return <React.Fragment key={element.pk}>
                            <MoviePosterPreview movieData={element} />
                        </React.Fragment>
                    }) : globalStates.recommendedMovieData.map((element) => {
                        return <React.Fragment key={element.pk}>
                            <MoviePosterPreview movieData={element} />
                        </React.Fragment>
                    }) : param.section === "trending" ? globalStates.trendingMovieData.length > 60 ? globalStates.trendingMovieData.slice((currentPage-1)*60, currentPage*60).map((element) => {
                        return <React.Fragment key={element.pk}>
                            <MoviePosterPreview movieData={element} />
                        </React.Fragment>
                    }) : globalStates.trendingMovieData.map((element) => {
                        return <React.Fragment key={element.pk}>
                            <MoviePosterPreview movieData={element} />
                        </React.Fragment>
                    }) : globalStates.allMovieData.length > 60 ? globalStates.allMovieData.slice((currentPage-1)*60, currentPage*60).map((element) => {
                        return <React.Fragment key={element.pk}>
                            <MoviePosterPreview movieData={element} />
                        </React.Fragment>
                    }) : globalStates.allMovieData.map((element) => {
                        return <React.Fragment key={element.pk}>
                            <MoviePosterPreview movieData={element} />
                        </React.Fragment>
                    })}
                </div>
                <div className='pageNavigation'>
                    <div>
                        <input type="button" value="Previous Page" onClick={handlePreviousPage} className='customButton'/>
                    </div>
                    <div>
                        <div id='pageNumberContainer'>{currentPage}</div>
                    </div>
                    <div>
                        <input type="button" value="Next Page" onClick={handleNextPage} className='customButton'/>
                    </div>
                </div>
            </section>}
        </>
  )
}

export default AllMovies
