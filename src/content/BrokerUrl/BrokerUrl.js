import styles from './BrokerUrl.module.css';

export default function BrokerUrl(props) {
    return (
        <div>
            <div>URL du serveur MQTT</div>
            <form id="form" action="http://localhost:3000/" method="GET">
                <input id="url" name="url" className={styles['mqtt-url-link']} type='url' defaultValue={props.mqttUrl} />
            </form>
        </div>
    );
}
