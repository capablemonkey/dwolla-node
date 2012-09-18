var dwolla = require('../lib/dwolla')
    , should = require('should')
    , c = require('../config')
    ;

describe('Account Balance', function() {
    it('should respond with a number', function(done) {
        dwolla.balance(c.token, function(err, balance) {
            balance.should.be.a('number');
            done();
        });
    });
});
