import { Button } from '@mui/material'
import React from 'react'
import { styled } from 'styled-components'
import { auth, provider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';

function Login() {
    const signIn = (e) => {
        e.preventDefault();
        signInWithPopup(auth, provider).catch((error) =>
            alert(error.message)
        )
    }

    return (
        <LoginContainer>
            <LoginInnerContainer>
                <img src='https://play-lh.googleusercontent.com/mzJpTCsTW_FuR6YqOPaLHrSEVCSJuXzCljdxnCKhVZMcu6EESZBQTCHxMh8slVtnKqo' />
                <h1>Sign in to slack</h1>
                <p>slack.com</p>
                <Button onClick={signIn}>Sign in with Google</Button>
            </LoginInnerContainer>
        </LoginContainer>
    )
}

const LoginContainer = styled.div`
    background-color: #f8f8f8;
    height: 100vh;
    display: grid;
    place-items: center;
`
const LoginInnerContainer = styled.div`
    padding: 100px;
    background-color: white;
    text-align: center;
    border-radius: 10px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.3);
    > img {
        object-fit: contain;
        height: 100px;
    }
    > button {
        text-transform: inherit;
        margin-top: 50px;
        background-color: green;
        color: white;
    }
`

export default Login