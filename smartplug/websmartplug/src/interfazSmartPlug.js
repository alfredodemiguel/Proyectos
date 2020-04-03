import {Link} from 'react-router-dom';
import React from 'react';



function InterfazSmartPlug(props) {


  function checkPlug(event) {
    let kk = (event.target.value);
  }

  function checkSubmited() {
    
  }

  return (
      <div>
        <h1>DATOS DEL SMARTPLUG</h1>
        <br/>
        <br/>
        <br/>
        <span>Id:{props.numberOfSmartPlug}</span>
        <br/>
        <span>IsSmartPlugLive:</span>
        <br/>
        <span>Plug:</span>
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