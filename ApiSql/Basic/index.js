require ('dotenv').config();
const exec = require('child_process').exec
//const Shell = require('shelljs')
const mwBasicAuth = require ('./mwBasicAuth');
/*
const rest = new (require('rest-mssql-nodejs'))({
    user:'sa',
    password:'Sovasa00',
    server: '192.168.17.70',
    port: 1433,
    database: 'Therefore'
    });
*/
const express = require('express');
const morgan = require ('morgan');
const bodyParser = require('body-parser');


const app = express();
app.use (morgan('dev'));
app.use(express.static('.'));
app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))
app.use (mwBasicAuth);

const port = process.env.PORT

app.listen(port, () => {
    console.log("The server is starting on port " + port);
});
    

app.post('/ReadProvider', function(req, res) {
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


app.post('/CreateProvider', function(req, res) {
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


app.post('/UpdateProvider', function(req, res) {
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

app.post('/DeleteProvider', function(req, res) {
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


app.post('/RunProgram', function(req, res) {

    let {id,nombre,direccion,telefono,fax} = req.body;
    
    let Line = id + '\t' + nombre + '\t' + direccion + '\t' + telefono + '\t' + fax;
    exec('./appendText.sh ' + Line, (err, stdout) =>{
        if(err){
            throw err;
        }
    });
    res.send ('Append Line!!!!');
    res.status(204);
});


 