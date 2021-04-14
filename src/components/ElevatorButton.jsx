import React, {useState, useEffect} from 'react';
import './ElevatorButton.css'

export default function ElevatorButton(props) {

    const [color, setColor] = useState('green');

    useEffect(() => {
        switch (props.text) {
            case 'Call':
                setColor('green');
                break;
            case 'Waiting':
                setColor('red');
                break;
            case 'Arrived':
                setColor('white-green');
                break;
            
            default:
                break;
        }
    }, [props.text])

    return (
    <button className={color} key={'btn'+(props.floor+1)} onClick={() =>props.callElevator(props.floor)}>{props.text}</button>
    );
}