import React, { useContext } from 'react';
import '../css/navbar.css';
import MovieContext from '../contexts/MovieContext';
import logo from '../images/stream it logo.png';
import UserProfileImg from './UserProfileImg';
import SearchMovies from './SearchMovies';

const Navbar = () => {
    const globalStates = useContext(MovieContext);
    return (
        <section className={!globalStates.isLogin ? 'beforeLoginNav' : 'afterLoginNav'}>
            {globalStates.isLogin && <div><SearchMovies /></div>}
            <div id="logoContainer" style={globalStates.isLogin ? { textAlign: 'center' } : {}}>
                <img src={logo} alt="Logo" />
            </div>
            {globalStates.isLogin && <div><UserProfileImg userName={globalStates.userName} handleLogout={globalStates.handleAuthenticate}/></div>}
        </section>
    )
}

export default Navbar
