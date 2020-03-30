import React from 'react';
import {setNumberOfSmartPlug, getIdOfSmartPlug} from './stateSmartPlug';
import {getDataSmartPlug} from './io';



function Validation(props) {
  const { history } = props;
  let numberOfSmartPlug = "";

 

  function checkNumber(event) {
    numberOfSmartPlug = (event.target.value);
  }



  async function checkNumberSubmited() {
    await setNumberOfSmartPlug (numberOfSmartPlug);
    alert ('numero introducido en checknumrbesubmited' + numberOfSmartPlug);
    getDataSmartPlug (numberOfSmartPlug);
    if (getIdOfSmartPlug() !== undefined){
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
 