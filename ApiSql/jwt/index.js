//const accessToken = require ('./accessToken');
const rest = new (require('rest-mssql-nodejs'))({
    user:'sa',
    password:'Sovasa00',
    server: '192.168.17.70',
    port: 1433,
    database: 'Therefore'
    });
const express = require('express');
const jwt = require('jsonwebtoken');
const morgan = require ('morgan');
const bodyParser = require('body-parser');


const app = express();
app.use (morgan('dev'));
app.use(express.static('.'));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))
app.use(bodyParser.json({limit: '10mb', extended: true}))

const config = {
    myKey : "Sovasa00"
};
app.set('myKey', config.myKey);

const accessToken = express.Router(); 
accessToken.use((req, res, next) => {
    const token = req.headers['access-token'];
    
    if (token) {
        jwt.verify(token, app.get('myKey'), (err, decoded) => {      
            if (err) {
                return res.json({ mensaje: 'Token inválida' });    
            } else {
                req.decoded = decoded;    
                next();
            }
        });
    } else {
        res.send({ 
            mensaje: 'Token no proveída.' 
        });
    }
});

const port = 3031;
app.listen(port, () => {
    console.log("The server is starting on port " + port);
});




app.get ('/', (req, res) => res.send ('Incorrect EndPoint'));

app.post('/autenticar', (req, res) => {
    if(req.body.usuario === "canon" && req.body.contrasena === "1234") {
		const payload = {
			check:  true
		};
		const token = jwt.sign(payload, app.get('myKey'), {
			expiresIn: 1440
		});
		res.json({
			mensaje: 'Autenticación correcta',
			token: token
		});
    } else {
        res.json({ mensaje: "Usuario o contraseña incorrectos"})
    }
})




app.post('/ReadProvider',accessToken, function(req, res) {
    let id = req.body.id;
    let nombre,direccion,telefono,fax;
   
    setTimeout (async() =>{
        let result = await rest.executeQuery ('select * from proveedores where id = @id',[{
            name: 'id',
            type:'varchar',
            value: id
        }]);
        result = result.data[0][0];      
        typeof result === 'undefined' ? console.log ("Is Empty") :  {nombre,direccion,telefono,fax} = result;
        res.send({id:id,Nombre:nombre,Direccion:direccion,Telefono:telefono,Fax:fax});
    },1500);
});


app.post('/CreateProvider',accessToken, function(req, res) {
    let {id,nombre,direccion,telefono,fax} = req.body;
   
    setTimeout (async() =>{
        let result = await rest.executeQuery ('INSERT INTO proveedores VALUES (@id,@nombre,@direccion,@telefono,@fax)',[{
            name: 'id',
            type:'varchar',
            value: id
        },
        {
            name: 'nombre',
            type:'varchar',
            value: nombre
        },
        {
            name: 'direccion',
            type:'varchar',
            value: direccion
        },
        {
            name: 'telefono',
            type:'varchar',
            value: telefono
        },
        {
            name: 'fax',
            type:'varchar',
            value: fax
        }
        ]);
        console.log (result);
        res.send(result);
    },1500);
});


app.post('/UpdateProvider',accessToken, function(req, res) {
    let {id,nombre,direccion,telefono,fax} = req.body;
   
    setTimeout (async() =>{
        let result = await rest.executeQuery ('update proveedores set nombre = @nombre, direccion = @direccion, telefono = @telefono, fax = @fax where id = @id',[{
            name: 'id',
            type:'varchar',
            value: id
        },
        {
            name: 'nombre',
            type:'varchar',
            value: nombre
        },
        {
            name: 'direccion',
            type:'varchar',
            value: direccion
        },
        {
            name: 'telefono',
            type:'varchar',
            value: telefono
        },
        {
            name: 'fax',
            type:'varchar',
            value: fax
        } 
    ]);
    console.log (result);
    res.send(result);
    },1500);
});

app.post('/DeleteProvider',accessToken, function(req, res) {
    let id = req.body.id;
   
    setTimeout (async() =>{
        let result = await rest.executeQuery ('delete from proveedores where id = @id',[{
            name: 'id',
            type:'varchar',
            value: id
        }]);
        console.log (result);
        res.send(result);
    },1500);
});






 