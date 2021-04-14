export default class Sensor {
    constructor({ name, type, value }) {
        this._name = this.checkType(name, 'string');
        this._type = this.checkType(type, 'string');
        this._valueHistory = [this.checkType(value, 'string')];
    }
    get name() {
        return this._name;
    }
    get type() {
        return this._type;
    }
    get valueHistory() {
        return this._valueHistory;
    }
    addValue(value) {
        this._valueHistory.push(value);
    }
    checkType(value, type) {
        if (typeof value !== type) {
            throw new Error(`Error on value ${value}, expected type : ${type}`);
        }
        return value;
    }
    toString() {
        let res = `{name: ${this.name}, type: ${this.type}, data: {`;
        this._valueHistory.forEach(val => res += `${val}, `);
        return res + '}}';
    }
}