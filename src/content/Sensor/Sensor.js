import styles from './Sensor.module.css'

export default function Sensor(props) {
    let currentValue = props.sensor.sensorValues.slice(-1)[0].value;
    console.log(props.sensor)
    switch(props.sensor.type){
        case "TEMPERATURE": 
            currentValue = Math.round(currentValue) + '  °F';
            break;
        case "PERCENT": 
            currentValue = Math.round(currentValue*100) + ' %';
            break;
        case "OPEN_CLOSE": break;
        default :
    }
    return (
        <div>
            <div className={styles.name}>{props.sensor.name}</div>
            <div className={styles.text}>Valeur actuel :</div>
            <div className={styles.value}>{currentValue}</div>
            <div className={styles.text}>Historiques :</div>
            <div className={styles.history}>{<TableHistory sensor={props.sensor} />}</div>
        </div>
    );
}

function TableHistory(props) {
    // slice limite l'affichage à 6 éléments
    
    const rows = props.sensor.sensorValues.sort((a, b) => b.date - a.date).slice(0, 6).map((sensorValue, index) => {
        return (
            <tr className={styles['ligne'+ (index % 2 ? "1" : "2")]} key={index}>
                <td>{props.sensor.type === "PERCENT"?Math.round(sensorValue.value*100) :sensorValue.value}</td>
                <td>{sensorValue.formatedDate}</td>
            </tr>
        )
    });
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