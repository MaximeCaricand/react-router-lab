import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './content/App';
import reportWebVitals from './reportWebVitals';
import MQTTSensors from './mqtt/mqttClient';
import { BrowserRouter } from 'react-router-dom'
export const mqttClient = new MQTTSensors();
mqttClient.url = getUrlCookie()
mqttClient.startMQTT();

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

export function getlinkFromName(sensorName) {
    return sensorName.replaceAll(' ', '_');
}

function getUrlCookie() {
    const defaultURl = 'ws://random.pigne.org:9001';
    const urlCookie = document.cookie.split(';').find(cookie => cookie.startsWith(' mqttUrl='));
    if (urlCookie) {
        return urlCookie.split('=').pop();
    }
    document.cookie = 'mqttUrl=' + defaultURl;
    return defaultURl;
}