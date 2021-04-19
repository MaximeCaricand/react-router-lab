import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import MQTTSensors from './model/mqttClient';
import { BrowserRouter } from 'react-router-dom'
export const MQTT_URL = 'ws://random.pigne.org:9001'
export const mqttClient = new MQTTSensors();
mqttClient.startMQTT(MQTT_URL);

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();