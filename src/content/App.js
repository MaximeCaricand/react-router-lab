import styles from './App.module.css';
import React from 'react';
import { Route } from 'react-router-dom';
import { MQTT_URL, mqttClient } from '..';

import BrokerUrl from './BrokerUrl/BrokerUrl';
import SensorList from './SensorList/SensorList';
import Sensor from './Sensor/Sensor';

import { getlinkFromName } from '../index'


export default class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            mqttUrl: MQTT_URL,
            sensorList: [],
            currentSensor: null
        }
        mqttClient.on('updateSensor', (data) => {
            const dataToUpdate = data ? { sensorList: mqttClient.getSensorsNames() } : null;
            this.updateState(dataToUpdate);
        });
    }

    updateState(newState) {
        this.setState((state) => (Object.assign({}, state, newState)));
    }

    render() {
        const items = this.state.sensorList.map((sensorName, index) => {
            const link = `/${getlinkFromName(sensorName)}`;
            return <Route exact path={link} key={index} render={() =>
                <Sensor currentSensor={this.state.currentSensor} sensor={mqttClient.getSensor(sensorName)} />
            } />;
        });
        return (
            <div className="App">
                <div className="BrokerUrl"><BrokerUrl mqttUrl={this.state.mqttUrl} /></div>
                <div className={styles.App}>
                    <div className={styles.listsensors}>
                        <SensorList sensorList={this.state.sensorList} currentSensor={this.state.currentSensor}
                            onClick={(sensorName) => this.updateState({ currentSensor: sensorName })} />
                    </div>
                    <div className={styles.actualvalue}>{items}</div>
                </div>
            </div>
        );
    }
}