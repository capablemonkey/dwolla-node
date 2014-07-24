var init = require('./testInit');
var should = require('should');

var dwolla = require('../../lib/dwolla')(init.fakeKeys.appKey, init.fakeKeys.appSecret);


describe('Offsite Gateway', function() {

	describe('set gateway mode', function() {
		it('Should return the correct boolean', function(done) {

	      dwolla.setMode('OTHER').should.equal(false);
	      done();
	    });
	});

	describe('start session', function() {
		it('Should return the correct boolean', function(done) {

	      dwolla.startGatewaySession('http://dummyredirect.com/return').should.equal(true);
	      done();
	    });
	});

	describe('add an item to cart', function() {
		it('Should add the correct item', function(done) {

	      dwolla.addGatewayProduct('Test', 1, 'Test Description', 2).should.equal(true);
	      dwolla.gatewaySession.should.equal([{'Name': 'Test', 'Description': 'Test Description', 'Price': 1, 'Quantity': 2}]);

	      done();
	    });
	});

	describe('create checkout session', function() {
		it('Should make the correct request', function(done) {

			// clear any old gateway sessions
			dwolla.startGatewaySession('http://dummyredirect.com/return');

		  dwolla.addGatewayProduct('Test', 1, 'Test Description', 2).should.equal(true);
	      dwolla.getGatewayURL('812-111-1111', function() {});

	      init.restlerMock.lastRequest.url.should.equal('https://www.dwolla.com/oauth/rest/offsitegateway/checkouts/');
	      init.restlerMock.lastRequest.options.should.eql( 
	      	{
	      		'Key': init.fakeKeys.appKey,
	      		'Secret': init.fakeKeys.appSecret, 
	      		'Redirect': 'http://dummyredirect.com/return',
	      		'Test' : 'false',
	      		'AllowFundingSources': 'false',
	      		'PurchaseOrder': {
	      			'DestinationId': '812-111-1111',
	      			'OrderItems': [{'Name': 'Test', 'Description': 'Test Description', 'Price': 1, 'Quantity': 2}],
	      			'Discount': -0,
	      			'Shipping': 0,
	      			'Tax': 0,
	      			'Total': 2,
	      			'Notes': ''
	      		}
	        });

	      done();
	    });
	});
});