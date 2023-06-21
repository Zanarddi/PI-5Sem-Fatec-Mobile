import React, { useEffect } from "react";
import { auth } from "../service/firebase";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ParkingSpot, ParkingSpotProps } from "../components/ParkingSpot";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


import '../styles/Parking.css'

import { useParams } from 'react-router-dom';

interface ParkingSpot {
  id: number;
  name: string;
  cep: string;
  numero: number;
  codConvite: string | null;
  parkingSpots: any[];
}

export const Parking = () => {

  const navigate = useNavigate();
  const { id } = useParams();

  const [parkingSpots, setParkingSpots] = React.useState<ParkingSpot>();
  useEffect(() => {
    getParkingSpots();
    const interval = setInterval(() => getParkingSpots(), 10000)
    return () => {
      clearInterval(interval);
    }
  }, []);

  const getParkingSpots = async () => {
    console.log('getParkingSpots');
    
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
      body: JSON.stringify({ email: auth.currentUser?.email, token: idToken, parking_id: id })
    };

    let response: ParkingSpot = await fetch(`${process.env.REACT_APP_API_URL}/mobile/parking/getspots`, requestOptions)
      .then(data => { return data.json() })
      // .then(data => console.log('data -> ' + data))
      .catch(error => console.log(error));
    setParkingSpots(response);
    return response;
  }

  return (
    <div className="app-container">
      <IconButton sx={{ fontSize: "large" }} id="parking-icon-back" onClick={() => navigate(-1)} >
        <ArrowBackIcon sx={{ fontSize: 36 }} />
      </IconButton>
      <div className="parking-container">
        <div className="parking-header">
          <h1>{parkingSpots?.name}</h1>
          <p>CEP: {parkingSpots?.cep}, nº:{parkingSpots?.numero}</p>
        </div>
        <div className="parking-body">
          <div className="parking-map">
            {parkingSpots != undefined ?
              parkingSpots.parkingSpots.map((spot: ParkingSpotProps) => {
                return (
                  <ParkingSpot id={spot.id}
                    state={spot.state}
                    type={spot.type}
                    name={spot.name}
                    posX={spot.posX}
                    posY={spot.posY}>
                  </ParkingSpot>
                )
              })
              : null}
            {/* <ParkingSpot id={0} state={0} type={"carro"} name={""} posX={484} posY={60}></ParkingSpot> */}
            <div className="parking-image-wrapper">
              <img className="parking-image" src={`${process.env.REACT_APP_API_URL}/parkings/${id}.jpg`}></img>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}