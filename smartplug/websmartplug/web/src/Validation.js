import React, {useEffect} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Encabezado from './components/Encabezado';

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
      <Encabezado/>
      <div id="imagesMenu">
        <br/>
        <br/>
        <form onSubmit={checkUserSubmited}>
        <div class="input-group input-group-lg">
         <div class="input-group-prepend">
          <span class="input-group-text" id="inputGroup-sizing-lg">Usuario</span>
         </div>
          <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" name="usuarioOfSmartPlug" onChange={checkUser}/>
        </div>

        <div class="input-group input-group-lg">
         <div class="input-group-prepend">
          <span class="input-group-text" id="inputGroup-sizing-lg">Contraseña</span>
         </div>
         <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" name="passwordOfSmartPlug" onChange={checkPassword}/>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
        </form>
        <br/>
        <br/>
      </div>
      <blockquote class="blockquote text-center">
        <a href="https://github.com/alfredodemiguel/Proyectos/tree/master/smartplug" class="badge badge-secondary">Código fuente del proyecto</a>
      </blockquote>
    </div>
  );
}

export default Validation;
 