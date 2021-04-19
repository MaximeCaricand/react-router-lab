import './SensorList.css';
import { Link } from 'react-router-dom';

export default function SensorList(props) {
    const items = [];
    props.sensorList.forEach((sensorName, index) => {
        items.push(<SensorName key={index} name={sensorName} />);
    });
    return (
        <div className="Sensor">
            <p>SensorList</p>
            {items}
        </div>
    );
}

function SensorName(props) {
    const link = `/${getlinkFromName(props.name)}`;
    return (
        <div className="sensorName">
            <Link to={link}>{props.name}</Link>
        </div>
    );
}


function getlinkFromName(sensorName) {
    return sensorName.replaceAll(' ', '_');
}