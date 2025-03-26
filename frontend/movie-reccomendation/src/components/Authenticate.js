import React, { useState, useContext, useEffect } from 'react';
import MovieContext from '../contexts/MovieContext';
import { useNavigate } from 'react-router-dom';
import '../css/authenticate.css';
import sha256 from 'crypto-js/sha256';
import CryptoJS from 'crypto-js';

const Authenticate = () => {
    const globalStates = useContext(MovieContext);
    const navigate = useNavigate();
    const [signUp, setSignUp] = useState(false);
    const [mailVerified, setMailVerified] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [verificationData, setVeificationData] = useState("");
    useEffect(() => {
        document.body.style.background = '#8d020d';
    }, []);
    const handleSignUp = () => {
        setSignUp(!signUp);
    }
    const handleSignUpLogin = () => {
        if (signUp) {
            if(document.getElementById("password").value === "" || document.getElementById("confirmPassword").value === ""){
                document.getElementById("messageDiv").innerText = "Passwords cannot be blank";
                setTimeout(() => {
                    document.getElementById("messageDiv").innerText = "";
                }, 2000);
            }
            else if (document.getElementById("age").value === ""){
                document.getElementById("messageDiv").innerText = "Age is required";
                setTimeout(() => {
                    document.getElementById("messageDiv").innerText = "";
                }, 2000);
            }
            else if (mailVerified === false){
                document.getElementById("messageDiv").innerText = "Mail ID is not verified";
                setTimeout(() => {
                    document.getElementById("messageDiv").innerText = "";
                }, 2000);
            }
            else if (document.getElementById("password").value === document.getElementById("confirmPassword").value) {
                let data = {
                    "name": document.getElementById("userName").value,
                    "password": document.getElementById("password").value,
                    "mailID":mailVerified,
                    "age":document.getElementById("age").value,
                }
                fetch("http://127.0.0.1:8000/api/auth/createuser/", {
                    method: "POST",
                    body: JSON.stringify(data),
                }).then(response => {
                    if (response.status === 200) {
                        setSignUp(!signUp);
                        document.getElementById("userName").value = "";
                        document.getElementById("password").value = "";
                        document.getElementById("messageDiv").innerText = "User Created Successfully";
                        setTimeout(() => {
                            document.getElementById("messageDiv").innerText = "";
                        }, 2000);
                    }
                })
            }else{
                document.getElementById("messageDiv").innerText = "Passwords do not match";
                setTimeout(() => {
                    document.getElementById("messageDiv").innerText = "";
                }, 2000);
            }
        } else {
            globalStates.setUserName(document.getElementById("userName").value);
            let data = {
                "name": document.getElementById("userName").value,
                "password": document.getElementById("password").value,
            }
            fetch("http://127.0.0.1:8000/api/auth/login/", {
                method: "POST",
                body: JSON.stringify(data),
            }).then(response => {
                if (response.status === 200) {
                    return response.json();
                }
            }).then(data => {
                document.cookie = `Auth-Token=${data.authToken};`
                globalStates.handleAuthenticate(true);
                navigate('/home');
            })
        }
    }
    const handleSendOTP = () => {
        let validRegEx = /.+@[a-zA-Z0-9]+\.com/;
        if (document.getElementById("mailID").value.match(validRegEx)) {
            let data = {
                "mailID":document.getElementById("mailID").value
            }
            fetch("http://127.0.0.1:8000/api/verifyemail/", {
                method: "POST",
                body: JSON.stringify(data),
            }).then(response => response.json()).then(data => {
                setVeificationData(data);
                setOtpSent(true);
            });
        }else {
            document.getElementById("messageDiv").innerText = "Please Provide Valid Mail ID";
            setTimeout(() => {
                document.getElementById("messageDiv").innerText = "";
            }, 2000);
        }
    }
    const handleVerifyEmail = () => {
        if (sha256(document.getElementById("verify").value).toString(CryptoJS.enc.Hex) === verificationData["verificationOTP"]){
            setMailVerified(document.getElementById("mailID").value);
            document.getElementById("messageDiv").innerText = "Mail ID Verified";
            setTimeout(() => {
                document.getElementById("messageDiv").innerText = "";
            }, 2000);
        }else{
            document.getElementById("messageDiv").innerText = "OTP Not Matched";
            setTimeout(() => {
                document.getElementById("messageDiv").innerText = "";
            }, 2000);
        }
    }
    const habndleAge = (event) => {
        if (parseInt(event.target.value) <= 0){
            event.target.value = "1";
        }
    }
    return (
        <section className='authenticateSection'>
            <div>
                <div>{!signUp ? 'Sign In' : 'Sign Up'}</div>
                <div id="messageDiv"></div>
                <div>User Name</div>
                <div><input type="text" id="userName" className='customInput'/></div>
                <div>Password</div>
                <div><input type="password" id="password" className='customInput'/></div>
                {signUp && <>
                    <div>Confirm Password</div>
                    <div><input type="password" id="confirmPassword" className='customInput'/></div>
                    <div>Mail ID</div>
                    <div>
                        <input type="email" id="mailID" className='customInput' />
                        {!mailVerified && (otpSent ? <div><input type="text" id="verify" /><input type='button' value="Verify Mail" onClick={handleVerifyEmail}/></div> : <input type="button" value="Send OTP" onClick={handleSendOTP}/>)}
                    </div>
                    <div>Age</div>
                    <div><input type="number" id="age" className='customInput' onChange={habndleAge} /></div>
                </>}
                <div className='btnContainer'><input type="button" value={!signUp ? 'Sign In' : 'Sign Up'} onClick={handleSignUpLogin} className='customButton' /></div>
                <div><input type="button" value={!signUp ? "New User? Sign Up" : "Already User? Sign In"} onClick={handleSignUp} /></div>
            </div>
        </section>
    )
}

export default Authenticate
