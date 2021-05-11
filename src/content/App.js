import styles from './App.module.css';
import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { getlinkFromName, getUrlCookie, setUrlCookie } from '../utils';
import logo from '../404.png';
import BrokerUrl from './BrokerUrl/BrokerUrl';
import SensorList from './SensorList/SensorList';
import Sensor from './Sensor/Sensor';
import MQTTSensors from '../mqtt/mqttClient';

export default function App(props) {

    const [mqttClient] = useState(new MQTTSensors());
    const [mqttUrl, setMqttUrl] = useState(getUrlCookie());
    const [sensorList, setSensorList] = useState([]);
    const [currentSensor, setCurrentSensor] = useState(null);

    useEffect(() => {
        if (mqttUrl) {
            mqttClient.startMQTT(mqttUrl);
        }
        const listenerEvent = 'updateSensor';
        if (mqttClient.listenerCount(listenerEvent)) {
            mqttClient.removeAllListeners(listenerEvent);
        }
        mqttClient.on(listenerEvent, () => {
            setSensorList(mqttClient.sensors);
        });
    }, [mqttClient, mqttUrl]);

    function renderAppContent() {
        if (mqttClient.isConnected) {
            const items = sensorList.map((sensor, index) => {
                const link = `/${getlinkFromName(sensor.name)}`;
                return <Route exact path={link} key={index} render={() =>
                    <Sensor currentSensor={currentSensor} sensor={sensor} />
                } />;
            });
            return (
                <div id="content" className={styles.content}>
                    <div className={styles.listsensors}>
                        <SensorList sensorNames={mqttClient.getSensorsNames()} currentSensor={currentSensor}
                            onClick={(sensorName) => setCurrentSensor(sensorName)} />
                    </div>
                    <div className={styles.actualvalue}>{items}</div>
                </div>
            )
        } else if (mqttUrl) {
            return (
                <div className={styles.wrongURL}>
                    <img className={styles.image} src={logo} alt=""></img>
                    <div id="textDefault">L'URL entrée n'a rien donnée</div>
                </div>
            )
        }
    }

    function handleBrokerInputSubmit(url) {
        setMqttUrl(url);
        setUrlCookie(url);
        mqttClient.startMQTT(url);
    }

    return (
        <div className={styles.app}>
            <div className={styles.broker}><BrokerUrl mqttUrl={mqttUrl} onSubmit={handleBrokerInputSubmit} /></div>
            {renderAppContent()}
            <footer className={mqttUrl ? styles['url-footer'] : styles['no-url-footer']} >
                <em>By Maxime CARICAND and Alexis LABBE</em>
            </footer>
        </div>
    );
}