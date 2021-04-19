import './Sensor.css'


export default function Sensor(props) {
    console.log(props.sensor);
    return (
        <div>
            <p>{props.sensor.name}</p>
        </div>
    );
}