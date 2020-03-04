// Import the dependencies for testing

var chai = require('chai')
var chaiHttp = require('chai-http');
const expect = require('chai').expect;


 async function Test () {
	// Configure chai
	chai.use(chaiHttp);
	chai.should();
	const url= 'http://localhost:3017';

	// Values of api
	var smartPlugs = [];
	const thePlug = {
		inputId: 1,
		isSmartPlugLive: 'Test isSmartPlugLive PUT',
		plug: 'Test plug PUT',
		proximity: 'Test proximity PUT',
		plugState: 'Test plugState PUT',
		proximityState: 'Test proximityState PUT', 	
	}

	await describe('GET Data of smartPlugs',()=>{

		it('should get 200 and store data', (done) => {
			chai.request(url)
				.get('/smartplug') 
				.set('Content-Type', 'application/json')           
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('array');
					done();
				});  	
		});
	});


	await describe('Post New Data of smartPlug',()=>{

		it('Post data smartPlug', (done) => {
			const id = 1;
			isSmartPlugLive = 'Test isSmartPlugLive POST';
            plug = 'Test plug POST';
            proximity = 'Test proximity POST';
            plugState = 'Test plugState POST';
            proximityState = 'Test proximityState POST';
			const newSmartPlug = {id,isSmartPlugLive,plug,proximity,plugState,proximityState};
			smartPlugs.push (newSmartPlug);
			
			
			chai.request(url)
				.post('/smartplug')
				.set('Content-Type', 'application/json')
				.send(newSmartPlug)
				.end( function(err,res){
					expect(res).to.have.status(200);
					done();
				});
		});   
	});


	await describe('Put New Data of smartPlug',()=>{

		it('Put data SmartPlug', (done) => {
			
			
			chai.request(url)
				.put('/smartplug/1')
				.set('Content-Type', 'application/json')
				.send(thePlug)
				.end( function(err,res){
					expect(res).to.have.status(200);
					done();
				});
		});   
	});


	await describe('Check data smartPlug',()=>{

		it('isSmartPlugLive to be Test Live PUT', (done) => {
			chai.request(url)
				.get('/smartPlug/1')
				.set('Content-Type', 'application/json')
				.end( function(err,res){
					expect(res.body).to.have.property('isSmartPlugLive').to.be.equal('Test isSmartPlugLive PUT');
					expect(res).to.have.status(200);
					done();
				});
		});   
	}); 
}

 Test();
 