import './BrokerUrl.css';

export default function BrokerUrl(props) {
    return (
        <div className="mqtt-url">
            <p>URL du serveur MQTT</p>
            <a className="mqtt-url-link" href={props.mqttUrl}>{props.mqttUrl}</a>
        </div>
    );
}