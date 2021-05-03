import styles from './Sensor.module.css'

export default function Sensor(props) {
    const currentValue = handleSensorValueType(props.sensor.currentSensorValue.value, props.sensor.type);

    return (
        <div>
            <div id="name" className={styles.name}>{props.sensor.name}</div>
            <div className={styles.text}>Valeur actuelle :</div>
            <div id="currentvalue" className={styles.value}>{currentValue}</div>
            <div className={styles.text}>Historiques :</div>
            <div className={styles.history}>{<TableHistory sensor={props.sensor} />}</div>
        </div>
    );
}

function TableHistory(props) {
    // slice limite l'affichage à 6 éléments
    const rows = props.sensor.sensorValues.sort((a, b) => b.date - a.date).slice(0, 6).map((sensorValue, index) => {
        return (
            <tr className={styles['ligne' + (index % 2 ? "1" : "2")]} key={index}>
                <td id={"value"+index}>{handleSensorValueType(sensorValue.value, props.sensor.type)}</td>
                <td>{sensorValue.formatedDate}</td>
            </tr>
        );
    });
    // const rowsLength = rows.length;
    // console.log(6 - rowsLength);
    // for (let i = rowsLength; i <= 6 - rowsLength; i++) {
    //     rows.push(
    //         <tr className={styles['ligne' + (i % 2 ? "1" : "2")]} key={i}>
    //             <td>&nbsp;</td>
    //             <td>&nbsp;</td>
    //         </tr>
    //     )
    // }
    return (
        <table className={styles.table}>
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

function handleSensorValueType(value, type) {
    switch (type) {
        case "TEMPERATURE":
            return parseFloat(value).toFixed(2) + '  °F';
        case "PERCENT":
            return parseFloat(value * 100).toFixed(2) + ' %';
        default:
            return value;
    }
}