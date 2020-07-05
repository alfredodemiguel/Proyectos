import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Validation from './Validation';
import InterfazSmartPlug from './interfazSmartPlug';


window.menPlugs = [];
window.$id = 0;
window.$smLive = "Off";
window.$smState = "Off";
window.$smGroup = "0000";
window.$smTimeStamp = 1;
window.$smProximity = "off";
window.$smEmail = "alfredodemiguel@yahoo.es";
window.$smStateEmail = "off";
window.$smUser = "alfredo";
window.$smPassword = "1234";
window.$smInitialConf = "on";
window.$smPG1 = "off";
window.$smPG2 = "off";
window.$smPG3 = "off";
window.$urlSmartPlug = "http://api-smartplug.herokuapp.com/smartplug/";

const App = () => (
    <BrowserRouter>
            <Route exact path ='/' component={Validation}/>   
            <Route path ='/smartPlug' component={()=> <InterfazSmartPlug 
            id={window.$id} smLive={window.$smLive} smState={window.$smState}
            smGroup={window.$smGroup} smProximity={window.$smProximity}
            smEmail={window.$smEmail} smStateEmail={window.$smStateEmail}
            menPlugs = {window.$menPlugs}
            />}/>
    </BrowserRouter>
);

 

ReactDOM.render(<App />, document.getElementById('root'));

