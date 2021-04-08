import React, {useState} from 'react';
import './Table.css';
import './ElevatorButton';
import './Elevator';
import ElevatorButton from './ElevatorButton';
import elevatorIcon from '../icons-elevator.svg';
import Elevator from './Elevator';


const checkIfElevetorHere = (row, col) => {
    if (elevatorIcon[col] === row) {
        return true;
    }
    return false;
}

export default function Table() {

    const [elevatorsLocation, setElevatorsLocation] = useState([0,0,0,0,0]
        )

    return (
        <div>
            <table>
                <tbody>
                    {[...Array(10)].map((v, row) => {
                        const floor = 10-row-1;
                     return (<tr key={row+1}>
                         <td className="clear-table-style" key={floor}>
                             <label className="clear-table-style">{floor+'th'}</label>
                        </td>
                        {[...Array(5)].map((e, col) => {
                            return <td className="" key={col + 1}>
                                <Elevator elevatorIcon={elevatorIcon} elevatorsLocation={elevatorsLocation} floor={floor} col={col} ></Elevator>
                            </td>
                        })}
                        <td className="clear-table-style">
                            <ElevatorButton index={floor}/>
                        </td>
                    </tr>)
                        })}
                </tbody>
            </table>
        </div>
    )
}