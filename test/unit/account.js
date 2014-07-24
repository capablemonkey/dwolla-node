var init = require('./testInit');
var should = require('should');

var dwolla = require('../../lib/dwolla')(init.fakeKeys.appKey, init.fakeKeys.appSecret);

describe('Account', function() {
	describe('get balance', function() {
		it('Should make the correct request', function(done) {
			dwolla.setToken(init.fakeKeys.accessToken);
			dwolla.balance(function() {return;});

      init.restlerMock.lastRequest.url.should.equal('https://www.dwolla.com/oauth/rest/balance/');
      init.restlerMock.lastRequest.options.should.eql({query: {oauth_token: init.fakeKeys.accessToken}});

      done();
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

	describe('toggle auto withdrawal', function() {
		it('Should make the correct request', function(done) {
		  dwolla.setToken(init.fakeKeys.accessToken);
	      dwolla.toggleAutoWithdraw(true, '1234567', function() {});

	      init.restlerMock.lastRequest.url.should.equal('https://www.dwolla.com/oauth/rest/accounts/features/auto_withdrawl');
	      init.restlerMock.lastRequest.options.should.eql({query: {oauth_token: init.fakeKeys.accessToken, enabled: true, fundingId: '1234567'}});

	      done();
	    });
	});

	describe('get auto withdrawal status', function() {
		it('Should make the correct request', function(done) {
		  dwolla.setToken(init.fakeKeys.accessToken);
	      dwolla.getAutoWithdrawalStatus(function() {});

	      init.restlerMock.lastRequest.url.should.equal('https://www.dwolla.com/oauth/rest/accounts/features/auto_withdrawl');
	      init.restlerMock.lastRequest.options.should.eql({query: {oauth_token: init.fakeKeys.accessToken}});

	      done();
	    });
	});

	describe('full account info', function() {
		it('Should make the correct request', function(done) {
		  dwolla.setToken(init.fakeKeys.accessToken);
	      dwolla.fullAccountInfo(function() {});

	      init.restlerMock.lastRequest.url.should.equal('https://www.dwolla.com/oauth/rest/users/');
	      init.restlerMock.lastRequest.options.should.eql({query: {oauth_token: init.fakeKeys.accessToken}});

	      done();
	    });
	});

});
