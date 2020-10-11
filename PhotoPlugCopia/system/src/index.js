const express = require('express');
const morgan = require ('morgan');
const bodyParser = require('body-parser');
var cors = require('cors-express');
const app = express();
const port = process.env.PORT || 3017;


app.use (morgan('dev'));
app.use(express.static('.'));
app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))
options = {
    allow : {
        origin: '*',
        methods: 'GET,PUT,POST,DELETE,HEAD,OPTIONS',
        headers: 'Content-Type, Authorization, Content-Length, X-Requested-With, X-HTTP-Method-Override'
    }
};
 
app.use(cors(options));

var smartPlugs = [];


app.get ('/', (req, res) => res.send ('SmartPlug'));

app.get('/smartplug', function(req, res) {
    smartPlugs.forEach((smartPlugs) => {
         if ((Date.now() - smartPlugs.smTimeStamp) > 30000){
             smartPlugs.smLive = "false"
         } else {
             smartPlugs.smLive = "true"
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
            smProximity = smartPlugs.smProximity;
            smEmail = smartPlugs.smEmail;
            smStateEmail = smartPlugs.smStateEmail;
            smUser = smartPlugs.smUser;
            smPassword = smartPlugs.smPassword;
            smInitialConf = smartPlugs.smInitialConf;
            smPG1 = smartPlugs.smPG1;
            smPG2 = smartPlugs.smPG2;
            smPG3 = smartPlugs.smPG3;
            selectedSmartPlug = {id,smLive,smState,smGroup,smTimeStamp,smProximity,smEmail,smStateEmail,
            smUser,smPassword,smInitialConf,smPG1,smPG2,smPG3}
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
    let smProximity = req.body.smProximity;
    let smEmail = req.body.smEmail;
    let smStateEmail = req.body.smStateEmail;
    let smUser = req.body.smUser;
    let smPassword = req.body.smPassword;
    let smInitialConf = req.body.smInitialConf;
    let smPG1 = req.body.smPG1;
    let smPG2 = req.body.smPG2;
    let smPG3 = req.body.smPG3;

    if (id && smLive && smState && smGroup && smProximity && smEmail && smStateEmail 
        && smUser && smPassword && smInitialConf && smPG1 && smPG2 && smPG3) {
        // Modifica el registro en cuestión y los del grupo
        smartPlugs.forEach((smartPlugs) => {
           if (smartPlugs.id === id || (smartPlugs.smGroup === smGroup && smartPlugs.smUser === smUser 
            && smartPlugs.smPassword === smPassword)) {
               smartPlugs.smLive = smLive;
               smartPlugs.smState = smState;
               smartPlugs.smGroup = smGroup;
               smartPlugs.smTimeStamp = smTimeStamp;
               smartPlugs.smProximity = smProximity;
               smartPlugs.smEmail = smEmail;
               smartPlugs.smStateEmail = smStateEmail;
               smartPlugs.smUser = smUser;
               smartPlugs.smPassword = smPassword;
               smartPlugs.smInitialConf = smInitialConf;
               smartPlugs.smPG1 = smPG1;
               smartPlugs.smPG2 = smPG2;
               smartPlugs.smPG3 = smPG3;
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
    let password = 0;

    let id = req.body.id;
    let smLive = req.body.smLive; 
    let smState = req.body.smState;
    let smGroup = req.body.smGroup;
    let smTimeStamp = Date.now();
    let smProximity = req.body.smProximity;
    let smEmail = req.body.smEmail;
    let smStateEmail = req.body.smStateEmail;
    let smUser = req.body.smUser;
    let smPassword = req.body.smPassword;
    let smInitialConf = req.body.smInitialConf;
    let smPG1 = req.body.smPG1;
    let smPG2 = req.body.smPG2;
    let smPG3 = req.body.smPG3;

    
        
    
    if (id && smLive && smState && smGroup && smProximity && smEmail && smStateEmail 
        && smUser && smPassword && smInitialConf && smPG1 && smPG2 && smPG3) {

        // Se recorre al array y se comprueba si ya existe ese id y tambien se comprueba que si existe ese 
        // usuario, tenga la misma contraseña.
        smartPlugs.forEach(element => {
            // Si el id existe lo guarda en numberItem
            if (element.id === id) {
                numberItem = cont;
            }
            
            // Si el usuario existe, comprueba que la contraseña coincida
            if (element.smUser === smUser){
                if (element.smPassword !== smPassword){password = 1;}
            }

            // Si el grupo coincide, hace cambios para todo el grupo
            if (smartPlugs.smGroup === smGroup && smartPlugs.smUser === smUser
                && smartPlugs.smPassword === smPassword) {
                smartPlugs.smLive = smLive;
                smartPlugs.smState = smState;
                smartPlugs.smGroup = smGroup;
                smartPlugs.smTimeStamp = smTimeStamp;
                smartPlugs.smProximity = smProximity;
                smartPlugs.smEmail = smEmail;
                smartPlugs.smStateEmail = smStateEmail;
                smartPlugs.smUser = smUser;
                smartPlugs.smPassword = smPassword;
                smartPlugs.smInitialConf = smInitialConf;
                smartPlugs.smPG1 = smPG1;
                smartPlugs.smPG2 = smPG2;
                smartPlugs.smPG3 = smPG3;
            }

            cont = cont + 1;
        });

        
        // En caso de existir el registro y la contraseña ser correcta lo borra.
        if (numberItem !== -1 && password == 0) {smartPlugs.splice(numberItem,1)}

        // Escribe el registro en el array en el caso de ser la contraseña correcta
        if (password === 0){
            // En el caso de ser una configuración inicial, se cambia el estado a advertisement para anuciar 
            // la operación exitosa
            if (smInitialConf === "new"){
                smInitialConf = "advertisement"
            }
            const newSmartPlug = {id,smLive,smState,smGroup,smTimeStamp,smProximity,smEmail,smStateEmail,smUser,smPassword,smInitialConf,smPG1,smPG2,smPG3};

            smartPlugs.push (newSmartPlug);
            res.send(newSmartPlug);
        } else {
            res.status(500).json({error: 'Not match user and password'});
        }
        
    } else {
        res.status(500).json({error: 'There was an error.'});
    }
});

app.listen(port, () => {
 console.log("El servidor está inicializado en el puerto: " + port);
});
 