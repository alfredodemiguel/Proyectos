import React from 'react';
import {setNumberOfSmartPlug} from './stateSmartPlug';
import {getDataSmartPlug} from './io';



function Validation(props) {
  const { history } = props;
  let numberOfSmartPlug = "";

 

  function checkNumber(event) {
    numberOfSmartPlug = (event.target.value);
  }



  function checkNumberSubmited() {
    setNumberOfSmartPlug (numberOfSmartPlug);
    alert ('numero introducido en checknumrbesubmited' + numberOfSmartPlug);
    alert ('gedat'+ getDataSmartPlug (numberOfSmartPlug));
    if (getDataSmartPlug (numberOfSmartPlug) !== 1){
      alert ('Dentro del if');
      history.push("/smartPlug");
    }
  }

  return (
    <div className="Menu">
      <header className="Menu-header">
        <br />
        <h1 id="titleP">SMARTPLUG</h1>
        <br />
      </header>
      <div id="imagesMenu">
        <br/>
        <br/>
        <form onSubmit={checkNumberSubmited}>
          <label>
            Number Of SmartPlug:
            <input type="number" name="numberOfSmartPlug" placeholder="0" onChange={checkNumber}/>
          </label>
          <input type="submit" value="Submit" />
        </form>
        <br/>
        <br/>
      </div>
    </div>
  );
}

export default Validation;
 