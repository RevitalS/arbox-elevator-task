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

    const [elevatorsLocation, setElevatorsLocation] = useState([0,0,0,0,0]);
    const [elevatorsAvailable, setElevatorsAvailable] = useState([true,true,true,true,true]);
    const [callsQueue, setCallsQueue] = useState([]);

    const [elevatorsList, setElevatorsList] = useState(initElavators);

    useEffect(() => {
        if (callsQueue.length !== 0 && checkIfHasAvalibleElavator()) {
          //  console.log(callsQueue , 'queue')
            const call = callsQueue;
           // console.log(callsQueue.slice(1), "q after slice");
           // let call1 = callsQueue.shift();
            //console.log(call1);
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
       // debugger
        // let elevatorNum = elevatorsLocation.findIndex(x => floor === x);
        // if (elevatorNum >= 0) {
        //     return elevatorNum;
        // }
        // if (!checkIfHasAvalibleElavator()) {
        //     console.log('unavalible');
        //     return null;
        // }
        const avalibleElevators = findAvalibleElavators();
        let elevatorNum; //= elevatorsLocation.findIndex(x => floor === x);
        //= elevatorsLocation.map((e ,i) =>  elevatorsAvailable[i] === true? e : null);
       // console.log(avalibleElevators, 'avalibleElevators');
        //if (avalibleElevators.length > 0) {
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
        //console.log(elevatorNum, 'e n');
       // if (elevatorNum !== null) {
        //     setElevatorsAvailable(prev => prev.map((e,i) => i  === elevatorNum ? false: e));
        //     setElevatorsLocation(prev => prev.map((e,i) => i  === elevatorNum ? floor: e));
        //     console.log(elevatorsAvailable);
        //     const timeEnd = performance.now();
        //     console.log(timeEnd - pStart);
        //     const time = setTimeout(() => { 
        //     setElevatorsAvailable(prev => prev.map((e,i) => i  === elevatorNum ? true: e));
        // //        console.log(elevatorsAvailable);
        //     }, 2000);
            
            //setElevatorsAvailable(prev => prev.map((e,i) => i  === elevatorNum ? false: e));
            setElevatorsList(prev => prev.map((e,i) => {if (i  === elevatorNum ){
                let newE = e;
                newE.floor = floor;
                newE.isAvalible = false;
                newE.color = "green-e";
                return newE;
                } else {return e}
                }));
                // setElevatorsList(prev => prev.map((e,i) => i  === elevatorNum ? 
                // {...e, [e.floor]:floor, [e.isAvalible]:false}: e));
             //   console.log(elevatorsList);
            //console.log(elevatorsAvailable);
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

              //  console.log(elevatorsList);
            }, 2000);
           // console.log(elevatorsLocation, 'el');
       // }

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
                                elevatorsLocation={elevatorsLocation} floor={floor} col={col} 
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