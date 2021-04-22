import styles from './Sensor.module.css'


export default function Sensor(props) {
    console.log(props.sensor);
    const index = props.sensor.valueHistory.length - 1;
    return (
        <div>
            <div className={styles.name}>{props.sensor.name}</div>
            <div className={styles.text}>Valeur actuel :</div>
            <div className={styles.value}>{props.sensor.valueHistory[index]}</div>
            <div className={styles.text}>Historiques :</div>
            <div className={styles.history}>{tableHistory(props.sensor.valueHistory)}</div>
        </div>
    );
}

function tableHistory(tab){
    const index = tab.length;
    return (
        <div className={styles.table}>
            <div className={styles.case1}>{tab[index-2]}</div>
            <div className={styles.case2}>{tab[index-3]}</div>
            <div className={styles.case3}>{tab[index-4]}</div>
            <div className={styles.case4}>{tab[index-5]}</div>
            <div className={styles.case5}>{tab[index-6]}</div>
            <div className={styles.case6}>{tab[index-7]}</div>
        </div>
    );
}