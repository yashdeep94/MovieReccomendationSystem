import React, { useState } from 'react';
import '../css/userProfileImg.css';
import { useNavigate } from 'react-router-dom';

const UserProfileImg = (props) => {
    const [logoutDivClicked, setLogoutDivClicked] = useState(false);
    const navigate = useNavigate();
    const handleLogoutDiv = () => {
        setLogoutDivClicked(!logoutDivClicked);
    }
    const handleLogout = () => {
        props.handleLogout(false);
        navigate('/');
    }
    return (
        <div id='svgContainer'>
            <div>
                <svg
                    viewBox='0 0 600 600'
                    fill="black">

                    <defs>
                        <clipPath id="circular-border">
                            <circle cx="300" cy="300" r="280" />
                        </clipPath>
                        <clipPath id="avoid-antialiasing-bugs">
                            <rect width="100%" height="498" />
                        </clipPath>
                    </defs>

                    <circle cx="300" cy="300" r="280" fill="white" clip-path="url(#avoid-antialiasing-bugs)" />
                    <circle cx="300" cy="230" r="115" />
                    <circle cx="300" cy="550" r="205" clip-path="url(#circular-border)" />
                </svg>
            </div>
            <div>{props.userName}</div>
            <div id='downArrowSvg' onClick={handleLogoutDiv}>
                <div>
                    <svg fill="white" viewBox="0 0 386.257 386.257">
                        <polygon points="0,96.879 193.129,289.379 386.257,96.879 " />
                    </svg>
                    {logoutDivClicked && <div id='logoutBtn' onClick={handleLogout}>Logout</div>}
                </div>
            </div>
        </div>
    )
}

export default UserProfileImg
