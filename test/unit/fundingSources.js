var init = require('./testInit');
var should = require('should');

var dwolla = require('../../lib/dwolla')(init.fakeKeys.appKey, init.fakeKeys.appSecret);


describe('Funding', function() {
	describe('get funding source by id', function() {
		it('Should make the correct request', function(done) {

		  dwolla.setToken(init.fakeKeys.accessToken);
	      dwolla.fundingSourceById('9999999', function() {});

	      init.restlerMock.lastRequest.url.should.equal('https://www.dwolla.com/oauth/rest/fundingsources/9999999');
	      init.restlerMock.lastRequest.options.should.eql({query: {oauth_token: init.fakeKeys.accessToken}});

	      done();
	    });
	});

	describe('get funding sources', function() {
		  it('Should make the correct request', function(done) {
		  
		  dwolla.setToken(init.fakeKeys.accessToken);
	      dwolla.fundingSources(function() {});

	      init.restlerMock.lastRequest.url.should.equal('https://www.dwolla.com/oauth/rest/fundingsources/');
	      init.restlerMock.lastRequest.options.should.eql({query: {oauth_token: init.fakeKeys.accessToken}});

	      done();
	    });
	});

    describe('add a funding source', function() {
        it('Should make the correct request', function(done) {

            dwolla.setToken(init.fakeKeys.accessToken);
            dwolla.addFundingSource('12345678', '87654321', 'Checking', 'My Bank', function() {});

            init.restlerMock.lastRequest.url.should.equal('https://www.dwolla.com/oauth/rest/fundingsources/');
            init.restlerMock.lastRequest.options.should.eql({query: {oauth_token: init.fakeKeys.accessToken, account_number: '12345678', routing_number: '87654321', account_type: 'Checking', name: 'My Bank'}});

            done();
        });
    });

    describe('verify a funding source', function() {
        it('Should make the correct request', function(done) {

            dwolla.setToken(init.fakeKeys.accessToken);
            dwolla.verifyFundingSource('0.02', '0.05', '12345678', function() {});

            init.restlerMock.lastRequest.url.should.equal('https://www.dwolla.com/oauth/rest/fundingsources/12345678/verify/');
            init.restlerMock.lastRequest.options.should.eql({query: {oauth_token: init.fakeKeys.accessToken, deposit1: '0.02', deposit2: '0.05'}});

            done();
        });
    });

    describe('withdraw from funding source', function() {
        it('Should make the correct request', function(done) {

            dwolla.setToken(init.fakeKeys.accessToken);
            dwolla.withdrawFromFundingSource('1234', '5.00', '12345678', function() {});

            init.restlerMock.lastRequest.url.should.equal('https://www.dwolla.com/oauth/rest/fundingsources/12345678/withdraw/');
            init.restlerMock.lastRequest.options.should.eql({query: {oauth_token: init.fakeKeys.accessToken, pin: '1234', amount: '5.00', fundingId: '12345678'}});

            done();
        });
    });
});