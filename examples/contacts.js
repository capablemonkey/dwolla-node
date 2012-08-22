var Dwolla = require('dwolla')()    // Include the Dwolla REST Client
    , cfg = require('./_config')    // Include any required keys
    , $ = require('seq')
    ;

// Seed the user's OAuth token
Dwolla.setToken(cfg.token);

/**
 * EXAMPLE 1: 
 *   Fetch last 10 contacts from the 
 *   account associated with the provided
 *   OAuth token
 **/
$()
    .seq(function() {
        Dwolla.contacts(this)
    })
    .seq(function(contacts) {
        console.log('Contacts found:');
        console.log(contacts);
    })
    .catch(function(error) {
        console.log('Oops: ' + error);
    })
    
    
/**
 * EXAMPLE 2: 
 *   Search through the contacts of the
 *   account associated with the provided
 *   OAuth token
 **/
$()
    .seq(function() {
        Dwolla.contacts({search: 'Ben'}, this)
    })
    .seq(function(contacts) {
        console.log('Contacts found:');
        console.log(contacts);
    })
    .catch(function(error) {
        console.log('Oops: ' + error);
    })