import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Validation from './Validation';
import InterfazSmartPlug from './interfazSmartPlug';
import {getNumberOfSmartPlug} from './stateSmartPlug';


var test = 17;

console.log ('test:'+ test);


const App = () => (
    <BrowserRouter>
            <Route exact path ='/' component={Validation}/>   
            <Route path ='/smartPlug/:numberOfSmartPlug' component={()=> <InterfazSmartPlug numberOfSmartPlug={getNumberOfSmartPlug()}/>}/>
    </BrowserRouter>
);




/* <Route
  path='/dashboard'
  component={() => <Dashboard isAuthed={true} />}
/> */
// numberOfSmartPlug=1
// <Route path='/home:myKey' component={Home} />

ReactDOM.render(<App />, document.getElementById('root'));

