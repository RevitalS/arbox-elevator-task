import React, {useState, useEffect} from 'react';
import './Table.css';
import './ElevatorButton';
import './Elevator';
import ElevatorButton from './ElevatorButton';
import Elevator from './Elevator';


const initElavators = [{floor: 0, isAvalible: true, color:"black"},
 {floor: 0, isAvalible: true, color:"black"},
 {floor: 0, isAvalible: true, color:"black"},
 {floor: 0, isAvalible: true, color:"black"},
 {floor: 0, isAvalible: true, color:"black"}
]

export default function Table() {

   // const [elevatorsLocation, setElevatorsLocation] = useState([0,0,0,0,0]);
   // const [elevatorsAvailable, setElevatorsAvailable] = useState([true,true,true,true,true]);
    const [callsQueue, setCallsQueue] = useState([]);
    const [currentQueue, setCurrentQueue] = useState([]);
    const [buttonsText, setButtonsText] = useState(
        ['Call','Call','Call','Call','Call','Call','Call','Call','Call','Call'])


    const [elevatorsList, setElevatorsList] = useState(initElavators);

    useEffect(() => {
        if (callsQueue.length !== 0 && checkIfHasAvalibleElavator()) {
            callElevator(callsQueue[0]);
            setCallsQueue(callsQueue.slice(1));
        } 
        });

        useEffect(() => {
            if (currentQueue.length !== 0) 
            {
                const current = currentQueue[0];
                
                if (currentQueue.length === 1) {
                    setButtonsText(prev => prev.map((text,i) => i === current.floor ? 'Arrived': text));
                    setTimeout(() => { 
                    setElevatorsList(prev => prev.map((e,i) => {if (i  === current.num ){
                        let newE = e;
                        newE.floor = current.floor;
                        newE.isAvalible = false;
                        newE.color = "green-e";
                        return newE;
                        } else {return e}
                        }));
                    },20);
                }
                else {
                    setTimeout(() => { 
                        setElevatorsList(prev => prev.map((e,i) => {if (i  === current.num ){
                            let newE = e;
                            newE.floor = current.floor;
                            newE.isAvalible = false;
                            newE.color = "red-e";
                            return newE;
                            } else {return e}
                            }));
                        },20);
                }
                setCurrentQueue(currentQueue.slice(1));
            } 
            
            }, [currentQueue]);


    const addCallToQueue = (floor) => {
        setCallsQueue(old => [...old, floor]);
        
    } 

    const checkIfHasAvalibleElavator = () => {
        return (elevatorsList.some(e => e.isAvalible === true));
    }

    const findAvalibleElavators = () =>{
          const e = elevatorsList.map((e,i) =>  e.isAvalible === true ? 
          elevatorsList[i].floor: null);
          return e;
    }

    const moveElevator = (num, min, floor) => {
        setButtonsText(prev => prev.map((text,i) => i === floor ? 'Waiting': text));
        for (let i = 1; i <= min; i++) {
            let newFloor;
            if (elevatorsList[num].floor < floor) {
                newFloor = elevatorsList[num].floor+i;
            } else {
                newFloor = elevatorsList[num].floor-i;

            }
            setCurrentQueue(old => [...old, {num: num,floor:newFloor}]);
        }
    }

    const findcolsetElevator = (floor) => {

        const avalibleElevators = findAvalibleElavators();
        let elevatorNum; 

            const distance = avalibleElevators.map(e => e !== null ? Math.abs(floor - e): Infinity);
            const minDistance = Math.min(...distance);
            elevatorNum = distance.findIndex(x => x <= minDistance);
            moveElevator(elevatorNum, minDistance, floor);
            return elevatorNum;
    }


    const callElevator = (floor) => {
       const pStart = performance.now();
        const elevatorNum = findcolsetElevator(floor);

        if (currentQueue.length !== 0 ) {
            setCurrentQueue([]);
        }
            setElevatorsList(prev => prev.map((e,i) => 
            {if (i  === elevatorNum && e.color ==='red-e' ){
                let newE = e;
                newE.floor = floor;
                newE.isAvalible = false;
                newE.color = "green-e";
                return newE;
                } else {return e}
                }));
                
            const timeEnd = performance.now();
            console.log(timeEnd - pStart);
            setTimeout(() => { 
            setElevatorsList(prev => prev.map((e,i) =>{ 
                if (i  === elevatorNum) {
                    let ele = e;
                    e.isAvalible = true;
                    e.color = "black";
                    return ele;
                }else { return e}
            }));
            setButtonsText(prev => prev.map((text,i) => i === floor ? 'Call': text));
            }, 2000);


    }

    const floorLabel = (floor) => {
        if (floor === 0) {
            return 'Ground Floor'
        }
        if (floor === 1) {
            return '1st'
        }
        return floor+'th'
    }

    return (
        <div>
            <table>
                <tbody>
                    {[...Array(10)].map((v, row) => {
                        const floor = 10-row-1;
                     return (<tr key={row+1}>
                         <td className="clear-table-style floor-num" key={floor}>
                             <label className="clear-table-style ">{floorLabel(floor)}</label>
                        </td>
                        
                        {elevatorsList.map((e, col) => {
                            return (

                             <td className="cell" key={(floor+1)+""+(col + 1)}>
                                {elevatorsList[col].floor === floor ?
                                       
                                         <Elevator color={e.color}/>      
                                : null }
                            </td>
                            )
                            
                        })}
                        
                        <td className="clear-table-style button-waper">
                            <ElevatorButton key={floor} floor={floor} text={buttonsText[floor]} callElevator={addCallToQueue} elevatorsList={elevatorsList} />
                        </td>
                    </tr>)
                        })}
                </tbody>
            </table>
        </div>
    )
}