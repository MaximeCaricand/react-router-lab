import './App.css';
import React from 'react';
import { MQTT_URL, mqttClient } from '..'

import BrokerUrl from './BrokerUrl/BrokerUrl'
import SensorList from './SensorList/SensorList'

export default class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            mqttUrl: MQTT_URL,
            sensorList: [],
            curentSensor: null,
        }
        mqttClient.on('addSensor', () => this.updateState({ sensorList: mqttClient.getSensorsNames() }));
        // mqttClient.on('updateSensor', (curentSensor) => this.updateState({ curentSensor }));
    }

    updateState(newState) {
        this.setState((state) => (Object.assign({}, state, newState)));
    }

    render() {
        return (
            <div className="App">
                <div className="BrokerUrl"><BrokerUrl mqttUrl={this.state.mqttUrl} /></div>
                <div className="SensorList"><SensorList sensorList={this.state.sensorList} /></div>
            </div>
        );
    }
}