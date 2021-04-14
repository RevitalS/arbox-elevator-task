import './Elevator.css'
import elevatorIcon from '../icons-elevator.svg';




export default function Elevator(props) {

    return (
        <img className={props.color} src={elevatorIcon} alt='elevator'/>
    );
}