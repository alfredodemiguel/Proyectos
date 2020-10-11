import {Link} from 'react-router-dom';
import React, {useState}  from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';
import { MDBContainer } from 'mdbreact';
import Encabezado from './components/Encabezado';



function InterfazSmartPlug() {
  
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

  const seleccionarSM=(elemento)=>{
    setSM(elemento);
    setModalEditar(true);
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
        if (smSeleccionado.smState === 'On' || smSeleccionado.smState === 'Off'){
          sm.smState=smSeleccionado.smState;
        } else {
          sm.smState="Off"
        }
        sm.smGroup=smSeleccionado.smGroup;
        if (smSeleccionado.smProximity === "true" || smSeleccionado.smProximity === "false"){
          sm.smProximity=smSeleccionado.smProximity;
        } else {
          sm.smProximity = "false"
        }
        sm.smEmail=smSeleccionado.smEmail;
        if (smSeleccionado.smStateEmail === "On" || smSeleccionado.smStateEmail === "Off"){
          sm.smStateEmail=smSeleccionado.smStateEmail
        } else {
          sm.smStateEmail = "false"
        }
        
        let thePlug = {"id": sm.id,"smLive": sm.smLive,"smState": sm.smState,"smGroup": sm.smGroup,
        "smTimeStamp": 1,"smProximity": sm.smProximity,"smEmail": sm.smEmail,"smStateEmail": sm.smStateEmail,
        "smUser": sm.smUser,"smPassword": sm.smPassword,"smInitialConf":"new","smPG1":"nul","smPG2":"nul",
        "smPG3":"nul"};

        axios.post(window.$urlSmartPlug, thePlug)
        .then(function (response) {
          console.log (response);
        })
        .catch(function (error) {
          console.log (error);
        });
      }
      return 0;
    });
    setData(dataNueva);
    setModalEditar(false);
  }


  return (
    <div className="App">
      <Encabezado/>
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
              <td><img src={elemento.smPG3} height="50" width="50" /></td>
              <td><button className="btn btn-primary" onClick={()=>seleccionarSM(elemento)}>Editar</button> {"   "}</td>
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
              readOnly
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
            <br/>

            <label>Grupo</label>
            <input
              className="form-control"
              type="text"
              name="smGroup"
              value={smSeleccionado && smSeleccionado.smGroup}
              onChange={handleChange}
            />
            <br/>

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
              type="email"
              name="smEmail"
              value={smSeleccionado && smSeleccionado.smEmail}
              onChange={handleChange}
            />
            <br/>

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
      <div class="mx-auto" style={{width: "200px"}}>
      <MDBContainer>
        <div className="text-wrap badge badge-secondary" style={{width: "8rem"}}> 
          <Link to="/"><p class="text-white text-center">Menu Principal</p></Link>
        </div>
      </MDBContainer>
      </div>
      <br/><br/><br/><br/>
      <blockquote class="blockquote text-right">
        <a href="https://github.com/alfredodemiguel/Proyectos/tree/master/smartplug" class="badge badge-secondary">Código fuente del proyecto</a>
      </blockquote>
    </div>
  ); 
}

export default InterfazSmartPlug;