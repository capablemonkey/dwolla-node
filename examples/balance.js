var Dwolla = require('dwolla')()    // Include the Dwolla REST Client
    , cfg = require('./_config')    // Include any required keys
    , $ = require('seq')
    ;

// Seed the user's OAuth token
Dwolla.setToken(cfg.token);

$()
    .seq(function() {
        Dwolla.balance(this)
    })
    .seq(function(balance) {
        console.log('Your account balance is $' + balance);
    })
    .catch(function(error) {
        console.log('Oops: ' + error);
    })