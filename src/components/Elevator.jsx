import React, {useState} from 'react';
import './Elevator.css'



export default function Elevator(props) {

    const checkIfElevetorHere = (row, col) => {
       // console.log(row, col);
        if (props.elevatorsLocation[col] === row) {
           // debugger;
            return true;
        }
        return false;
    }

    return (
        checkIfElevetorHere(props.floor, props.col)?
        <img className="elevator" src={props.elevatorIcon} alt='elevator'/>
        :
        null
    );
}