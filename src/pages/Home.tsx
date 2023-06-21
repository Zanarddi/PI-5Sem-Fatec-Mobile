import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Sidebar, Menu } from 'react-pro-sidebar';
import { IconButton } from "@mui/material";
import { Parking } from "../components/Parking";
import { auth } from "../service/firebase";
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import Stack from '@mui/material/Stack';
import { FirebaseContext } from '../contexts/FirebaseContext';

import '../styles/Home.css'

export const Home = () => {
  const navigate = useNavigate();
  const { user, setUser } = React.useContext(FirebaseContext);
  const { t } = useTranslation();

  const getUser = () => {
    auth.currentUser?.getIdToken(true).then(() => {
    }).catch((error) => {
      console.log(error);
    });
  }

  //state to control sidebar
  const [toggled, setToggled] = React.useState(false);
  const [parkings, setParkings] = React.useState([]);

  useEffect(() => {
    getParkings();
  }, []);

  const getParkings = async () => {

    let idToken = await auth.currentUser?.getIdToken(true)
      .catch((error) => {
        console.log(error);
      });

    const requestOptions = {
      mode: 'cors' as RequestMode,
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': '*', // Required for CORS support to work
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: auth.currentUser?.email, token: idToken })
    };
    const response = await fetch(`${process.env.REACT_APP_API_URL}/mobile/parking/get`, requestOptions)
      .then(data => { return data.json() })
      // .then(data => console.log('data -> ' + data))
      .catch(error => console.log(error));
    console.log(response);
    setParkings(response);
    return response;
  }

  // console.log(user);

  return (
    <div className="app-container">
      <div className="home-page">
        <Sidebar style={{
          background: '#0E2954'
        }} className="home-side-bar-container" width="80%" breakPoint="always" onBackdropClick={() => setToggled(false)} toggled={toggled}>
          <img id='home-user-photo' src={user!.photoURL!} alt='user photo'></img>
          <h1>{t("home-side-bar-welcome")}</h1>
          <h1>{user!.displayName}</h1>
          <Menu
            menuItemStyles={{
              button: ({ level, active, disabled }) => {
                // only apply styles on first level elements of the tree
                if (level === 0)
                  return {
                    color: disabled ? 'red' : '#0E2954',
                    backgroundColor: active ? '#eecef9' : undefined,
                  };
                else
                  return {
                    color: disabled ? '5A96E3' : '#1F6E8C',
                    backgroundColor: active ? '#eecef9' : undefined,
                  };
              },
            }}
          >
          </Menu>
          <Button id='home-logout-button' 
          color='info' variant="outlined" 
          style={{
            color: '#0E2954',
            borderColor: '#0E2954'
          }}
          onClick={() => setUser(null)}>
            {t("home-side-bar-logout")}
          </Button>
        </Sidebar>
        <IconButton id="home-slidebar-icon" onClick={() => setToggled(!toggled)} >
          <MenuIcon sx={{ fontSize: 40 }} />
        </IconButton>
        <div className="home-main-container">
          <div className="home-main-header">
            <h1>{t("home-main-header")}</h1>
          </div>
          <div className="home-main-body">
            <div className="home-main-body-header">
              <h1>{t("home-your-parkings")}</h1>
            </div>
            <div className="home-main-body-parkings">
              <Stack
                direction="column"
                justifyContent="flex-start"
                alignItems="stretch"
                spacing={2}
              >
                {parkings != undefined ?
                  parkings.map((parking: any) => {
                    return (
                      <Parking parking={parking} />
                    )
                  })
                  : <h1>{t("home-no-parkings")}</h1>}
              </Stack>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
