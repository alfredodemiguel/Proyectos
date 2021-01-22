import axios from 'axios';


export default function ReadApi(url) {

  axios.get(url)
  .then(function (response) {
    window.$menPlugs = response.data;
  }).then(()=>{
      return window.$menPlugs;
  }) 
  .catch(function (error) {
    //console.log (`Error al hacer get: ${error}`);
  });  
}


