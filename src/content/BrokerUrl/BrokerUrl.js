import React, { useState } from 'react';
import styles from './BrokerUrl.module.css';
import { DEFAULT_URl } from '../../utils';

export default function BrokerUrl(props) {

    const [url, setUrl] = useState(props.mqttUrl);

    function handleChange(event) {
        setUrl(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        props.onSubmit(url);
    }

    return (
        <div>
            <div>URL du serveur MQTT</div>
            <form onSubmit={handleSubmit} autoComplete="on">
                <input className={styles['mqtt-url-link']} type='url' name="url" defaultValue={url} placeholder={DEFAULT_URl} onChange={handleChange} />
                <button className={styles['mqtt-url-button']} onClick={handleSubmit}>connexion</button>
            </form>
        </div>
    );
}