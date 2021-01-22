import axios from 'axios';


export default function WriteApi(url,thePlug) {
    axios.post(url, thePlug)
    .then(function (response) {
      console.log (response);
    })
    .catch(function (error) {
      console.log (error);
    });
}
