import {Link} from 'react-router-dom';
import React from 'react';
import {getNumberOfSmartPlug,getIsSmartPlugLive, getPlug,setPlug} from './stateSmartPlug';


function InterfazSmartPlug() {

  alert ('Estoy en smartplug interface');
  let plugOfSmartPlug = "";

  function checkPlug(event) {
    plugOfSmartPlug = (event.target.value);
  }

  function checkSubmited() {
    setPlug (plugOfSmartPlug);
  }


  return (
      <div>
        <h1>DATOS DEL SMARTPLUG</h1>
        <br/>
        <br/>
        <br/>
        <span>Id:{getNumberOfSmartPlug()}</span>
        <br/>
        <span>IsSmartPlugLive:{getIsSmartPlugLive()}</span>
        <br/>
        <span>Plug:{getPlug()}</span>
        <br/>
        <br/>
        <form onSubmit={checkSubmited}>
          <label>
            plug:
            <input type="text" name="text" placeholder="" onChange={checkPlug}/>
          </label>
          <input type="submit" value="Submit" />
        </form>
        <br/>
        <Link to="/">Menu Principal </Link>
      </div>
    ); 
}

export default InterfazSmartPlug;