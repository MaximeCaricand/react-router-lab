import { fireEvent, render } from '@testing-library/react';
import App from './App';
import ReactDOM from 'react-dom'
import { act } from "react-dom/test-utils";
import { unmountComponentAtNode } from "react-dom";
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import BrokerUrl from './BrokerUrl/BrokerUrl';
import SensorList from './SensorList/SensorList';
import Sensor from './Sensor/Sensor';
import { Route } from 'react-router-dom';
import { setUrlCookie, getUrlCookie } from '../utils';
import MQTTSensors from '../mqtt/mqttClient';

let container = null;
beforeEach(() => {
    // met en place un élément DOM comme cible de rendu
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // nettoie en sortie de test
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

test('renders learn react link', () => {
    render(<App />);
});

it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<App />, div)
})

describe("Test de BrokerURL", () => {
    it('Contenu de l\'url', () => {
        act(() => {
            render(
                <BrokerUrl mqttUrl="Une url" onSubmit={() => "test"} />, container);
        });

        //Recupération du bouton pour la simulation de click
        const input = document.querySelector("input");

        expect(input.value).toBe("Une url");
    });

    it('Appel de la fonction sur le click', () => {
        const uneFonction = jest.fn();
        act(() => {
            render(
                <BrokerUrl mqttUrl="Une url" onSubmit={uneFonction} />, container);
        });

        //Recupération du bouton pour la simulation de click
        const button = document.querySelector("#bouton");

        act(() => {
            button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });

        expect(uneFonction).toHaveBeenCalled();
    });


    it('Changement de l\'url', () => {
        const uneFonction = jest.fn();
        act(() => {
            render(
                <BrokerUrl mqttUrl="Une url" onSubmit={uneFonction} />, container);
        });

        //Recupération du bouton pour la simulation de click
        const input = document.querySelector("input");

        act(() => {
            fireEvent.change(input, { target: { value: 'test' } })
        });

        expect(input.value).toBe("test");
    });
});


describe("Test de SensorList", () => {
    it('Une sensor list avec 5 sensors', () => {
      const uneFonction = jest.fn();
      let names = ["sensor 1", "sensor 2", "sensor 3", "sensor 4", "sensor 5"];
      act(() => {
          render(
              <BrowserRouter>
                  <SensorList sensorList={names} currentSensor={"sensor 1"} onClick={uneFonction} />

              </BrowserRouter>, container)
      });

      const button = document.querySelector("#sensor1");


      act(() => {
          button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      });

      expect(uneFonction).toHaveBeenCalled();
    });

    it('Fonction onClick', () => {
        const uneFonction = jest.fn();
        let names = ["sensor 1", "sensor 2", "sensor 3"];
        act(() => {
            render(
                <BrowserRouter>
                    <SensorList sensorNames={names} currentSensor={"sensor2"} onClick={uneFonction} />
                    <Route exact path={"/sensor_2"} key={1} />
                </BrowserRouter>, container)
        });

        const button = document.querySelector("#sensor1");


        act(() => {
            button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });

        expect(uneFonction).toHaveBeenCalled();
    });
});

describe("Test de util.js", () => {
    it('Fonction sur les cookies', () => {
        setUrlCookie("Une url");

        expect(getUrlCookie()).toBe("Une url");
    });
});

describe("Test de Sensor", () => {
    it('Vérification de valeur : name', () => {
        let sensor = {
            'name': "sensor test",
            'currentSensorValue': { 'value': 10, 'formatedDate': '10' },
            'type': "TEMPERATURE",
            'sensorValues': [{ 'value': 10, 'formatedDate': '10' }, { 'value': 10, 'formatedDate': '10' }]
        };
        act(() => {
            render(
                <Sensor currentSensor={"sensor test"} sensor={sensor} />, container)
        });

        const div = document.querySelector("#name");

        expect(div.textContent).toBe("sensor test");
    });

    it('Vérification de valeur : currentValue', () => {
        let sensor = {
            'name': "sensor test",
            'currentSensorValue': { 'value': 0.5, 'formatedDate': '10' },
            'type': "PERCENT",
            'sensorValues': [{ 'value': 0.49, 'formatedDate': '10' }, { 'value': 0.48, 'formatedDate': '10' }]
        };
        act(() => {
            render(
                <Sensor currentSensor={"sensor test"} sensor={sensor} />, container)
        });

        const div = document.querySelector("#currentvalue");

        expect(div.textContent).toBe("50.00 %");
    });

    it('Vérification de valeur : history', () => {
        let sensor = {
            'name': "sensor test",
            'currentSensorValue': { 'value': 50, 'formatedDate': '10' },
            'type': "un type",
            'sensorValues': [{ 'value': 49, 'formatedDate': '10' }, { 'value': 48, 'formatedDate': '10' }]
        };
        act(() => {
            render(
                <Sensor currentSensor={"un autre sensor"} sensor={sensor} />, container)
        });

        const div = document.querySelector("#value1");

        expect(div.textContent).toBe("48");
    });
});

describe("Test de App", () => {
    it('Première arrivé sur la page ou l\'url est incorrecte', () => {
        setUrlCookie("ws://random.pigne.org:900");
        act(() => {
            render(
                <React.StrictMode>
                    <BrowserRouter>
                        <App mqttClient={new MQTTSensors()}/>
                    </BrowserRouter>
                </React.StrictMode>,
                container
            )
        });

        const div = document.querySelector("#textDefault");

        expect(div.textContent).toBe("L'URL entrée n'a rien donnée");
    });
});
