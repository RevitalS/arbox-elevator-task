import React, {useState} from 'react';
import './Elevator.css'



export default function Elevator(props) {

    const checkIfElevetorHere = (row, col) => {
        if (props.elevatorsLocation[col] === row) {
            return true;
        }
        return false;
    }

    return (
        checkIfElevetorHere(props.floor, props.col)?
        <img src={props.elevatorIcon} alt='elevator'/>
        :
        null
    );
}