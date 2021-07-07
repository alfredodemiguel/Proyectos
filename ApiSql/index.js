const rest = new (require('rest-mssql-nodejs'))({
    user:'sa',
    password:'Sovasa00',
    server: '192.168.17.216',
    port: 1433,
    database: 'Therefore'
    });
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

var providers = [];


app.get ('/', (req, res) => res.send ('Incorrect URL.'));



app.get('/provider/:id', function(req, res) {
    let selectedProvider;

    const { id } = req.params;      
    let PNombre = "ACME";
    let PDireccion = "Rue del Percebe sn";
    let PTelefono = "123456";
    let PFax = "0987";
    selectedProvider = {id:id,PNombre:PNombre,PDireccion:PDireccion,PTelefono:PTelefono,PFax:PFax};
    res.send(selectedProvider);
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

app.listen(port, () => {
 console.log("El servidor está inicializado en el puerto: " + port);
});
 