import './App.css';
import React from 'react';
import { Link } from 'react-router-dom'
import { MQTT_URL, mqttClient } from '.'

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

function BrokerUrl(props) {
    return (
        <div className="mqtt-url">
            <p>URL du serveur MQTT</p>
            <a className="mqtt-url-link" href={props.mqttUrl}>{props.mqttUrl}</a>
        </div>
    );
}

function SensorList(props) {
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