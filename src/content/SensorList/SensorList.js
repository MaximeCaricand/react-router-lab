import styles from './SensorList.module.css';
import { Link } from 'react-router-dom';
import { getlinkFromName } from '../../index'

export default function SensorList(props) {
    const items = props.sensorList.map((sensorName, index) => {
        const isSelected = props.currentSensor === sensorName;
        return <SensorName key={index} name={sensorName} index={index} isSelected={isSelected} onClick={() => props.onClick(sensorName)} />;
    });
    return (
        <div>
            {items}
        </div>
    );
}

function SensorName(props) {
    const link = `/${getlinkFromName(props.name)}`;
    const isPair = props.index % 2 ? 'odd' : 'pair';
    const isSelected = props.isSelected ? 'normalLink' : 'selectedLink';
    return (
        <Link to={link} >
            <div className={`${styles.Link} ${styles[isPair]} ${styles[isSelected]}`} key={props.index} onClick={props.onClick}>
                {props.name}
            </div>
        </Link>
    );
}
