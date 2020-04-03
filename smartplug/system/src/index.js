const express = require('express');
const morgan = require ('morgan');
const bodyParser = require('body-parser');
var cors = require('cors-express');
const app = express();

app.use (morgan('dev'));
app.use(express.static('.'));
app.use(bodyParser.json());
options = {
    allow : {
        origin: '*',
        methods: 'GET,PUT,POST,DELETE,HEAD,OPTIONS',
        headers: 'Content-Type, Authorization, Content-Length, X-Requested-With, X-HTTP-Method-Override'
    }
};
 
app.use(cors(options));

var smartPlugs = [];



app.get('/smartplug', function(req, res) {
    res.send(smartPlugs);
});

app.get('/smartplug/:id', function(req, res) {
    let selectedSmartPlug;

    const { id } = req.params;
    let inputId = parseInt(id);

    if (id) {
        smartPlugs.forEach((smartPlugs) => {
           if (smartPlugs.id === inputId) {
            smLive = smartPlugs.smLive;
            smState = smartPlugs.smState;
            smGroup = smartPlugs.smGroup;
            selectedSmartPlug = {id,smLive,smState,smGroup}
           }
       });
   }
    res.send(selectedSmartPlug);
});

app.put('/smartplug/:id', function (req, res) {
    const { id } = req.params;
    let inputId = parseInt(id);
    let smLive = req.body.smLive;
    let smState = req.body.smState;
    let smGroup = req.body.smGroup;
    if (id && smLive && smState && smGroup) {
        smartPlugs.forEach((smartPlugs) => {
           if (smartPlugs.id === inputId || smartPlugs.smGroup === smGroup) {
               smartPlugs.smLive = smLive;
               smartPlugs.smState = smState;
               smartPlugs.smGroup = smGroup;
           }
       });
       res.json(smartPlugs);;
   } else {
       res.status(500).json({error: 'There was an error.'});
   }
});



app.delete('/smartplug/:id', function (req, res) {
    const { id } = req.params;
    let inputId = parseInt(id);
    inputId = inputId -1;
    smartPlugs.splice(inputId,1);
    res.send(smartPlugs);
});



app.post('/smartplug', (req, res) => {
   
   
    let id = req.body.id
    let smLive = req.body.smLive; 
    let smState = req.body.smState;
    let smGroup = req.body.smGroup;
    const newSmartPlug = {id,smLive,smState,smGroup};



        
    if (id && smLive && smState && smGroup) {
        smartPlugs.push (newSmartPlug);
        res.send(newSmartPlug);
    } else {
        res.status(500).json({error: 'There was an error.'});
    }
});

app.listen(3017, () => {
 console.log("El servidor está inicializado en el puerto 3017");
});
 