import React from 'react';
import styles from './BrokerUrl.module.css';
import { DEFAULT_URl } from '../../utils';

export default class BrokerUrl extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            url: this.props.mqttUrl
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ url: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.onSubmit(this.state.url);
    }

    render() {
        return (
            <div>
                <div>URL du serveur MQTT</div>
                <form onSubmit={this.handleSubmit} autoComplete="on">
                    <input className={styles['mqtt-url-link']} type='url' name="url" placeholder={DEFAULT_URl} onChange={this.handleChange} />
                    <button className={styles['mqtt-url-button']} onClick={this.handleSubmit}>connection</button>
                </form>
            </div>
        );
    }
}
