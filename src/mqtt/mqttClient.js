import { connect } from 'mqtt';
import Sensor from './SensorModel';
import { EventEmitter } from 'events'

export default class MQTTSensors extends EventEmitter {

    constructor() {
        super();
        /** @type {Array<Sensor>} */
        this._sensors = [];
        this._isConnected = false;
        this.client = null;
    }

    get sensors() {
        return this._sensors;
    }
    get isConnected() {
        return this.client?.connected;
    }

    startMQTT(url) {
        if (this.client) {
            this.client.end();
        }
        try {
            this.client = connect(url);
            this.client.on('connect', () => {
                console.log('connected');
                this.client.subscribe('value/+', (_, granted) => {
                    granted.forEach(entry => { // maybe useless ...
                        console.log(`subscribed to ${entry.topic}`);
                    });
                });
            });
            this.client.on('message', (_, message) => {
                const data = JSON.parse(message);
                this.updateSensorValues(data);
            });
        } catch (error) {
            console.log(error);
        }

    }

    /**
     * Return a sensor if it exist in the sensorList
     * @param {string} name 
     * @returns {Sensor}
     */
    getSensor(name) {
        return this.sensors.find(sensor => sensor.name === name);
    }

    /**
     * Return the list of all the sensors in the sensorList
     * @returns {Array<string>}
     */
    getSensorsNames() {
        return this._sensors.map(sensor => sensor.name);
    }

    /**
     * If the sensor is in the sensorList, add a value, create the sensor otherwise
     * @param {any} newSensor 
     */
    updateSensorValues(newSensor) {
        const curentSensor = this.getSensor(newSensor.name);
        if (curentSensor) {
            curentSensor.addValue(newSensor.value);
        } else {
            this._sensors.push(new Sensor(newSensor));
        }
        this.emit('updateSensor', newSensor.name);
    }
}