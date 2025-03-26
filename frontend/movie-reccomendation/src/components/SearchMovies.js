import React, {useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import MovieContext from '../contexts/MovieContext';
import '../css/searchBoxMovies.css';

const SearchMovies = () => {
    const globalStates = useContext(MovieContext);
    const navigate = useNavigate();
    const [searchResults, setSearchResults] = useState([]);
    const handleSearchInput = (event) => {
        if (event.target.value !== ""){
            let newArr = [];
            globalStates.allMovieData.forEach(element => {
                if (element.fields.name.toLowerCase().includes(event.target.value.toLowerCase())){
                    newArr.push(element);
                }
            })
            setSearchResults(newArr);
            document.getElementById("searchResultsDiv").style.display = "block";
        }else{
            document.getElementById("searchResultsDiv").style.display = "";
        }
    }
    const handleSelectedMovie = (movie) => {
        document.getElementById("search").value = "";
        document.getElementById("searchResultsDiv").style.display = "";
        globalStates.setSelectedMovie(movie);
        navigate('/movie');
    }
    return (
        <div id="searchBoxContainer">
            <input type="search" id="search" placeholder='Search' onInput={handleSearchInput} />
            <div id='searchResultsDiv'>
                {searchResults.length === 0 && <div>No Results Found</div>}
                {searchResults.map(element => {
                    return <React.Fragment key={element.pk}>
                        <div onClick={() => handleSelectedMovie(element)}>{element.fields.name}</div>
                    </React.Fragment>
                })}
            </div>
        </div>
    )
}

export default SearchMovies
