import {Link} from 'react-router-dom';
import React, {useEffect} from 'react';
import axios from 'axios';



function InterfazSmartPlug(props) {
  
  
  const url = window.$urlSmartPlug;
  let smState = "Off";
  let smGroup = "000";
  let menPlug = window.$menPlugs;
  let selectedMenPlug = [];
  console.log ("menPlug:");
  console.log (menPlug);



  useEffect(() => {
    axios.get(window.$urlSmartPlug)
    .then(function (response) {
      menPlug = response.data;
      window.$menPlugs = menPlug;
      selectedMenPlug.length = 0;
    })
    .then (function (menPlugs) {menPlug.map (smPlug => {
      if (smPlug.smUser === window.$smUser && smPlug.smPassword === window.$smPassword){
        selectedMenPlug.push({"id": smPlug.id,"smLive": smPlug.smLive,"smState": smPlug.smState,
        "smGroup": smPlug.smGroup,"smTimeStamp": smPlug.smTimeStamp,"smProximity": smPlug.smProximity,
        "smEmail": smPlug.smEmail,"smStateEmail": smPlug.smStateEmail,"smUser": smPlug.smUser,
        "smPassword": smPlug.smPassword,"smInitialConf":smPlug.smInitialConf,"smPG1":smPlug.smPG1,
        "smPG2":smPlug.smPG2,"smPG3":smPlug.smPG3
      })}})})
    .catch(function (error) {
      console.log ('Error al hacer get'+ error);
    });  
  },[]);


  function checkState(event) {
    console.log ('Estoy en checkState');
    smState = (event.target.value);
    console.log (smState);
  }


 const smPlugList = selectedMenPlug.map (smplug =>
      <li key={smplug.id}>Id:{smplug.id}
      &nbsp;Operativo:{smplug.smLive}
      &nbsp;Estado:<input type="text" name="state" placeholder={smplug.smState} onChange={checkState}/>
      &nbsp;Grupo:<input type="text" name="group" placeholder={smplug.smGroup} onChange={checkGroup}/>
      &nbsp;Presencia:{smplug.smProximity}&nbsp;Email:{smplug.smEmail}
      &nbsp;Estado Email:{smplug.smStateEmail}
      &nbsp;Usuario:{smplug.smUser}
      &nbsp;Contraseña:{smplug.smPassword}
      </li>
    );


  
  function checkGroup(event) {
    smGroup = (event.target.value);
  }

  function checkSubmited() {
    let thePlug = {"id": props.id,"smLive": props.smLive,"smState": smState,"smGroup": smGroup, "smTimeStamp": "0"};
    //String stringSend = "\{\"id\":\"" + id + "\",\"smLive\":\"true\",\"smState\":\"" + smState + "\",\"smGroup\":\"" + smGroup + "\",\"smTimeStamp\":1,\"smProximity\":\"" + smProximity + "\",\"smEmail\":\"" + smEmail + "\",\"smStateEmail\":\"" + smStateEmail + "\",\"smUser\":\"" + smUser + "\",\"smPassword\":\"" + smPassword + "\",\"smInitialConf\":\"" + smInitialConf + "\",\"smPG1\":\"" + smPG1 + "\",\"smPG2\":\"" + smPG2 + "\",\"smPG3\":\"" + smPG3 + "\"\}"; 
    let urlGet = url + props.id;
    console.log (selectedMenPlug);
    axios.put(urlGet, thePlug)
    .then(function (response) {
      console.log (selectedMenPlug);
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
      <br/>
        <div>{smPlugList}</div>
        <input type="submit" value="Submit" onClick={checkSubmited}/>
      <br/>
      
      <Link to="/">Menu Principal </Link>
    </div>
  ); 
}

export default InterfazSmartPlug;