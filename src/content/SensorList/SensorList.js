import styles from './SensorList.module.css';
import { Link } from 'react-router-dom';

export default function SensorList(props) {
    const items = [];
    let cpt = 0;
    props.sensorList.forEach((sensorName, index) => {
        items.push(<div className = {styles["sensor"+ ++cpt]}><SensorName key={index} name={sensorName} /></div>);
    });
    return (
        <div className={styles.Sensors}>
            {items}
        </div>
    );
}

function SensorName(props) {
    const link = `/${getlinkFromName(props.name)}`;
    return (
        <div className={styles.lien}>
            <Link to={link}>{props.name}</Link>
        </div>
    );
}


function getlinkFromName(sensorName) {
    return sensorName.replaceAll(' ', '_');
}

