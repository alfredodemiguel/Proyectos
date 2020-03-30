import axios from 'axios';
import {setNumberOfSmartPlug,setIdOfSmartPlug,setIsSmartPlugLive,setPlug,setProximity,
    setPlugState,setProximityState, getIdOfSmartPlug} from './stateSmartPlug';



const urlSmartPlug = "http://localhost:3017/smartplug/";



export function putDataSmartPlug(smartplug) {
  axios.put(urlSmartPlug, smartplug)
  .then(function (response) {
  })
  .catch(function (error) {
    setNumberOfSmartPlug (0);
  });
}

export  function getDataSmartPlug(numberOfSmartPlug) {
  let tempUrlSmartPlug = urlSmartPlug + numberOfSmartPlug;
  axios.get(tempUrlSmartPlug)
    .then(function (response) {
      setIdOfSmartPlug (response.data.id);
      setIsSmartPlugLive (response.data.isSmartPlugLive);
      setPlug (response.data.plug);
      setProximity (response.data.proximity);
      setPlugState (response.data.plugState);
      setProximityState (response.data.proximityState);
      console.log ('estoy dentro de getdatasmartplu')
      console.log (response.data.id);
      console.log (response.data.isSmartPlugLive);
    })
    .then (function (){
      alert ('fuera del if getidofsmarp:'+ getIdOfSmartPlug());
      alert ('fuera del if getidofsmarp response:'+ response.data.id);
    })
    .catch(function (error) {
      setNumberOfSmartPlug (0);
    });  
  }
 

  