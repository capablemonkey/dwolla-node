module.exports = function(exports, helpers) {
    // ************************
    // Offsite Gateway Methods
    // ************************
    var https = require('https')
        , qs = require('querystring')
        , restler = require('restler')
        , serverMode = 'LIVE'
        , gatewaySession = []
        , client_id
        , client_secret
        , redirect_uri
        ;

    /**
     * Clears out any products previously
     * placed in the offsite gateway session
     * effectively starting a new session
     *
     * @return {boolean} Whether or not the session was cleared
     */
    exports.startGatewaySession = function(apiKey, apiSecret, redirectUri) {
        gatewaySession = [];
        client_id = apiKey;
        client_secret = apiSecret;
        redirect_uri = redirectUri;

        return true;
    }
    
    /**
     * Add a product to the current offsite
     * gateway session
     *
     * @param {string} Product name; (required)
     * @param {float} Product price; (required)
     * @param {string} Product description; (optional)
     * @param {int} Quantity of product; (optional, defaults to 1)
     *
     * @return {boolean} Whether or not the product was added succesfully
     */
    exports.addGatewayProduct = function(name, amount, description, quantity) {
        // Verify required paramteres
        if (!name) { throw new Error('Missing arg name'); }
        if (!amount) { throw new Error('Missing arg amount'); }
        
        // Assume defaults
        if (!description) { description = ''; }
        if (!quantity) { quantity = 1; }
        
        product = {
            'Name': name,
            'Description': description,
            'Price': amount,
            'Quantity': quantity
        };
        
        gatewaySession.push(product);
        
        return true;
    }
    
    /**
     * Create an offsite gateway checkout
     * session
     *
     * @param {string} The destination account ID; Can only be a Dwolla ID; (required)
     * @param {string} Any order ID; (optional)
     * @param {float} Discount amount; (optional)
     * @param {float} Shipping amount; (optional)
     * @param {float} Tax amount; (optional)
     * @param {string} Notes/memos to be associated with transaction; (optional)
     * @param {string} A URL to POST the transaction result to; (optional)
     *
     * @return {string} The URL for the checkout session
     */
    exports.getGatewayURL = function(destination_id, order_id, discount, shipping, tax, notes, callback, fn) {
        // Verify required paramteres
        if (!destination_id) { throw new Error('Missing arg destination_id'); }
        
        // Assume defaults
        if (!order_id) { order_id = false; }
        if (!callback) { callback = false; }
        if (!redirect_uri) { redirect_uri = false; }
        if (!discount) { discount = 0; } else { discount = parseFloat(discount); }
        if (!tax) { tax = 0; } else { tax = parseFloat(tax); }
        if (!shipping) { shipping = 0; } else { shipping = parseFloat(shipping); }
        if (!notes) { notes = ''; } 
    
     	// Calcualte subtotal
     	var subtotal = 0;
     	gatewaySession.forEach(function(product) {
         	subtotal += parseFloat(product['Price']) * parseFloat(product['Quantity']);
     	});
     	
     	// Calculate grand total
     	total = subtotal - discount + shipping + tax;
    
     	// Create request body
     	request = {
    		'Key'     : client_id,
    		'Secret'  : client_secret,
    		'Test'    : (serverMode == 'TEST') ? 'true' : 'false',
    		'PurchaseOrder': {
    			'DestinationId' : destination_id,
    			'OrderItems'    : gatewaySession,
    			'Discount'      : -discount,
    			'Shipping'      : shipping,
    			'Tax'           : tax,
    			'Total'			: total,
    			'Notes'         : notes
    		}
     	};
    
    	// Append optional parameters
    	if(redirect_uri) { request['Redirect'] = redirect_uri; }
    	if(callback) { request['Callback'] = callback; }
    	if(order_id) { request['OrderId'] = order_id; }

    	// Send off the request
    	restler
    	   .post('https://www.dwolla.com/payment/request', {
    	       headers: { 'Content-Type': 'application/json' },
        	   data: JSON.stringify(request)
        	})
        	.on('complete', function(data) {
        	   if(data['Result'] != 'Success') {
            	   return fn(data['Message'])
        	   } else {
            	   return fn(false, 'https://www.dwolla.com/payment/checkout/' + data['CheckoutId'])
        	   }
        	})
    }

    /**
     * Verify a signature that came back
     * with an offsite gateway redirect
     *
     * @param {string} Proposed signature; (required)
     * @param {string} Dwolla's checkout ID; (required)
     * @param {string} Dwolla's reported total amount; (required)
     *
     * @return {boolean} Whether or not the signature is valid
     */
    exports.verifyGatewaySignature = function(signature, checkout_id, amount) {
        // Verify required paramteres
        if (!signature) { throw new Error('Missing arg signature'); }
        if (!amount) { throw new Error('Missing arg checkout_id'); }
        if (!checkout_id) { throw new Error('Missing arg amount'); }

        // Require crypto lib
        var crypto = require('crypto');

    	// Normalize parameters
    	amount = parseFloat(amount);

    	// Calculate an HMAC-SHA1 hexadecimal hash
    	// of the checkoutId and amount ampersand separated
    	// using the consumer secret of the application
    	// as the hash key.
    	//
    	// @doc: http://developers.dwolla.com/dev/docs/gateway
        hash = crypto.createHmac('sha1', client_secret).update(checkout_id + "&" + amount).digest('hex');

        return hash == signature;
    }
}