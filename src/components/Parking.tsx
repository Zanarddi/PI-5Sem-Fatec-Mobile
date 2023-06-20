import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

export interface IParking {
    parkingSpots: any[];
    id: number;
    name: string;
    cep: string;
    numero: number;
    codConvite: string;
}

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    textAlign: 'start',
    color: theme.palette.text.secondary,
    paddingTop: '1.5em',
    paddingBottom: '1.5em',
    paddingLeft: '1em',
    paddingRight: '1em',
    flexGrow: 1,
  }));

export const Parking = (parking: any) => {
    console.log(parking.name);
    let parkingtmp: IParking = parking.parking;
    return (
        <Item className='home-parking'>{parkingtmp.name}</Item>
    )
}