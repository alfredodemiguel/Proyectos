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
	 thePlug = {
		inputId: 1,
		smLive: 'true',
		smState: 'On',
		smGroup: '0000' 	
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
			const id = "50:02:91:48:1C:11";
			smLive = 'true';
            smState = 'Off';
			smGroup = '0000';
			smTimeStamp = '';
			const newSmartPlug = {id,smLive,smState,smGroup,smTimeStamp};
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


	await describe('GET Data of Frist smartPlugs',()=>{

		it('should get 200 and show Frist Plug', (done) => {
			chai.request(url)
				.get('/smartplug/50:02:91:48:1C:11') 
				.set('Content-Type', 'application/json')           
				.end((err, res) => {
					expect(res.body).to.have.property('id').to.be.equal('50:02:91:48:1C:11');
					res.should.have.status(200);
					done();
				});  	
		}); 
	});


	await describe('Put Data of smartPlug',()=>{

		it('Put data SmartPlug', (done) => {
			thePlug = {
				inputId: "50:02:91:48:1C:11",
				smLive: 'true',
				smState: 'On',
				smGroup: '0000',
				smTimeStamp: '0'	
			}
			
			chai.request(url)
				.put('/smartplug/50:02:91:48:1C:11') 
				.set('Content-Type', 'application/json')
				.send(thePlug)
				.end( function(err,res){
					expect(res).to.have.status(200);
					done();
				});
		});   
	});	

	await describe('Check data smartPlug',()=>{

		it('smLive to be true', (done) => {
			chai.request(url)
				.get('/smartPlug/50:02:91:48:1C:11')
				.set('Content-Type', 'application/json')
				.end( function(err,res){
					expect(res.body).to.have.property('smState').to.be.equal('On');
					expect(res).to.have.status(200);
					done();
				});
		});   
	}); 

	await describe('change state of smState',()=>{

		it('smState to be Off', (done) => {

			thePlug = {
				inputId: "50:02:91:48:1C:11",
				smLive: 'true',
				smState: 'Off',
				smGroup: '0000',
				smTimeStamp: '0' 	
			};

			chai.request(url)
			.put('/smartplug/50:02:91:48:1C:11') 
			.set('Content-Type', 'application/json')
			.send(thePlug)
			.end( function(err,res){
				expect(res).to.have.status(200);
			});

			chai.request(url)
				.get('/smartPlug/50:02:91:48:1C:11')
				.set('Content-Type', 'application/json')
				.end( function(err,res){
					expect(res.body).to.have.property('smState').to.be.equal('Off');
					expect(res).to.have.status(200);
					done();
				});
		});   
	}); 




	await describe('change state of smState for group',()=>{

		it('smState must be on for all members of group', (done) => {
			
			// New plug of group 0000

			id = "50:02:91:48:1C:12";
			smLive = 'true';
            smState = 'Off';
			smGroup = '0000';
			smTimeStamp = '0';
			const newSmartPlug = {id,smLive,smState,smGroup};
			chai.request(url)
			.post('/smartplug')
			.set('Content-Type', 'application/json')
			.send(newSmartPlug)
			.end( function(err,res){
				expect(res).to.have.status(200);
			});
			
			// Change state plug 
			thePlug = {
				inputId: "50:02:91:48:1C:11",
				smLive: 'true',
				smState: 'On',
				smGroup: '0000',
				smTimeStamp: '0' 	
			};
			chai.request(url)
			.put('/smartplug/50:02:91:48:1C:11') 
			.set('Content-Type', 'application/json')
			.send(thePlug)
			.end( function(err,res){
				//expect(res).to.have.status(200);
			});

			// State must be On for all members of group
			chai.request(url)
				.get('/smartPlug/50:02:91:48:1C:12')
				.set('Content-Type', 'application/json')
				.end( function(err,res){
					expect(res.body).to.have.property('smState').to.be.equal('On');
					expect(res).to.have.status(200);
					done();
				});
		});   
	}); 


	await describe('Put no exitent plug',()=>{

		it('Put No SmartPlug', (done) => {
			
			thePlug = {
				inputId: "50:02:91:48:1C:12",
				smLive: 'true',
				smState: 'On',
				smGroup: '0000',
				smTimeStamp: '0'	
			};
			chai.request(url)
				.put('/smartplug/50:02:91:48:1C:12') 
				.set('Content-Type', 'application/json')
				.send(thePlug)
				.end( function(err,res){
					expect(res).to.have.status(200);
					done();
				});
		});   
	});



	await describe('Post New types of Data',()=>{

		it('Post New types of Data', (done) => {
			id = "50:02:91:48:1C:13";
			smLive = 9999;
            smState = 'Off%&&*?iiuo';
			smGroup = 1.2;
			smTimeStamp = '0';
			const newSmartPlug = {id,smLive,smState,smGroup,smTimeStamp};
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



	await describe('Delete Data of Frist smartPlugs',()=>{

		it('should get 200 and show Frist Plug', (done) => {
			chai.request(url)
				.delete('/smartplug/50:02:91:48:1C:11') 
				.set('Content-Type', 'application/json')           
				.end((err, res) => {
					res.should.have.status(200);
					done();
				});  	
		}); 
	});



	await describe('Post Exitent Data of smartPlug',()=>{

		it('Post Exitent data smartPlug', (done) => {
			const id = "50:02:91:48:1C:12";
			smLive = 'true';
            smState = 'Off';
			smGroup = '0000';
			smTimeStamp = '0';
			const newSmartPlug = {id,smLive,smState,smGroup,smTimeStamp};
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




}

 Test();
 