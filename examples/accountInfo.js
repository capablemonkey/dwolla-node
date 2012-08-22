var Dwolla = require('dwolla')(cfg.apiKey, cfg.apiSecret)   // Include the Dwolla REST Client
    , cfg = require('./_config')                            // Include any required keys
    , $ = require('seq')
    ;

// Seed the user's OAuth token
Dwolla.setToken(cfg.token);

/**
 * EXAMPLE 1: 
 *   Fetch account information for the
 *   account associated with the provided
 *   OAuth token
 **/
$()
    .seq(function() {
        Dwolla.fullAccountInfo(this)
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
        Dwolla.basicAccountInfo('812-546-3855', this)
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
        Dwolla.basicAccountInfo('michael@dwolla.com', this)
    })
    .seq(function(account) {
        console.log('Account info:');
        console.log(account);
    })
    .catch(function(error) {
        console.log('Oops: ' + error);
    })