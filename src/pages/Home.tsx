import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FirebaseContext } from '../contexts/FirebaseContext';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import '../styles/Home.css'
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from "@mui/material";
import Button from '@mui/material/Button';
import { Parking } from "../components/Parking";
import Stack from '@mui/material/Stack';
import { auth, provider } from "../service/firebase";
import { useNavigate } from "react-router-dom";


export const Home = () => {
  const navigate = useNavigate();
  const { user, setUser } = React.useContext(FirebaseContext);
  const { t } = useTranslation();

  const getUser = () => {
    auth.currentUser?.getIdToken(true).then((idToken) => {
    }).catch((error) => {
      console.log(error);
    });
  }

  //state to control sidebar
  const [toggled, setToggled] = React.useState(true);
  const [parkings, setParkings] = React.useState([]);

  useEffect(() => {
    getParkings().then((data) => {
      console.log(data);
      console.log('parkings :');
      setParkings(data!);
      console.log(parkings);
    });
    // const sampleData: any[] = [
    //   {
    //     "parkingSpots": [],
    //     "id": 4,
    //     "name": "FATEC Indaiatuba",
    //     "cep": "13334-100",
    //     "numero": 65,
    //     "codConvite": null
    //   },
    //   {
    //     "parkingSpots": [],
    //     "id": 5,
    //     "name": "FATEC Indaiatuba2",
    //     "cep": "13334-100",
    //     "numero": 65,
    //     "codConvite": null
    //   }
    // ];
    // setParkings(sampleData as never);
    // console.log(parkings);

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
    console.log(`${process.env.REACT_APP_API_URL}/mobile/parking/get`);
    const response = await fetch(`${process.env.REACT_APP_API_URL}/mobile/parking/get`, requestOptions)
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.log(error));
    console.log(response);
    return response;
  }

  // console.log(user);

  return (
    <div className="app-container">
      <div className="home-page">
        <div className="home-side-bar-container">
          <Sidebar style={{background: '#0E2954'}} className="home-side-bar" width="80%" breakPoint="always" onBackdropClick={() => setToggled(false)} toggled={toggled}>
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
              <MenuItem component={<Link to="/home" />}> Home</MenuItem>
              <MenuItem component={<Link to="/documentation" />}> Documentation</MenuItem>
              <SubMenu label="Charts">
                <MenuItem> item 1 </MenuItem>
                <MenuItem> item 2 </MenuItem>
              </SubMenu>
              <MenuItem onClick={getUser}> Item 3 </MenuItem>
            </Menu>
            <Button id='home-logout-button' color='info' variant="outlined" onClick={() => setUser(null)}>
              {t("home-side-bar-logout")}
            </Button>
          </Sidebar>
        </div>
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
