import {Link} from 'react-router-dom';
import React, {useState}  from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';




function InterfazSmartPlug(props) {
  
  
  const url = window.$urlSmartPlug;
  //let smState = "Off";
  //let smGroup = "000";
  


  const [data, setData] = useState(window.$selectedMenPlugs);
  const [modalEditar, setModalEditar] = useState(false);
  

  const [smSeleccionado, setSM] = useState({
    id: '',
    smLive: '',
    smState: '',
    smGroup: '',
    smProximity: '',
    smEmail: '',
    smStateEmail: ''
  });

  const seleccionarSM=(elemento, caso)=>{
    setSM(elemento);
    (caso==='Editar')?setModalEditar(true):setModalEditar(true)
  }

  const handleChange=e=>{
    const {name, value}=e.target;
    setSM((prevState)=>({
      ...prevState,
      [name]: value
    }));
  }


  const editar=()=>{
    var dataNueva=data;
    dataNueva.map(sm=>{
      if(sm.id===smSeleccionado.id){
        sm.smLive=smSeleccionado.smLive;
        sm.smState=smSeleccionado.smState;
        sm.smGroup=smSeleccionado.smGroup;
        sm.smProximity=smSeleccionado.smProximity;
        sm.smEmail=smSeleccionado.smEmail;
        sm.smStateEmail=smSeleccionado.smStateEmail
      }
      return 0;
    });
    setData(dataNueva);
    setModalEditar(false);
  }

  




/*
  function checkState(event) {
    console.log ('Estoy en checkState');
    smState = (event.target.value);
    console.log (smState);
  }


 const smPlugList = window.$selectedMenPlugs.map (smplug =>
    <li key={smplug.id}>Id:{smplug.id}
      &nbsp;Operativo:{smplug.smLive}
      &nbsp;Estado:<input type="text" name="state" placeholder={smplug.smState} onChange={checkState}/>
      &nbsp;Grupo:<input type="text" name="group" placeholder={smplug.smGroup} onChange={checkGroup}/>
      &nbsp;Presencia:{smplug.smProximity}&nbsp;Email:{smplug.smEmail}
      &nbsp;Estado Email:{smplug.smStateEmail}
      &nbsp;Usuario:{smplug.smUser}
      &nbsp;Contraseña:{smplug.smPassword}
      <br/>
      <input type="submit" value="Submit" onClick={checkSubmited("2C:F4:32:78:24:A5")}/>
      <br/><br/><br/><br/>
    </li>
  );


  
  function checkGroup(event) {
    smGroup = (event.target.value);
    console.log (smGroup);
  }

  function checkSubmited(id) {
    //let thePlug = {"id": props.id,"smLive": props.smLive,"smState": smState,"smGroup": smGroup, "smTimeStamp": "0"};
    //String stringSend = "\{\"id\":\"" + id + "\",\"smLive\":\"true\",\"smState\":\"" + smState + "\",\"smGroup\":\"" + smGroup + "\",\"smTimeStamp\":1,\"smProximity\":\"" + smProximity + "\",\"smEmail\":\"" + smEmail + "\",\"smStateEmail\":\"" + smStateEmail + "\",\"smUser\":\"" + smUser + "\",\"smPassword\":\"" + smPassword + "\",\"smInitialConf\":\"" + smInitialConf + "\",\"smPG1\":\"" + smPG1 + "\",\"smPG2\":\"" + smPG2 + "\",\"smPG3\":\"" + smPG3 + "\"\}"; 
    let thePlug = {"id":"2C:F4:32:78:24:A5","smLive":"true","smState":"Off","smGroup":"0013","smTimeStamp":1586365329980,"smProximity":"true","smEmail":"alfredodemiguel@yahoo.es","smStateEmail":"true","smUser":"u2","smPassword":"123","smInitialConf":"new","smPG1":"nul","smPG2":"nul","smPG3":"nul"};
    let urlGet = url;
    console.log ("Estoy en checksubmited");
    console.log ("urlget");
    console.log (urlGet);
    console.log ("id");
    console.log (id);
    console.log ("theplug");
    console.log (thePlug);
    axios.post(urlGet, thePlug)
    .then(function (response) {
      console.log ("response:");
      console.log (response);
    })
    .catch(function (error) {
      console.log (error);
    });
  }

*/

  return (
    <div className="App">
    <h2>SMART PLUG</h2>
    <br />
 
  <br /><br />
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>ID</th>
          <th>Vivo</th>
          <th>Estado</th>
          <th>Grupo</th>
          <th>Proximidad</th>
          <th>Email</th>
          <th>Estado Email</th>
        </tr>
      </thead>
      <tbody>
        {window.$selectedMenPlugs.map(elemento=>(
          <tr key={elemento.id}>
            <td>{elemento.id}</td>
            <td>{elemento.smLive}</td>
            <td>{elemento.smState}</td>
            <td>{elemento.smGroup}</td>
            <td>{elemento.smProximity}</td>
            <td>{elemento.smEmail}</td>
            <td>{elemento.smStateEmail}</td>
            <td><button className="btn btn-primary" onClick={()=>seleccionarSM(elemento, 'Editar')}>Editar</button> {"   "}</td>
          </tr>
        ))
        }
      </tbody>
    </table>

    <Modal isOpen={modalEditar}>
      <ModalHeader>
        <div>
          <h3>Editar SmartPlug</h3>
        </div>
      </ModalHeader>
      <ModalBody>
        <div className="form-group">
          <label>ID</label>
          <input
            className="form-control"
            readOnly
            type="text"
            name="id"
            value={smSeleccionado && smSeleccionado.id}

          />
          <br />

          <label>Vivo</label>
          <input
            className="form-control"
            type="text"
            name="smLive"
            value={smSeleccionado && smSeleccionado.smLive}
            onChange={handleChange}
          />
          <br />

          <label>Estado</label>
          <input
            className="form-control"
            type="text"
            name="smState"
            value={smSeleccionado && smSeleccionado.smState}
            onChange={handleChange}
          />
          <br />

          <label>Grupo</label>
          <input
            className="form-control"
            type="text"
            name="smGroup"
            value={smSeleccionado && smSeleccionado.smGroup}
            onChange={handleChange}
          />
          <br />

          <label>Proximidad</label>
          <input
            className="form-control"
            type="text"
            name="smProximity"
            value={smSeleccionado && smSeleccionado.smProximity}
            onChange={handleChange}
          />
          <br />

          <label>Email</label>
          <input
            className="form-control"
            type="text"
            name="smEmail"
            value={smSeleccionado && smSeleccionado.smEmail}
            onChange={handleChange}
          />
          <br />

          <label>Estado Email</label>
          <input
            className="form-control"
            type="text"
            name="smStateEmail"
            value={smSeleccionado && smSeleccionado.smStateEmail}
            onChange={handleChange}
          />
          <br />
        </div>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-primary" onClick={()=>editar()}>
          Actualizar
        </button>
        <button
          className="btn btn-danger"
          onClick={()=>setModalEditar(false)}
        >
          Cancelar
        </button>
      </ModalFooter>
    </Modal>

      <br/>
      <Link to="/">Menu Principal </Link>
    </div>
  ); 
}

export default InterfazSmartPlug;