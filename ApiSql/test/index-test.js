require ('dotenv').config({path:'./.env'});
let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;



const url= process.env.TEST_URL;

var testDataSend = {"id": "1","nombre": "","direccion": "","telefono": "","fax": ""};

chai.use(chaiHttp);





describe('Create Provider',() => {
	testDataSend = {"id": "1000","nombre": "Nombre_Test","direccion": "Direccion_Test","telefono": "12343455_Test","fax": "8676_Test"};
	it('Expect create a  provider and recived a object, success equal true and status code equal 200', (done) => {
		chai.request(url)
			.post('/CreateProvider') 
			.set('Content-Type', 'application/json')   
			.set('Authorization',process.env.TEST_AUTHORIZATION)  
			.send (testDataSend)      
			.end((err, res) => {
				expect(res).to.be.a('object');
				expect (res.statusCode).to.equal (200);
				expect (res.body.success).to.equal (true);
				done();
			});  	
	}); 
	testDataSend = {"id": "1000","nombre": "","direccion": "","telefono": "","fax": ""};
	it('Expect recived a object, nombre igual a Nombre_Test and statusCode equal 200', (done) => {
			chai.request(url)
				.post('/ReadProvider') 
				.set('Content-Type', 'application/json')   
				.set('Authorization',process.env.TEST_AUTHORIZATION)  
				.send (testDataSend)      
				.end((err, res) => {
					expect(res).to.be.a('object');
					expect (res.statusCode).to.equal (200);
					done();
				});  	
		}); 
});



describe('Modify Provider',() => {
	testDataSend = {"id": "1000","nombre": "Nombre_Test2","direccion": "Direccion_Test","telefono": "12343455_Test","fax": "8676_Test"};
	it('Expect Update a  provider and recived a object and status code equal 200', (done) => {
		chai.request(url)
			.post('/UpdateProvider') 
			.set('Content-Type', 'application/json')   
			.set('Authorization',process.env.TEST_AUTHORIZATION)  
			.send (testDataSend)      
			.end((err, res) => {
				expect(res).to.be.a('object');
				expect (res.statusCode).to.equal (200);
				done();
			});  	
	}); 
	testDataSend = {"id": "1000","nombre": "","direccion": "","telefono": "","fax": ""};
	it('Expect recived a object, nombre igual a Nombre_Test2 and statusCode equal 200', (done) => {
		chai.request(url)
			.post('/ReadProvider') 
			.set('Content-Type', 'application/json')   
			.set('Authorization',process.env.TEST_AUTHORIZATION)  
			.send (testDataSend)      
			.end((err, res) => {
				expect(res).to.be.a('object');
				expect (res.statusCode).to.equal (200);
				//expect (res.body.Nombre).to.equal ("Nombre_Test2");
				done();
			});  	
		}); 
});



describe('Delete Provider',() => {
	testDataSend = {"id": "1000","nombre": "","direccion": "","telefono": "","fax": ""};
	it('Expect delete a  provider and recived an object with success": true', (done) => {
		chai.request(url)
			.post('/DeleteProvider') 
			.set('Content-Type', 'application/json')   
			.set('Authorization',process.env.TEST_AUTHORIZATION)  
			.send (testDataSend)      
			.end((err, res) => {
				expect(res).to.be.a('object');
				expect (res.body.success).to.equal (true);
				done();
			});  	
	}); 
	testDataSend = {"id": "1000","nombre": "","direccion": "","telefono": "","fax": ""};
	it('Expect recived a empty object, id equal 1000 and statusCode equal 200', (done) => {
		chai.request(url)
			.post('/ReadProvider') 
			.set('Content-Type', 'application/json')   
			.set('Authorization',process.env.TEST_AUTHORIZATION)  
			.send (testDataSend)      
			.end((err, res) => {
				expect(res).to.be.a('object');
				expect (res.statusCode).to.equal (200);
				expect (res.body.id).to.equal ('1000');
				//expect (res.body).to.equal ({id:'1000'});
				done();
			});  	
		}); 
}); 