var Dwolla = require('dwolla')      // Include the Dwolla REST Client
    , cfg = require('./_config')    // Include any required keys
    , $ = require('seq')
    , express = require('express')
    , app = express()
    ;

// Some constants...
var redirect_uri = 'http://localhost:3000/redirect'


/**
 * EXAMPLE 1: (simple example) 
 *   Create a new offsite gateway checkout
 *   session, with 1 test product, and
 *   a minimum of parameters
 **/
app.get('/example1', function(req, res) {
    // Clears out any previous products
    Dwolla.startGatewaySession(cfg.apiKey, cfg.apiSecret, redirect_uri);

    // Add first product; Price = $10, Qty = 1
    Dwolla.addGatewayProduct('Test 1', 10)
    
    // Creates a checkout session, and return the URL
    // Destination ID: 812-626-8794
    $()
        .seq(function() {
            Dwolla.getGatewayURL('812-626-8794', this)
        })
        .seq(function(url) {
            return res.send('To begin the checkout process, send the user off to <a href="' + url + '">' + url + '</a>');
        })
        .catch(function(error) {
            return res.send('Oops: ' + error);
        })
});


/**
 * EXAMPLE 2: (in-depth example) 
 *   Create a new offsite gateway checkout
 *   session, with 2 test products, a
 *   discount, add shipping costs, tax,
 *   and order ID, and a memo/note
 **/
app.get('/example2', function(req, res) {
    // Set the server mode to test mode
    Dwolla.setMode('TEST')
    
    // Clears out any previous products
    Dwolla.startGatewaySession(cfg.apiKey, cfg.apiSecret, redirect_uri);
    
    // Add first product; Price = $10, Qty = 1
    Dwolla.addGatewayProduct('Test 1', 10, 'Test product')
    
    // Add first product; Price = $6, Qty = 2
    Dwolla.addGatewayProduct('Test 2', 6, 'Another Test product', 2)
    
    // Creates a checkout session, and return the URL
    // Destination ID: 812-626-8794
    // Order ID: 10001
    // Discount: $24.85
    // Shipping: $0.99
    // Tax: $1.87
    // Memo: 'This is a great purchase'
    // Callback: 'http://requestb.in/1fy628r1' (you'll need to create your own bin at http://requestb.in/)
    var params = {
        order_id: '10001',
        discount: '24.85',
        shipping: '0.99',
        tax: '1.87',
        notes: 'This is a great purchase',
        callback: 'http://requestb.in/1fy628r1'
    }
    $()
        .seq(function() {
            Dwolla.getGatewayURL('812-626-8794', params, this)
        })
        .seq(function(url) {
            return res.send('To begin the checkout process, send the user off to <a href="' + url + '">' + url + '</a>');
        })
        .catch(function(error) {
            return res.send('Oops: ' + error);
        })
});


/**
 * EXAMPLE 3: (Verifying an offsite gateway signature) 
 *   Verify the signature returned from
 *   Dwolla's offsite gateway redirect
 **/
app.get('/redirect', function(req, res) {
    // Grab Dwolla's proposed signature
    signature = req.query['signature'];
    
    // Grab Dwolla's checkout ID
    checkout_id = req.query['checkoutId'];
    
    // Grab the reported total transaction amount
    amount = req.query['amount'];

    // Clears out any previous products
    Dwolla.startGatewaySession(cfg.apiKey, cfg.apiSecret);

    // Verify the proposed signature
    did_verify = Dwolla.verifyGatewaySignature(signature, checkout_id, amount)

    if (did_verify) {
        return res.send("<p>Dwolla's signature verified successfully. You should go ahead and process the order.</p>");
    } else {
        return res.send("<p>Dwolla's signature failed to verify. You shouldn't process the order before some manual verification.</p>");
    }
});



// Start the server
app.listen(3000);