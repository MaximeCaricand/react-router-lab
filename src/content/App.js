import styles from './App.module.css';
import React from 'react';
import { Route } from 'react-router-dom';
import { MQTT_URL, mqttClient } from '..';

import BrokerUrl from './BrokerUrl/BrokerUrl';
import SensorList from './SensorList/SensorList';
import Sensor from './Sensor/Sensor';

export default class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            mqttUrl: MQTT_URL,
            sensorList: [],
        }
        mqttClient.on('addSensor', () => this.updateState({ sensorList: mqttClient.getSensorsNames() }));
        // mqttClient.on('updateSensor', (curentSensor) => this.updateState({ curentSensor }));
    }

    updateState(newState) {
        this.setState((state) => (Object.assign({}, state, newState)));
    }

    render() {

        const items = [];
        
        this.state.sensorList.forEach((sensorName, index) => {
            const link = `/${getlinkFromName(sensorName)}`;
            items.push(<Route exact path={link} key={index} render={() => <Sensor sensor={mqttClient.getSensor(sensorName)} />} />);
        });

        return (
            <div className="App">
                <div className="BrokerUrl"><BrokerUrl mqttUrl={this.state.mqttUrl} /></div>
                <div className={styles.App}>
                    <div className={styles.listsensors}><SensorList sensorList={this.state.sensorList} /></div>
                    <div className={styles.actualvalue}>{items}</div>
                    <div className={styles.history}></div>
                </div>
            </div>
        );
    }
}

function getlinkFromName(sensorName) {
    return sensorName.replaceAll(' ', '_');
}