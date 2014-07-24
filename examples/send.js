var Dwolla = require('dwolla')()    // Include the Dwolla REST Client
    , cfg = require('./_config')    // Include any required keys
    ;

// Seed the user's OAuth token
Dwolla.setToken(cfg.token);

/**
 * EXAMPLE 1: 
 *   Send money ($1.00) to a Dwolla ID 
 **/

Dwolla.send(cfg.pin, '812-626-8794', 1.00, function(err, data) {
   if (err) { console.log(err); }
   console.log(data);
});

/**
 * EXAMPLE 2: 
 *   Send money ($1.00) to an email address, with a note
 **/

Dwolla.send(cfg.pin, 'michael@dwolla.com', 1.00, {destinationType: 'Email', notes: 'Thanks for the coffee!'}, function(err, data) {
   if (err) { console.log(err); }
   console.log(data);
});