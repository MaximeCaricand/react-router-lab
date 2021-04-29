import styles from './App.module.css';
import React from 'react';
import { Route } from 'react-router-dom';
import { mqttClient, getlinkFromName, getUrlCookie, setUrlCookie } from '..';
import logo from '../404.png';
import BrokerUrl from './BrokerUrl/BrokerUrl';
import SensorList from './SensorList/SensorList';
import Sensor from './Sensor/Sensor';

export default class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            mqttUrl: getUrlCookie(),
            sensorList: [],
            currentSensor: null
        }
        this.handleBrokerInputSubmit = this.handleBrokerInputSubmit.bind(this);
    }

    componentDidMount() {
        mqttClient.on('updateSensor', (data) => {
            const dataToUpdate = data ? { sensorList: mqttClient.getSensorsNames() } : null;
            this.updateState(dataToUpdate);
        });
    }

    updateState(newState) {
        this.setState((state) => (Object.assign({}, state, newState)));
    }

    renderAppContent() {
        if (mqttClient.isConnected) {
            const items = this.state.sensorList.map((sensorName, index) => {
                const link = `/${getlinkFromName(sensorName)}`;
                return <Route exact path={link} key={index} render={() =>
                    <Sensor currentSensor={this.state.currentSensor} sensor={mqttClient.getSensor(sensorName)} />
                } />;
            });
            return (
                <div className={styles.content}>
                    <div className={styles.listsensors}>
                        <SensorList sensorList={this.state.sensorList} currentSensor={this.state.currentSensor}
                            onClick={(sensorName) => this.updateState({ currentSensor: sensorName })} />
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

    handleBrokerInputSubmit(url) {
        setUrlCookie(url);
        this.updateState({ mqttUrl: url });
    }

    render() {
        return (
            <div className={styles.app}>
                <div className={styles.broker}><BrokerUrl mqttUrl={this.state.mqttUrl} onSubmit={this.handleBrokerInputSubmit} /></div>
                {this.renderAppContent()}
                <footer className={styles.footer} >
                    <em>By Maxime CARICAND and Alexis LABBE</em>
                </footer>
            </div>
        );
    }
}