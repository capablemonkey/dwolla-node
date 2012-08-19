var Dwolla = require('dwolla')      // Include the Dwolla REST Client
    , cfg = require('./_config')    // Include any required keys
    , $ = require('seq')
    ;

$()
    .seq(function() {
        Dwolla.balance(cfg.token, this)
    })
    .seq(function(balance) {
        console.log('Your account balance is $' + balance);
    })
    .catch(function(error) {
        console.log('Oops: ' + error);
    })