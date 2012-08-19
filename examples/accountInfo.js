var Dwolla = require('dwolla')      // Include the Dwolla REST Client
    , cfg = require('./_config')    // Include any required keys
    , $ = require('seq')
    ;

/**
 * EXAMPLE 1: 
 *   Fetch account information for the
 *   account associated with the provided
 *   OAuth token
 **/
$()
    .seq(function() {
        Dwolla.fullAccountInfo(cfg.token, this)
    })
    .seq(function(account) {
        console.log('Account info:');
        console.log(account);
    })
    .catch(function(error) {
        console.log('Oops: ' + error);
    })
    
    
/**
 * EXAMPLE 2: 
 *   Fetch basic account information
 *   for a given Dwolla ID
 **/
$()
    .seq(function() {
        Dwolla.basicAccountInfo(cfg.apiKey, cfg.apiSecret, '812-546-3855', this)
    })
    .seq(function(account) {
        console.log('Account info:');
        console.log(account);
    })
    .catch(function(error) {
        console.log('Oops: ' + error);
    })


/**
 * EXAMPLE 3: 
 *   Fetch basic account information
 *   for a given Email address
 **/
$()
    .seq(function() {
        Dwolla.basicAccountInfo(cfg.apiKey, cfg.apiSecret, 'michael@dwolla.com', this)
    })
    .seq(function(account) {
        console.log('Account info:');
        console.log(account);
    })
    .catch(function(error) {
        console.log('Oops: ' + error);
    })