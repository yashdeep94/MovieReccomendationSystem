import MovieContext from "./MovieContext"
import { useState } from "react"

const MovieState = (props) => {
    const [isLogin, setIsLogin] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState('');
    const [allMovieData, setAllMovieData] = useState([]);
    const [userMovieData, setUserMovieData] = useState([]);
    const [recommendedMovieData, setReccomendedMovieData] = useState([]);
    const [trendingMovieData, setTrendingMovieData] = useState([]);
    const [userName, setUserName] = useState("");
    const handleAuthenticate = (value) => {
        setIsLogin(value);
    }
    return (
        <MovieContext.Provider value={{isLogin, handleAuthenticate, selectedMovie, setSelectedMovie, allMovieData, setAllMovieData, userMovieData, setUserMovieData, recommendedMovieData, setReccomendedMovieData, trendingMovieData, setTrendingMovieData, userName, setUserName}}>
            {props.children}
        </MovieContext.Provider>
    )
}

export default MovieState
