import {Link} from 'react-router-dom';
import React from 'react';
import axios from 'axios';



function InterfazSmartPlug(props) {
  
  
  const url = "http://api-smartplug.herokuapp.com/smartplug/";
  let smState = props.smState;
  let smGroup = props.smGroup;
  let menPlug = props.menPlugs;
  let smUser = props.menPlugs;
  console.log ("menPlug:");
  console.log (menPlug);



  function checkState(event) {
    console.log ('Estoy en checkState');
    smState = (event.target.value);
    console.log (smState);
  }


  const smPlugList = menPlug.map (smplug => <li key={smplug.id}>Id:{smplug.id}&nbsp;
  Operativo:{smplug.smLive}&nbsp;Estado:<input type="text" name="state" placeholder={smplug.smState} onChange={checkState}/>
  &nbsp;Grupo:<input type="text" name="group" placeholder={smplug.smGroup} onChange={checkGroup}/>&nbsp;
  Presencia:{smplug.smProximity}&nbsp;Email:{smplug.smEmail}&nbsp;
  Estado Email:{smplug.smStateEmail}&nbsp;Usuario:{smplug.smUser}
  &nbsp;Contraseña:{smplug.smPassword}</li>);


  
  function checkGroup(event) {
    smGroup = (event.target.value);
  }

  function checkSubmited() {
    let thePlug = {"id": props.id,"smLive": props.smLive,"smState": smState,"smGroup": smGroup, "smTimeStamp": "0"};
    let urlGet = url + props.id;
    axios.put(urlGet, thePlug)
    .then(function (response) {
    })
    .catch(function (error) {
      console.log (error);
    });
  }


  return (
    <div>
      <h1>DATOS DEL SMARTPLUG</h1>
      <br/>
      <br/>
      <br/>
      <span>Id:{props.id}</span>
      <br/>
      <br/>
      <span>Live:{props.smLive}</span>
      <br/>
        <div>{smPlugList}</div>
        <input type="submit" value="Submit" onClick={checkSubmited}/>
      <br/>
      
      <Link to="/">Menu Principal </Link>
    </div>
  ); 
}

export default InterfazSmartPlug;