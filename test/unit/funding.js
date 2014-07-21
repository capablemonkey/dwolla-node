var init = require('./testInit');
var should = require('should');

var dwolla = require('../../lib/dwolla')(init.fakeKeys.appKey, init.fakeKeys.appSecret);


describe('Contacts', function() {
	describe('get funding source by id', function() {
		it('Should make the correct request', function(done) {

		  dwolla.setToken(init.fakeKeys.accessToken);
	      dwolla.fundingSourceById('9999999', function() {});

	      init.restlerMock.lastRequest.url.should.equal('https://www.dwolla.com/oauth/rest/fundingsources/9999999');
	      init.restlerMock.lastRequest.options.should.eql({query: {oauth_token: init.fakeKeys.accessToken}});

	      done();
	    });
	});

	describe('get funding sources'), function() {
		  it('Should make the correct request', function(done) {
		  
		  dwolla.setToken(init.fakeKeys.accessToken);
	      dwolla.fundingSources(function() {});

	      init.restlerMock.lastRequest.url.should.equal('https://www.dwolla.com/oauth/rest/fundingsources/');
	      init.restlerMock.lastRequest.options.should.eql({query: {oauth_token: init.fakeKeys.accessToken}});

	      done();
	});
});