export default class Sensor {
    constructor({ name, type, value }) {
        this._name = checkType(name, 'string');
        this._type = checkType(type, 'string');
        this._sensorValues = [];
        this.addValue(value);
    }
    get name() {
        return this._name;
    }
    get type() {
        return this._type;
    }
    get sensorValues() {
        return this._sensorValues;
    }
    addValue(value) {
        this._sensorValues.push(new SensorValue(value));
    }
    toString() {
        let res = `{name: ${this.name}, type: ${this.type}, data: {`;
        this._sensorValues.forEach(sensorValue => res += `${sensorValue.toString()},`);
        return res + '}}';
    }
}

export class SensorValue {
    constructor(value) {
        this._value = checkType(value, 'string');
        this._date = Date.now();
    }
    get value() {
        return this._value;
    }
    get date() {
        return this._date;
    }
    get formatedDate() {
        return new Date(this.date).toLocaleString();
    }
    toString() {
        return `{value: ${this.value}, date: ${this.date}}`;
    }
}

function checkType(value, type) {
    if (typeof value !== type) {
        throw new Error(`Error on value ${value}, expected type : ${type}`);
    }
    return value;
}