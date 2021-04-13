import React, {useState} from 'react';
import './ElevatorButton.css'

export default function ElevatorButton(props) {

    const [buttonStr, setButtonStr] = useState('Call');
    const [color, setColor] = useState('green');

    const onClick = () => {
        setButtonStr('Waiting');
        setColor('red');
        props.callElevator(props.floor);
    }

    return (
    <button className={color} key={'btn'+(props.floor+1)} onClick={onClick}>{buttonStr}</button>
    );
}