import './../styles/Login.css';
import { useNavigate } from "react-router-dom";
import logo from './../icons/logo.png';
import { ReactComponent as LangSvg } from './../icons/lang.svg';
import { signInWithPopup } from "firebase/auth";
import { FirebaseContext } from '../contexts/FirebaseContext';
import { auth, provider } from "../service/firebase";
import { useTranslation } from "react-i18next";
import Button from '@mui/material/Button';
import GoogleIcon from '@mui/icons-material/Google';

import React from 'react';

export const Login = () => {
  const { user, setUser } = React.useContext(FirebaseContext);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const navigateLang = () => {
    navigate('/lang');
  }

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then(async (result) => {
      await setUser(result.user);
      console.log(user);
    //   let token =  auth.currentUser?.getIdToken(true).then((idToken) => {
    //     console.log(idToken);
    //   }).catch((error) => {
    //     console.log(error);
    //   });

    //   const requestOptions = {
    //     mode: 'cors' as RequestMode,
    //     method: 'POST',
    //     headers: {
    //       'Access-Control-Allow-Origin': '*', // Required for CORS support to work
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({ email: auth.currentUser?.email, token: token })
    //   };
    //   const response = await fetch(`${process.env.REACT_APP_API_URL}/mobile/parking/get`, requestOptions)
    //   .then(response => response.json())
    //   .then(data => console.log(data))
    //   .catch(error => console.log(error));
    // console.log(response);

      navigate('/home');
    }).catch((error) => {
      console.log(error);
    });
  }


  return (
    <div className="app-containter">
      <div className='login-page'>
        <LangSvg id='login-lang-icon' onClick={navigateLang} />
        <img id='login-logo' src={logo} height='25%' alt='logo'></img>
        <h1>{t("login-welcome")}</h1>
        <Button id='login-button-google' color='info' variant="outlined" onClick={signInWithGoogle} startIcon={<GoogleIcon/>}>
          {t("login-button-google")}
        </Button>
      </div>
    </div >
  )
}