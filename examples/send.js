var Dwolla = require('dwolla')      // Include the Dwolla REST Client
    , cfg = require('./_config')    // Include any required keys
    , $ = require('seq')
    ;

/**
 * EXAMPLE 1: 
 *   Send money ($1.00) to a Dwolla ID 
 **/
$()
    .seq(function() {
        Dwolla.send(cfg.token, cfg.pin, '812-626-8794', 1.00, this)
    })
    .seq(function(transaction) {
        console.log('Money sent successfully. Transaction ID: ' + transaction);
    })
    .catch(function(error) {
        console.log('Oops: ' + error);
    })
    
    
/**
 * EXAMPLE 2: 
 *   Send money ($1.00) to an email address, with a note
 **/
$()
    .seq(function() {
        Dwolla.send(cfg.token, cfg.pin, 'michael@dwolla.com', 1.00, {destinationType: 'Email', notes: 'Everyone loves getting money'}, this)
    })
    .seq(function(transaction) {
        console.log('Money sent successfully. Transaction ID: ' + transaction);
    })
    .catch(function(error) {
        console.log('Oops: ' + error);
    })