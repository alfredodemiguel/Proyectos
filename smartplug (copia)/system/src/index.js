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
    smartPlugs.forEach((smartPlugs) => {
         if ((Date.now() - smartPlugs.smTimeStamp) > 30000){
             smLive = "false"
             smartPlugs.smLive = "false"
         } else {
             smartPlugs.smLive = "true"
             smLive = "true"
         }
    });
    res.send(smartPlugs);
});
 

app.get('/smartplug/:id', function(req, res) {
    let selectedSmartPlug;

    const { id } = req.params;
    
    if (id) {
        smartPlugs.forEach((smartPlugs) => {
           if (smartPlugs.id === id) {
            if ((Date.now() - smartPlugs.smTimeStamp) > 30000){
                smLive = "false"
                smartPlugs.smLive = "false"
            } else {
                smartPlugs.smLive = "true"
                smLive = "true"
            }
            smState = smartPlugs.smState;
            smGroup = smartPlugs.smGroup;
            smTimeStamp = smartPlugs.smTimeStamp;
            selectedSmartPlug = {id,smLive,smState,smGroup,smTimeStamp}
           }
       });
   }
    res.send(selectedSmartPlug);
});

app.put('/smartplug/:id', function (req, res) {
    const { id } = req.params;
    let smLive = req.body.smLive;
    let smState = req.body.smState;
    let smGroup = req.body.smGroup;
    let smTimeStamp = req.body.smTimeStamp;
    if (id && smLive && smState && smGroup) {
        smartPlugs.forEach((smartPlugs) => {
           if (smartPlugs.id === id || smartPlugs.smGroup === smGroup) {
               smartPlugs.smLive = smLive;
               smartPlugs.smState = smState;
               smartPlugs.smGroup = smGroup;
               smartPlugs.smTimeStamp = smTimeStamp;
           }
       });
       res.json(smartPlugs);;
   } else {
       res.status(500).json({error: 'There was an error.'});
   }
});



app.delete('/smartplug/:id', function (req, res) {
    let numberItem = -1;
    let cont = 0;
    const { id } = req.params;
   
    smartPlugs.forEach(element => {
        if (element.id === id) {
            numberItem = cont;
        }
        cont = cont + 1;
    });
    if (numberItem !== -1) {smartPlugs.splice(numberItem,1)}
    res.send(smartPlugs);
});



app.post('/smartplug', (req, res) => {
    
    
    let numberItem = -1;
    let cont = 0;
    let id = req.body.id;
    let smLive = req.body.smLive; 
    let smState = req.body.smState;
    let smGroup = req.body.smGroup;
    let smTimeStamp = Date.now();
    const newSmartPlug = {id,smLive,smState,smGroup,smTimeStamp};

        
    
    if (id && smLive && smState && smGroup) {
        smartPlugs.forEach(element => {
            if (element.id === id) {
                numberItem = cont;
            }
            cont = cont + 1;
        });
        if (numberItem !== -1) {smartPlugs.splice(numberItem,1)}
        smartPlugs.push (newSmartPlug);
        res.send(newSmartPlug);
    } else {
        res.status(500).json({error: 'There was an error.'});
    }
});

app.listen(3017, () => {
 console.log("El servidor está inicializado en el puerto 3017");
});
 