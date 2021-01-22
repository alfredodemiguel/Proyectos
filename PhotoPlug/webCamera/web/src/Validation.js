import React, {useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Encabezado from './components/Encabezado';
import ReadApi from './ReadApi';

  

function Validation(props) {
  const { history } = props;

  useEffect(() => {
   ReadApi(window.$urlSmartPlug);
  },[]);
  
  function checkUser(event) {
    window.$user = (event.target.value);
  }
  
  function checkPassword(event) {
    window.$password = btoa((event.target.value));
  }
  
  function checkUserSubmited (){
    window.$selectedMenPlugs.length = 0;
    window.$menPlugs.forEach(element => {
                                if (element.smUser === window.$user && element.smPassword === window.$password){
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
        <div className="input-group input-group-lg" >
         <div className="input-group-prepend">
          <span className="input-group-text" id="inputGroup-sizing-lg">Usuario</span>
         </div>
          <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" name="usuarioOfSmartPlug" onChange={checkUser}/>
        </div>

        <div className="input-group input-group-lg">
         <div className="input-group-prepend">
          <span className="input-group-text" id="inputGroup-sizing-lg">Contraseña</span>
         </div>
         <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" name="passwordOfSmartPlug" onChange={checkPassword}/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        <br/>
        <br/>
      </div>
      <blockquote className="blockquote text-center">
        <a href="https://github.com/alfredodemiguel/Proyectos/tree/master/PhotoPlug" className="badge badge-secondary">Código fuente del proyecto</a>
      </blockquote>
    </div>
  );
}

export default Validation;
 