var init = require('./testInit');
var should = require('should');

var dwolla = require('../../lib/dwolla')(init.fakeKeys.appKey, init.fakeKeys.appSecret);

describe('Account', function() {
	describe('get balance', function() {
		dwolla.setToken(init.fakeKeys.accessToken);

		dwolla.balance(function() {return;});

		it('Should make the correct request', function(done) {
      init.restlerMock.lastRequest.url.should.equal('https://www.dwolla.com/oauth/rest/balance/');
      init.restlerMock.lastRequest.options.should.eql({query: {oauth_token: init.fakeKeys.accessToken}});

      done();
    });

    it('Should correctly parse sample API response', function(done) {
    	init.restlerMock.mockEmitter.emit('complete', '{
		    "Success": true,
		    "Message": "Success",
		    "Response": 19.15
			}');
    });
	});

	describe('get basicAccountInfo', function() {
		it('Should make the correct request', function(done) {
			var FAKE_EMAIL = 'some@email.com';
			dwolla.basicAccountInfo(FAKE_EMAIL, function() {return;});

			init.restlerMock.lastRequest.url.should.equal('https://www.dwolla.com/oauth/rest/users/' + FAKE_EMAIL);
			init.restlerMock.lastRequest.options.should.eql({query: {
				client_id: init.fakeKeys.appKey,
				client_secret: init.fakeKeys.appSecret
			}});

			done();
		});
	});
});
