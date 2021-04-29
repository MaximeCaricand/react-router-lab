import styles from './App.module.css';
import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { getlinkFromName, getUrlCookie, setUrlCookie } from '../utils';
import logo from '../404.png';
import BrokerUrl from './BrokerUrl/BrokerUrl';
import SensorList from './SensorList/SensorList';
import Sensor from './Sensor/Sensor';

export default function App(props) {

    const [mqttClient, setMqttClient] = useState(props.mqttClient);
    const [mqttUrl, setMqttUrl] = useState(getUrlCookie());
    const [sensorList, setSensorList] = useState([]);
    const [currentSensor, setCurrentSensor] = useState(null);

    useEffect(() => {
        mqttClient.startMQTT(mqttUrl);
        mqttClient.on('updateSensor', (data) => {
            if (data) {
                setSensorList(mqttClient.getSensorsNames());
            }
            setMqttClient(mqttUrl);
        });
    })

    function renderAppContent() {
        if (mqttClient.isConnected) {
            const items = sensorList.map((sensorName, index) => {
                const link = `/${getlinkFromName(sensorName)}`;
                return <Route exact path={link} key={index} render={() =>
                    <Sensor currentSensor={currentSensor} sensor={mqttClient.getSensor(sensorName)} />
                } />;
            });
            return (
                <div className={styles.content}>
                    <div className={styles.listsensors}>
                        <SensorList sensorList={sensorList} currentSensor={currentSensor}
                            onClick={(sensorName) => setCurrentSensor(sensorName)} />
                    </div>
                    <div className={styles.actualvalue}>{items}</div>
                </div>
            )
        } else {
            return (
                <div className={styles.wrongURL}>
                    <img className={styles.image} src={logo} alt=""></img>
                    <div>L'URL entrée n'a rien donnée</div>
                </div>
            )
        }
    }

    function handleBrokerInputSubmit(url) {
        setUrlCookie(url);
        setMqttUrl(url);
        mqttClient.startMQTT(mqttUrl);
    }

    return (
        <div className={styles.app}>
            <div className={styles.broker}><BrokerUrl mqttUrl={mqttUrl} onSubmit={handleBrokerInputSubmit} /></div>
            {renderAppContent()}
            <footer className={styles.footer} >
                <em>By Maxime CARICAND and Alexis LABBE</em>
            </footer>
        </div>
    );
}