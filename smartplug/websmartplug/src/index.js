import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Validation from './Validation';
import InterfazSmartPlug from './interfazSmartPlug';


window.$numberOfSmartPlug = 0 //global variable



const App = () => (
    <BrowserRouter>
            <Route exact path ='/' component={Validation}/>   
            <Route path ='/smartPlug' component={()=> <InterfazSmartPlug numberOfSmartPlug={window.$numberOfSmartPlug}/>}/>
    </BrowserRouter>
);



ReactDOM.render(<App />, document.getElementById('root'));

