import { render } from '@testing-library/react';
import App from './App';
import ReactDOM from 'react-dom'
import { act } from "react-dom/test-utils";
import { unmountComponentAtNode } from "react-dom";
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import BrokerUrl from './BrokerUrl/BrokerUrl';
import SensorList from './SensorList/SensorList';
import Sensor from './Sensor/Sensor';

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

  /*
  it('Changement de l\'url', () => {
    const uneFonction = jest.fn();
    act(() => {
      render(
        <BrokerUrl mqttUrl="Une url" onSubmit={uneFonction} />, container);
    });
  
    //Recupération du bouton pour la simulation de click
    const input = document.querySelector("input");
  
    act(() => {
      input.dispatchEvent(new KeyboardEvent('keydown',{'key':'a', bubbles: true}));
    });
  
    expect(input.value).toBe("Une urla");
  });*/
});


describe("Test de Sensor", () => {
  it('Affichage des textes', () => {
    act(() => {
      render(
        <BrokerUrl mqttUrl="Une url" onSubmit={() => "test"} />, container);
    });
  
    //Recupération du bouton pour la simulation de click
    const input = document.querySelector("input");
  
    expect(input.value).toBe("Une url");
  });
});