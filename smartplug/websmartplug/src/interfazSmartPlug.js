import {Link} from 'react-router-dom';
import React from 'react';
import axios from 'axios';



function InterfazSmartPlug(props) {
  
  
  const url = "http://api-smartplug.herokuapp.com/smartplug/";
  let smState = props.smState;
  let smGroup = props.smGroup;

  
  function checkState(event) {
    smState = (event.target.value);
  }

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
        <label>
          State:
          <input type="text" name="state" placeholder={props.smState} onChange={checkState}/>
        </label>

        <label>
          Group:
          <input type="text" name="group" placeholder={props.smGroup} onChange={checkGroup}/>
        </label>
        <input type="submit" value="Submit" onClick={checkSubmited}/>
      <br/>
      <Link to="/">Menu Principal </Link>
    </div>
  ); 
}

export default InterfazSmartPlug;