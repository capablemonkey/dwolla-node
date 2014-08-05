var Dwolla = require('dwolla')()    // Include the Dwolla REST Client
    , cfg = require('./_config')    // Include any required keys
    ;

// Seed the user's OAuth token
Dwolla.setToken(cfg.accessToken);

// use sandbox API environment
Dwolla.sandbox = true;

/***
 * Example 1:
 *
 * Get balance of the user associated with the OAuth token.
 */

Dwolla.balance(function(err, data){
   if (err) { console.log(err); }
   console.log(data);
});
