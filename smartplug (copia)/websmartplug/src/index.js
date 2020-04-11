import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Validation from './Validation';
import InterfazSmartPlug from './interfazSmartPlug';


window.$id = 0;
window.$smLive = "Off";
window.$smState = "Off";
window.$smGroup = "0000";



const App = () => (
    <BrowserRouter>
            <Route exact path ='/' component={Validation}/>   
            <Route path ='/smartPlug' component={()=> <InterfazSmartPlug id={window.$id} smLive={window.$smLive} smState={window.$smState} smGroup={window.$smGroup}/>}/>
    </BrowserRouter>
);

 

ReactDOM.render(<App />, document.getElementById('root'));

