const rest = new (require('rest-mssql-nodejs'))({
    user:'sa',
    password:'Sovasa00',
    server: '192.168.17.91',
    port: 1433,
    database: 'Therefore'
    });
const express = require('express');
const morgan = require ('morgan');
const fs = require('fs');
const https = require('https');
const bodyParser = require('body-parser');
const cors = require('cors-express');
const app = express();

const PUERTO = 3030;

https.createServer({
   cert: fs.readFileSync('alfredodemiguel.crt'),
   key: fs.readFileSync('alfredodemiguel.key')
 },app).listen(PUERTO, function(){
	console.log('Servidor https correindo en el puerto 3030');
});




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


app.get ('/', (req, res) => res.send ('Incorrect URL.'));



app.get('/provider/:id', function(req, res) {
    let selectedProvider,PNombre,PDireccion,PTelefono,PFax;;
    var { id } = req.params; 
    id = id.split(':');
    id = id[1];

    setTimeout (async() =>{
        let resultado = await rest.executeQuery ('select * from proveedores where id = @id',[{
            name: 'id',
            type:'varchar',
            value: id
        }]);
        resultado = resultado.data[0][0];
        PNombre = resultado.nombre;
        PDireccion = resultado.direccion;
        PTelefono = resultado.telefono;
        PFax = resultado.fax;
        selectedProvider = {id:id,PNombre:PNombre,PDireccion:PDireccion,PTelefono:PTelefono,PFax:PFax};
        res.send(selectedProvider);
        },1500);
});







app.post('/provider', (req, res) => {
            
    let id = req.body.id;
    let PNombre = req.body.PNombre;
    let PDireccion = req.body.PDireccion;
    let PTelefono = req.body.PTelefono;
    let PFax = req.body.PFax;

    
      
    setTimeout (async() =>{
        const resultado = await rest.executeQuery ('select * from proveedores where id = @id',[{
            name: 'id',
            type:'varchar',
            value: '2'
        }]);
        console.log (resultado.data);
        },1500);



    let selectedProvider = {id:id,PNombre:PNombre,PDireccion:PDireccion,DTelefono:PTelefono,PFax:PFax};
    res.send(selectedProvider);
});


 