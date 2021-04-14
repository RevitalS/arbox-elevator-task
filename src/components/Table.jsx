import React, {useState, useEffect} from 'react';
import './Table.css';
import './ElevatorButton';
import './Elevator';
import ElevatorButton from './ElevatorButton';
import elevatorIcon from '../icons-elevator.svg';
import Elevator from './Elevator';
import useSound from 'use-sound';



const initElavators = [{floor: 0, isAvalible: true, color:"black"},
 {floor: 0, isAvalible: true, color:"black"},
 {floor: 0, isAvalible: true, color:"black"},
 {floor: 0, isAvalible: true, color:"black"},
 {floor: 0, isAvalible: true, color:"black"}
]
//let callQueue =[];

export default function Table() {

   // const [elevatorsLocation, setElevatorsLocation] = useState([0,0,0,0,0]);
   // const [elevatorsAvailable, setElevatorsAvailable] = useState([true,true,true,true,true]);
    const [callsQueue, setCallsQueue] = useState([]);

    const [elevatorsList, setElevatorsList] = useState(initElavators);

    useEffect(() => {
        if (callsQueue.length !== 0 && checkIfHasAvalibleElavator()) {
            callElevator(callsQueue[0]);
            setCallsQueue(callsQueue.slice(1));
        } 
        });

    const addCallToQueue = (floor) => {
       // console.log(floor);
        setCallsQueue(old => [...old, floor]);
        
    } 

    const checkIfHasAvalibleElavator = () => {
        return (elevatorsList.some(e => e.isAvalible === true));
    }

    const findAvalibleElavators = () =>{
          const e = elevatorsList.map((e,i) =>  e.isAvalible === true ? 
          elevatorsList[i].floor: null);
        //  console.log(e);
          return e;
    }

    const findcolsetElevator = (floor) => {

        const avalibleElevators = findAvalibleElavators();
        let elevatorNum; 

            const distance = avalibleElevators.map(e => e !== null ? Math.abs(floor - e): Infinity);
           // console.log(distance);
            const minDistance = Math.min(...distance);
            elevatorNum = distance.findIndex(x => x <= minDistance);
            //console.log(elevatorNum);
            return elevatorNum;
        //}
    }

    const callElevator = (floor) => {
       // debugger;
       const pStart = performance.now();
        const elevatorNum = findcolsetElevator(floor);

            setElevatorsList(prev => prev.map((e,i) => {if (i  === elevatorNum ){
                let newE = e;
                newE.floor = floor;
                newE.isAvalible = false;
                newE.color = "green-e";
                return newE;
                } else {return e}
                }));
            const timeEnd = performance.now();
            console.log(timeEnd - pStart);
            const time = setTimeout(() => { 
            setElevatorsList(prev => prev.map((e,i) =>{ if (i  === elevatorNum) {
                let ele = e;
                e.isAvalible = true;
                e.color = "black";
                return ele;
             }else { return e}
        }));
            }, 2000);


    }

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
                            return <td className="" key={(row+1)+""+(col + 1)}>
                                <Elevator elevatorIcon={elevatorIcon} 
                                 floor={floor} col={col} 
                                elevators={elevatorsList}
                                >
                                </Elevator>
                            </td>
                        })}
                        <td className="clear-table-style button-waper">
                            <ElevatorButton key={floor} floor={floor} callElevator={addCallToQueue}/>
                        </td>
                    </tr>)
                        })}
                </tbody>
            </table>
        </div>
    )
}