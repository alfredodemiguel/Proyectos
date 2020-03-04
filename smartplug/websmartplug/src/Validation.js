import React from 'react';
import {setNumberOfSmartPlug, getIdOfSmartPlug} from './stateSmartPlug';
import {getDataSmartPlug} from './io';



function Validation(props) {
  const { history } = props;
  let numberOfSmartPlug = "";

 function recoveryIO (dataOfSmartPlug){
    alert ('antes de dataofsmarplug');
    alert (dataOfSmartPlug);
    alert ('dentrode recoveryio:');
    return dataOfSmartPlug;
  }


  function checkNumber(event) {
    numberOfSmartPlug = (event.target.value);
  }



  function checkNumberSubmited() {
    setNumberOfSmartPlug (numberOfSmartPlug);
    alert (numberOfSmartPlug);
    getDataSmartPlug (numberOfSmartPlug,recoveryIO());
    alert ('recovery:'+ recoveryIO());
    if (recoveryIO() !== undefined){
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
 