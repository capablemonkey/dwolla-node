var Dwolla = require('dwolla')()    // Include the Dwolla REST Client
    , cfg = require('./_config')    // Include any required keys
    , $ = require('seq')
    ;

// Seed the user's OAuth token
Dwolla.setToken(cfg.token);

/**
 * EXAMPLE 1: 
 *   Fetch all funding sources for the
 *   account associated with the provided
 *   OAuth token
 **/
$()
    .seq(function() {
        Dwolla.fundingSources(this)
    })
    .seq(function(sources) {
        console.log('Funding sources:');
        console.log(sources);
    })
    .catch(function(error) {
        console.log('Oops: ' + error);
    })
    
    
/**
 * EXAMPLE 2: 
 *   Fetch detailed information for the
 *   funding source with a specific ID
 **/
$()
    .seq(function() {
        var fundingSourceId = 'pJRq4tK38fiAeQ8xo2iH9Q==';
        Dwolla.fundingSourceById(fundingSourceId, this);
    })
    .seq(function(source) {
        console.log('Funding source:');
        console.log(source);
    })
    .catch(function(error) {
        console.log('Oops: ' + error);
    })