import './../styles/Login.css';
import { useNavigate } from "react-router-dom";
import logo from './../icons/logo.png';
import { signInWithPopup } from "firebase/auth";
import { FirebaseContext } from '../contexts/FirebaseContext';
import { auth, provider } from "../service/firebase";
import { useTranslation } from "react-i18next";
import { IconButton } from "@mui/material";
import Button from '@mui/material/Button';
import GoogleIcon from '@mui/icons-material/Google';
import LanguageIcon from '@mui/icons-material/Language';

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

      navigate('/home');
    }).catch((error) => {
      console.log(error);
    });
  }

  return (
    <div className="app-containter">
      <div className='login-page'>
        <img id='login-logo' src={logo} height='25%' alt='logo'>
        </img>
        <IconButton id="login-lang-icon" onClick={navigateLang} >
          <LanguageIcon sx={{ fontSize: 50 }} />
        </IconButton>
        <h1>{t("login-welcome")}</h1>
        <Button style={{
          color: 'var(--color-1)',
          backgroundColor: '#242424',
        }} id='login-button-google' color='info' variant="outlined" onClick={signInWithGoogle} startIcon={<GoogleIcon />}>
          {t("login-button-google")}
        </Button>
      </div>
    </div >
  )
}