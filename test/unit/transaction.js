var init = require('./testInit');
var should = require('should');

var dwolla = require('../../lib/dwolla')(init.fakeKeys.appKey, init.fakeKeys.appSecret);


describe('Transaction', function() {

	describe('get transaction by id', function() {
		it('Should make the correct request', function(done) {

		  dwolla.setToken(init.fakeKeys.accessToken);
	      dwolla.transactionById('12345678', function() {});

	      init.restlerMock.lastRequest.url.should.equal('https://www.dwolla.com/oauth/rest/transactions/12345678');
	      init.restlerMock.lastRequest.options.should.eql({query: {oauth_token: init.fakeKeys.accessToken}});

	      done();
	    });
	});

	describe('get transactions', function() {
		it('Should make the correct request', function(done) {

		  dwolla.setToken(init.fakeKeys.accessToken);
	      dwolla.transactions(function() {});

	      init.restlerMock.lastRequest.url.should.equal('https://www.dwolla.com/oauth/rest/transactions/');
	      init.restlerMock.lastRequest.options.should.eql({query: {oauth_token: init.fakeKeys.accessToken}});

	      done();
	    });
	});

	describe('get transaction stats', function() {
		it('Should make the correct request', function(done) {

		  dwolla.setToken(init.fakeKeys.accessToken);
	      dwolla.transactionsStats(function() {});

	      init.restlerMock.lastRequest.url.should.equal('https://www.dwolla.com/oauth/rest/transactions/stats/');
	      init.restlerMock.lastRequest.options.should.eql({query: {oauth_token: init.fakeKeys.accessToken}});

	      done();
	    });
	});

	describe('send transaction', function() {
		it('Should make the correct request', function(done) {

		  dwolla.setToken(init.fakeKeys.accessToken);
	      dwolla.send('1234', '812-111-1111', '10.00', function() {});

	      init.restlerMock.lastRequest.url.should.equal('https://www.dwolla.com/oauth/rest/transactions/stats/');
	      init.restlerMock.lastRequest.options.should.eql({query: {oauth_token: init.fakeKeys.accessToken, pin: '1234', destinationId: '812-111-1111', amount: '10.00'}});

	      done();
	    });
	});

	describe('request transaction', function() {
		it('Should make the correct request', function(done) {

		  dwolla.setToken(init.fakeKeys.accessToken);
	      dwolla.request('812-111-1111', '5.00', function() {});

	      init.restlerMock.lastRequest.url.should.equal('https://www.dwolla.com/oauth/rest/requests/');
	      init.restlerMock.lastRequest.options.should.eql({query: {oauth_token: init.fakeKeys.accessToken,  sourceId: '812-111-1111', amount: '5.00'}});

	      done();
	    });
	});

});