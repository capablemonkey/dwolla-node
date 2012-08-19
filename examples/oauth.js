var Dwolla = require('dwolla')      // Include the Dwolla REST Client
    , cfg = require('./_config')    // Include any required keys
    , $ = require('seq')
    , express = require('express')
    , app = express()
    ;

// Some constants...
var redirect_uri = 'http://localhost:3000/oauth_return'


/**
 * STEP 1: 
 *   Create an authentication URL
 *   that the user will be redirected to
 **/
app.get('/', function(req, res) {
    var authUrl = Dwolla.authUrl(cfg.apiKey, redirect_uri);

    return res.send('To begin the OAuth process, send the user off to <a href="' + authUrl + '">' + authUrl + '</a>');
});


/**
 * STEP 2:
 *   Exchange the temporary code given
 *   to us in the querystring, for
 *   a never-expiring OAuth access token
 **/
app.get('/oauth_return', function(req, res) {
    var code = req.query['code'];

    Dwolla.requestToken(cfg.apiKey, cfg.apiSecret, code, redirect_uri, function(error, token) {
        return res.send("Your never-expiring OAuth access token is: <b>" + token + "</b>");
    });
});


// Start the server
app.listen(3000);