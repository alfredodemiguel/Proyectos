import React, {useEffect} from 'react';
import axios from 'axios';

let menPlugs = [];
let user = "";
let password = "";
  

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
    user = (event.target.value);
  }
  
  function checkPassword(event) {
    password = btoa((event.target.value));
  }
  
  function checkUserSubmited (){
    window.$selectedMenPlugs.length = 0;
    menPlugs.forEach(element => {
                                if (element.smUser === user && element.smPassword === password){
                                  window.$selectedMenPlugs.push({"id": element.id,"smLive": element.smLive,"smState": element.smState,
                                  "smGroup": element.smGroup,"smTimeStamp": element.smTimeStamp,"smProximity": element.smProximity,
                                  "smEmail": element.smEmail,"smStateEmail": element.smStateEmail,"smUser": element.smUser,
                                  "smPassword": element.smPassword,"smInitialConf":element.smInitialConf,"smPG1":element.smPG1,
                                  "smPG2":element.smPG2,"smPG3":element.smPG3});
                                }
                              });
    if (window.$selectedMenPlugs.length > 0){
      history.push(`/smartPlug`);
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
 