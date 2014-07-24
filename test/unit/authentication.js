var init = require('./testInit');
var should = require('should');

var dwolla = require('../../lib/dwolla')(init.fakeKeys.appKey, init.fakeKeys.appSecret);


describe('Authentication', function() {
	describe('oauth initiation URL', function() {
		it('Should be valid for sandbox environment', function(done) {
			dwolla.sandbox = true;
			var url = dwolla.authUrl("https://www.google.com/");

			url.should.equal('https://uat.dwolla.com/oauth/v2/authenticate?client_id=JCGQXLrlfuOqdUYdTcLz3rBiCZQDRvdWIUPkw%2B%2BGMuGhkem9Bo&response_type=code&scope=Send%7CTransactions%7CBalance%7CRequest%7CContacts%7CAccountInfoFull%7CFunding%7CManageAccount&redirect_uri=https%3A%2F%2Fwww.google.com%2F');
			done();
		});

		it('Should be valid for sandbox environment', function(done) {
			dwolla.sandbox = false;
			var url = dwolla.authUrl("https://www.google.com/");

			url.should.equal('https://www.dwolla.com/oauth/v2/authenticate?client_id=JCGQXLrlfuOqdUYdTcLz3rBiCZQDRvdWIUPkw%2B%2BGMuGhkem9Bo&response_type=code&scope=Send%7CTransactions%7CBalance%7CRequest%7CContacts%7CAccountInfoFull%7CFunding%7CManageAccount&redirect_uri=https%3A%2F%2Fwww.google.com%2F');
			done();
		});
	});

	describe('request token', function() {
		it('Should make the correct request', function(done) {
      dwolla.requestToken('1234', 'https://fakeredirect.com/', function() {});

      init.restlerMock.lastRequest.url.should.equal('https://www.dwolla.com/oauth/v2/token');
      init.restlerMock.lastRequest.options.should.eql({query: {client_id: init.fakeKeys.appKey, client_secret: init.fakeKeys.appSecret, grant_type: 'authorization_code', code: '1234', redirect_uri: 'https://fakeredirect.com/'}});

      done();
    });
	});
});