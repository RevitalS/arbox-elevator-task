import React, {useState} from 'react';
import './ElevatorButton.css'

export default function ElevatorButton(props) {

    const [buttonStr, setButtonStr] = useState('Call');

    return (
    <button key={'btn'+(props.index+1)}>{buttonStr}</button>
    );
}