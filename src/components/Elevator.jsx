import React, {useState} from 'react';
import './Elevator.css'



export default function Elevator(props) {

    const checkIfElevetorHere = (row, col) => {
       // console.log(row, col);

        if (props.elevators[col].floor === row) {
            return true;
        }

        // if (props.elevatorsLocation[col] === row) {
        //    // debugger;
        //     return true;
        // }
        return false;
    }

    return (
        checkIfElevetorHere(props.floor, props.col)?
        <img className={props.elevators[props.col].color} src={props.elevatorIcon} alt='elevator'/>
        :
        null
    );
}