import React, {useEffect} from 'react';
import axios from 'axios';




const urlSmartPlug = "http://localhost:3017/smartplug/";
let menPlugs = [];
  




function Validation(props) {
  const { history } = props;

 


  useEffect(() => {
    axios.get(urlSmartPlug)
    .then(function (response) {
      menPlugs = response.data;
    }) 
    .catch(function (error) {
      console.log ('Error al hacer get'+ error);
    });  
  },[]);
  
  
  
  function checkNumber(event) {
    window.$id = (event.target.value);
  }
  
  
  
  function checkNumberSubmited (){
    menPlugs.forEach(element => {
                                if (element.id === parseInt(window.$id)){
                                  window.$smLive = element.smLive;
                                  window.$smState = element.smState;
                                  window.$smGroup = element.smGroup;
                                  history.push(`/smartPlug`);
                                }
                              });
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
 