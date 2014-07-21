var init = require('./testInit');
var should = require('should');

var dwolla = require('../../lib/dwolla')(init.fakeKeys.appKey, init.fakeKeys.appSecret);


describe('Authentication', function() {
	describe('request token', function() {
		it('Should make the correct request', function(done) {
	      dwolla.requestToken('1234', function() {});

	      init.restlerMock.lastRequest.url.should.equal('https://www.dwolla.com/oauth/v2/token');
	      init.restlerMock.lastRequest.options.should.eql({query: {client_id: init.fakeKeys.appKey, client_secret: init.fakeKeys.appSecret, grant_type: 'authorization_code', code: '1234'}});

	      done();
	    });
	});
});