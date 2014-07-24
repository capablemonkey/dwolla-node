var Dwolla = require('dwolla')(cfg.apiKey, cfg.apiSecret)   // Include the Dwolla REST Client
    , cfg = require('./_config')                            // Include any required keys
    ;

// Seed the user's OAuth token
Dwolla.setToken(cfg.token);

/**
 * EXAMPLE 1: 
 *   Fetch account information for the
 *   account associated with the provided
 *   OAuth token
 **/

Dwolla.fullAccountInfo(function(err, data) {
    if (err) { console.log(err); }
    console.log(data);
});

    
/**
 * EXAMPLE 2: 
 *   Fetch basic account information
 *   for a given Dwolla ID
 **/

Dwolla.basicAccountInfo('812-546-3855', function(err, data) {
    if (err) { console.log(err); }
    console.log(data);
});


/**
 * EXAMPLE 3: 
 *   Fetch basic account information
 *   for a given Email address
 **/

Dwolla.basicAccountInfo('michael@dwolla.com', function(err, data){
   if (err) { console.log(err); }
   console.log(data);
});
