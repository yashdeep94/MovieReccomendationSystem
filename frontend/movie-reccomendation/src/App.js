import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import MovieState from './contexts/MovieState';
import Authenticate from './components/Authenticate';
import MovieDetails from './components/MovieDetails';
import Home from './components/Home';
import AllMovies from './components/AllMovies';

function App() {
  return (
    <>
      <BrowserRouter>
        <MovieState>
          <Navbar />
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/authenticate' element={<Authenticate />} />
            <Route path='/movie' element={<MovieDetails />} />
            <Route path='/home' element={<Home />} />
            <Route path='/all/:section' element={<AllMovies />} />
          </Routes>
        </MovieState>
      </BrowserRouter>
    </>
  );
}

export default App;
