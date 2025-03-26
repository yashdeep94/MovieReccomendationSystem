import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/login.css';
import img1 from '../images/Avengers.webp';
import img2 from '../images/john wick.jpg';
import img3 from '../images/kgf.jpg';
import img4 from '../images/Mission Impossible.jpg';
import img5 from '../images/Pathan.jpg';
import img6 from '../images/RRR.jpg';
import img7 from '../images/Bahubali.webp';
import img8 from '../images/3Idiots.jpg';
import img9 from '../images/f9.jpg';
import img10 from '../images/Pushpa.jpg';
import img11 from '../images/Golmaalagain.jpg';
import img12 from '../images/harry potter.jpg';
import img13 from '../images/housefull4.jpg';

const Login = () => {
    const navigate = useNavigate();
    useEffect(() => {
        document.body.style.background = 'radial-gradient(#8c030e 50%, black)';
    }, []);
    const handleSignInUp = () => {
        navigate("/authenticate");
    }
    return (
        <section className='loginSection'>
            <div>
                <input type="button" value="Sign Up / Sign In" onClick={handleSignInUp}/>
            </div>
            <div>
                <div>
                    <div>
                        <img src={img1} alt="img1" />
                    </div>
                    <div>
                        <img src={img2} alt="img2" />
                    </div>
                    <div>
                        <img src={img3} alt="img3" />
                    </div>
                    <div>
                        <img src={img4} alt="img4" />
                    </div>
                    <div>
                        <img src={img5} alt="img5" />
                    </div>
                    <div>
                        <img src={img6} alt="img6" />
                    </div>
                    <div>
                        <img src={img13} alt="img13" />
                    </div>
                    <div>
                        <img src={img1} alt="img1" />
                    </div>
                    <div>
                        <img src={img2} alt="img2" />
                    </div>
                    <div>
                        <img src={img3} alt="img3" />
                    </div>
                    <div>
                        <img src={img4} alt="img4" />
                    </div>
                    <div>
                        <img src={img5} alt="img5" />
                    </div>
                    <div>
                        <img src={img6} alt="img6" />
                    </div>
                    <div>
                        <img src={img13} alt="img13" />
                    </div>
                </div>
                <div>
                    <div>
                        <img src={img7} alt="img7" />
                    </div>
                    <div>
                        <img src={img8} alt="img8" />
                    </div>
                    <div>
                        <img src={img9} alt="img9" />
                    </div>
                    <div>
                        <img src={img10} alt="img10" />
                    </div>
                    <div>
                        <img src={img11} alt="img11" />
                    </div>
                    <div>
                        <img src={img12} alt="img12" />
                    </div>
                    <div>
                        <img src={img7} alt="img7" />
                    </div>
                    <div>
                        <img src={img8} alt="img8" />
                    </div>
                    <div>
                        <img src={img9} alt="img9" />
                    </div>
                    <div>
                        <img src={img10} alt="img10" />
                    </div>
                    <div>
                        <img src={img11} alt="img11" />
                    </div>
                    <div>
                        <img src={img12} alt="img12" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login
