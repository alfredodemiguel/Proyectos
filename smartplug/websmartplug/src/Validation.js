import React, {useEffect} from 'react';
import axios from 'axios';

let menPlugs = [];
  




function Validation(props) {
  const { history } = props;

 


  useEffect(() => {
    axios.get(window.$urlSmartPlug)
    .then(function (response) {
      menPlugs = response.data;
    }) 
    .catch(function (error) {
      console.log ('Error al hacer get'+ error);
    });  
  },[]);
  
  
  
  function checkUser(event) {
    window.$smUser = (event.target.value);
  }
  
  function checkPassword(event) {
    window.$smPassword = (event.target.value);
  }
  
  
  function checkUserSubmited (){
    console.log (menPlugs);
    menPlugs.forEach(element => {
                                if (element.smUser === window.$smUser && element.smPassword === window.$smPassword){
                                  window.$menPlugs=menPlugs;
                                  window.$id = element.id;
                                  window.$smLive = element.smLive;
                                  window.$smState = element.smState;
                                  window.$smGroup = element.smGroup;
                                  window.$smProximity = element.$smProximity;
                                  window.$smEmail = element.$smEmail;
                                  window.$smStateEmail = element.$smStateEmail;
                                  window.$smUser = element.$smUser;
                                  window.$smPassword = element.$smPassword;
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
        <form onSubmit={checkUserSubmited}>
          <label>
            Usuario:
            <input type="text" name="usuarioOfSmartPlug" placeholder="0" onChange={checkUser}/>
          </label>
          <label>
            Contraseña:
            <input type="text" name="passwordOfSmartPlug" placeholder="0" onChange={checkPassword}/>
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
 