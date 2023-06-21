import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';

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

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/parking/${parking.parking.id}`);
    }

    let parkingtmp: IParking = parking.parking;
    return (
        <Item onClick={handleClick} className='home-parking'>{parkingtmp.name}</Item>
    )
}