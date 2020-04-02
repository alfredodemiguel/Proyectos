import axios from 'axios';
import {setNumberOfSmartPlug,setIdOfSmartPlug,setIsSmartPlugLive,setPlug,setProximity,
    setPlugState,setProximityState, getIdOfSmartPlug} from './stateSmartPlug';



const urlSmartPlug = "http://localhost:3017/smartplug/";
let id,live,sPlug,proximity,plugState,proximityState;


export function putDataSmartPlug(smartplug) {
  axios.put(urlSmartPlug, smartplug)
  .then(function (response) {
  })
  .catch(function (error) {
    setNumberOfSmartPlug (0);
  });
}

export  function getDataSmartPlug(numberOfSmartPlug,callback) {
  let tempUrlSmartPlug = urlSmartPlug + numberOfSmartPlug;



  axios.get(tempUrlSmartPlug)
    .then(function (response) {
      id = response.data.id;
      live = response.data.isSmartPlugLive;
      sPlug = response.data.plug;
      proximity = response.data.proximity;
      plugState = response.data.plugState;
      proximityState = response.data.proximityState;
    })
    .then (function (){
      alert ('Segundo then');
      setDataSmartPlug (id,live,sPlug,proximity,plugState,proximityState);
    })
    .then (function(){
      
      alert ('Tercer then:'+ getIdOfSmartPlug());
    })
    .catch(function (error) {
      setNumberOfSmartPlug (0);
    });  
    console.log ('Estoy en getDataSmartPlug');
    setTimeout(function(){
      console.log ('Termino segunda funcion');
      callback (); 
    }, 3000);
  }
 

  function setDataSmartPlug (id,live,sPlug,proximity,plugState,proximityState){
    setIdOfSmartPlug (id);
    setIsSmartPlugLive (live);
    setPlug (sPlug);
    setProximity (proximity);
    setPlugState (plugState);
    setProximityState (proximityState);
  }

