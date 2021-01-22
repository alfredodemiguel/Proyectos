import React from 'react';
import { render, screen } from '@testing-library/react';
import Validation from './Validation';
import ReadApi from './ReadApi';
import WriteApi from './WriteApi';
import InterfazSmartPlug from './InterfazSmartPlug';

// Test of componet Validation
it('renders learn react link', () => {
  const { getByText } = render(<Validation />);
  const linkElement = getByText("Usuario");
  expect(linkElement).toBeInTheDocument();
});

it('renders button submit', () => {
  render(<Validation />);
  expect(screen.getByText('Submit')).toBeInTheDocument();
});

//Test of WriteApi
it('Return anything writeApi', async () => {
  let thePlug = {
    "id": "50:02:91:48:1C:00",
    "smLive": "false",
    "smState": "Off",
    "smGroup": "0000",
    "smTimeStamp": 1595756802190,
    "smProximity": "true",
    "smEmail": "usuario01@yahoo.es",
    "smStateEmail": "true",
    "smUser": "usuario00",
    "smPassword": "pass",
    "smInitialConf": "advertisem",
    "smPG1": "nul",
    "smPG2": "nul",
    "smPG3": "nul"
  }
  const data = await WriteApi('https://api-smartplug.herokuapp.com/smartplug/',thePlug);
  expect(data).not.toBeNull();
});

//Test of ReadApi
it('Return anything ReadApi', async () => {
  const data = await ReadApi('https://api-smartplug.herokuapp.com/smartplug/');
  expect(data).not.toBeNull();
});

