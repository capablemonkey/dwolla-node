var init = require('./testInit');
var should = require('should');

var dwolla = require('../../lib/dwolla')(init.fakeKeys.appKey, init.fakeKeys.appSecret);

describe('Account', function() {
	describe('get balance', function() {
		it('Should make the correct request', function(done) {
			dwolla.setToken(init.fakeKeys.accessToken);
      dwolla.balance(function() {});

      init.restlerMock.lastRequest.url.should.equal('https://www.dwolla.com/oauth/rest/balance/');
      init.restlerMock.lastRequest.options.should.eql({query: {oauth_token: init.fakeKeys.accessToken}});

      done();
    });
	});
});
