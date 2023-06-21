
export interface ParkingSpotProps {
    children?: React.ReactNode;
    id: number;
    state: number;
    type: string;
    name: string;
    posX: number;
    posY: number;
}

export const ParkingSpot = (props: ParkingSpotProps) => {

    let spotWidth:string = props.type == 'carro' ? '170px' : '100px';
    let spotHeight:string = props.type == 'carro' ? '400px' : '330px';

    return (
        <div className="parking-spot" style={{
            backgroundColor: props.state == 1 ? 
                '#b85459' : props.state == 0 ? '#91b892' : '#cccccc',
            width: spotWidth,
            height: spotHeight,
            top: props.posY + 'px',
            left: props.posX + 'px',
        }}>
            <h1>{props.name}</h1>
        </div>
    )
}