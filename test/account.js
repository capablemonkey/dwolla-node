var init = require('./testInit');
var should = require('should');

var FAKE_KEY = 'fakekey';
var FAKE_SECRET = 'fakesecret';
var FAKE_TOKEN = 'faketoken';

var dwolla = require('../lib/dwolla')(FAKE_KEY, FAKE_SECRET);

describe('Account', function() {
	describe('get balance', function() {
		it('Should make the correct request', function(done) {
			dwolla.setToken(FAKE_TOKEN);
      dwolla.balance(function() {});

      init.restlerMock.lastRequest.url.should.equal('https://www.dwolla.com/oauth/rest/balance/');
      init.restlerMock.lastRequest.options.should.eql({query: {oauth_token: FAKE_TOKEN}});

      done();
    });
	});
});
