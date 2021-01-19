import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Validation from './Validation';
import InterfazSmartPlug from './interfazSmartPlug';


window.$urlSmartPlug = "https://api-smartplug.herokuapp.com/smartplug/";
window.$selectedMenPlugs = [];
window.$user = "";
window.$password = "";


const App = () => (
    <BrowserRouter>
            <Route exact path ='/' component={Validation}/>   
            <Route path ='/smartPlug' component={()=> <InterfazSmartPlug/>}/>
    </BrowserRouter>
);

 

ReactDOM.render(<App />, document.getElementById('root'));

