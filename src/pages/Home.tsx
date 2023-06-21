import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { IconButton } from "@mui/material";
import { Parking } from "../components/Parking";
import { auth } from "../service/firebase";
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';


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

  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState(-1);
  const handleChange = async (id: string) => {
    await setId(parseInt(id));
  };
  const handleClickOpen = () => { setOpen(true) };
  const handleClose = () => { setOpen(false) };

  const addParking = async () => {
    if (isNaN(id)) handleClose();
    console.log('id->' + id);
    handleClose();

    let idToken = await auth.currentUser?.getIdToken(true)
    .catch((error) => {
      console.log(error);
    });

    let requestOptions = {
      mode: 'cors' as RequestMode,
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': '*', // Required for CORS support to work
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: auth.currentUser?.email, token: idToken, parking_id: id })
    };
    let response = await fetch(`${process.env.REACT_APP_API_URL}/mobile/parking/adduser`, requestOptions)
      .then(data => { return data.json() })
      // .then(data => console.log('data -> ' + data))
      .catch(error => console.log(error));
    console.log(response);
    getParkings();
    return response;
  };


  useEffect(() => {
    getParkings();
  }, []);

  const getParkings = async () => {

    let idToken = await auth.currentUser?.getIdToken(true)
      .catch((error) => {
        console.log(error);
      });

    let requestOptions = {
      mode: 'cors' as RequestMode,
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': '*', // Required for CORS support to work
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: auth.currentUser?.email, token: idToken })
    };
    let response = await fetch(`${process.env.REACT_APP_API_URL}/mobile/parking/get`, requestOptions)
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
        <Sidebar backgroundColor="var(--color-4)" style={{
          height: '100vh',
          maxHeight: '100vh',
          background: '#0E2954'
        }} className="home-side-bar-container" width="80%" breakPoint="always" onBackdropClick={() => setToggled(false)} toggled={toggled}>
          <Menu style={{ height: '100%' }}>
            <img id='home-user-photo' src={user!.photoURL!} alt='user photo'></img>
            <h1>{t("home-side-bar-welcome")}</h1>
            <h1>{user!.displayName}</h1>
            <MenuItem>
              <Button id='home-logout-button'
                color='info' variant="outlined"
                style={{
                  color: 'var(--color-1)',
                  borderColor: 'var(--color-1)'
                }}
                onClick={() => setUser(null)}>
                {t("home-side-bar-logout")}
              </Button></MenuItem>
          </Menu>
        </Sidebar>

        <div className="home-main-container">
          <div className="home-main-header">
            <h1>{t("home-main-header")}</h1>
            <IconButton id="home-slidebar-icon" onClick={() => setToggled(!toggled)} >
              <MenuIcon sx={{ fontSize: 40 }} />
            </IconButton>
          </div>
          <div className="home-main-body">
            <div className="home-main-body-header">
              <h1>{t("home-your-parkings")}</h1>
              <IconButton id="home-new-button" onClick={handleClickOpen} >
                <LibraryAddIcon sx={{ fontSize: 40 }} />
              </IconButton>
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{t("home-add-parking-title")}</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    {t("home-add-parking-content")}
                  </DialogContentText>
                  <TextField
                    onChange={(e) => { handleChange(e.target.value) }}
                    autoFocus
                    margin="dense"
                    id="add-id"
                    label={t("home-add-parking-label")}
                    type="id"
                    fullWidth
                    variant="standard"
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>{t("home-add-parking-cancel")}</Button>
                  <Button onClick={addParking}>{t("home-add-parking-add")}</Button>
                </DialogActions>
              </Dialog>
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
