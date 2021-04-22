import styles from './Sensor.module.css'

export default function Sensor(props) {
    const currentValue = props.sensor.sensorValues.slice(-1)[0].value;
    return (
        <div>
            <div className={styles.name}>{props.sensor.name}</div>
            <div className={styles.text}>Valeur actuel :</div>
            <div className={styles.value}>{currentValue}</div>
            <div className={styles.text}>Historiques :</div>
            <div className={styles.history}>{<TableHistory tab={props.sensor.sensorValues} />}</div>
        </div>
    );
}

function TableHistory(props) {
    // slice limite l'affichage à 6 éléments
    const rows = props.tab.sort((a, b) => b.date - a.date).slice(0, 6).map((sensorValue, index) => {
        return (
            <tr key={index}>
                <td>{sensorValue.value}</td>
                <td>{sensorValue.formatedDate}</td>
            </tr>
        )
    });
    return (
        <table>
            <thead>
                <tr>
                    <th>{'Valeur du capteur'}</th>
                    <th>{'Date d\'acquisition'}</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    );
}