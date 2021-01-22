import {Link} from 'react-router-dom';
import React, {useState}  from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';
import { MDBContainer } from 'mdbreact';
import Encabezado from './components/Encabezado';
import ReadApi from './ReadApi';
import WriteApi from './WriteApi';



function InterfazSmartPlug() {
  
  const [data, setData] = useState(window.$selectedMenPlugs);
  const [modalEditar, setModalEditar] = useState(false);

  const [smSeleccionado, setSM] = useState({
    id: '',
    smLive: '',
    smState: '',
    smPG2: '',
    smpG3: ''
  });

  const refrescarDatos=()=>{
    console.log ('Estoy en refrescarDatos');
    ReadApi(window.$urlSmartPlug);
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
    setData(window.$menPlugs);
  }

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
        if (smSeleccionado.smPG2 === "True" || smSeleccionado.smPG2 === "False"){
          sm.smPG2=smSeleccionado.smPG2;
        } else {
          sm.smPG2 = "False"
        }        
        let thePlug = {"id": sm.id,"smLive": sm.smLive,"smState": sm.smState,"smGroup":"nul",
        "smTimeStamp": 1,"smProximity":"nul","smEmail":"nul","smStateEmail":"nul",
        "smUser":sm.smUser,"smPassword":sm.smPassword,"smInitialConf":"new","smPG1":"nul","smPG2":sm.smPG2,
        "smPG3":sm.smPG3};
        WriteApi (window.$urlSmartPlug,thePlug);
      }
      return 0;
    });
    setData(dataNueva);
    setModalEditar(false);
  }


  return (
    <div className="App">
      <Encabezado/>
      <div class="table-responsive-sm" style={{width: "100%"}}>
        <table className="table table-bordered" >
          <tbody>
            {window.$selectedMenPlugs.map(elemento=>(
              <tr key={elemento.id}>
                <tr>
                  <td><strong>ID:</strong>{elemento.id}</td>
                  <td><strong>Vivo:</strong>{elemento.smLive}</td>
                  <td><strong>Estado:</strong>{elemento.smState}</td>
                  <td><strong>Fofo:</strong>{elemento.smPG2}</td>
                  <td><button className="btn btn-primary" onClick={()=>seleccionarSM(elemento)}>Editar</button> {"   "}</td>
                </tr>  
                <tr>
                  <td><img src={elemento.smPG3} width="100%" height="100%" alt ="Foto"/></td>
                  <td><button className="btn btn-primary" onClick={()=>refrescarDatos()}>Referescar</button> {"   "}</td>
                </tr>
              </tr>
            ))
            }
          </tbody>
        </table>
      </div>

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
            <br/>
            <label>Vivo</label>
            <input
              className="form-control"
              type="text"
              name="smLive"
              value={smSeleccionado && smSeleccionado.smLive}
              readOnly
            />
            <br/>
            <label>Estado (ATENCIÓN: Si no se elige estado pasa a Off)</label>
            <select class="custom-select custom-select-lg mb-3"
             name="smState"
             onChange={handleChange} required>
              <option selected>On/Off</option>
              <option value="On">On</option>
              <option value="Off">Off</option>
            </select>
            <br/>
            <label>Tomar Fotografia</label>
            <select class="custom-select custom-select-lg mb-3"
             name="smPG2"
             onChange={handleChange} required>
              <option selected>True/False</option>
              <option value="True">True</option>
              <option value="False">False</option>
            </select>
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
        <a href="https://github.com/alfredodemiguel/Proyectos/tree/master/PhotoPlug" class="badge badge-secondary">Código fuente del proyecto</a>
      </blockquote>
    </div>
  ); 
}

export default InterfazSmartPlug;