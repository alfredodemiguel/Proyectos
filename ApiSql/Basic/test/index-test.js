require ('dotenv').config({path:'./.env'});
let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;



const url= process.env.TEST_URL;

var testDataSend = {"id": "1","nombre": "","direccion": "","telefono": "","fax": ""};

chai.use(chaiHttp);



describe('Receive Data',() => {
		testDataSend = {"id": "1","nombre": "","direccion": "","telefono": "","fax": ""};
		it('Expect recived a object', (done) => {
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

describe('Create Provider',() => {
	testDataSend = {"id": "100","nombre": "Nombre_Test","direccion": "Direccion_Test","telefono": "12343455_Test","fax": "8676_Test"};
	it('Expect recived a object and status code equal 200', (done) => {
		chai.request(url)
			.post('/CreateProvider') 
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

 