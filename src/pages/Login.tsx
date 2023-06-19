import './../styles/Login.css';
import { useNavigate } from "react-router-dom";
import logo from './../icons/logo.png';
import { ReactComponent as GoogleSvg } from './../icons/google.svg';
import { ReactComponent as LangSvg } from './../icons/lang.svg';
import { signInWithPopup } from "firebase/auth";
import { FirebaseContext } from '../contexts/FirebaseContext';
import { auth, provider } from "../service/firebase";
import { useTranslation } from "react-i18next";
import React from 'react';

export const Login = () => {
  const { user, setUser } = React.useContext(FirebaseContext);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const navigateLang = () => {
    navigate('/lang');
  }

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      setUser(result.user);
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
        <button id='login-button-google' onClick={signInWithGoogle}>
          <GoogleSvg height="20px" />
          <span>{t("login-button-google")}</span>
        </button>
      </div>
    </div >
  )
}