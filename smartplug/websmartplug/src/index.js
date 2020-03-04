import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Validation from './Validation';
import InterfazSmartPlug from './interfazSmartPlug';

const App = () => (
    <BrowserRouter>
            <Route exact path ='/' component={Validation}/>   
            <Route exact path ='/smartPlug' component={InterfazSmartPlug}/>
    </BrowserRouter>
);



ReactDOM.render(<App />, document.getElementById('root'));

