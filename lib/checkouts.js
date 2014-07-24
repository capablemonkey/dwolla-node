module.exports = function(exports) {
    // ************************
    // Offsite Gateway Methods
    // ************************
    var restler = require('restler');
    var vars = exports.vars;
    var serverMode = 'LIVE';
    var gatewaySession = [];
    var redirect_uri = false;

    exports.setMode = function(mode) {
        if(mode != 'LIVE' && mode != 'TEST') {
            return false;
        }
        
        serverMode = mode;

        return true;
    };

    /**
     * Clears out any products previously
     * placed in the offsite gateway session
     * effectively starting a new session
     *
     * @return {boolean} Whether or not the session was cleared
     */
    exports.startGatewaySession = function(redirectUri) {
        gatewaySession = [];
        redirect_uri = redirectUri;

        return true;
    };
    
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
    };
    
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
    exports.getGatewayURL = function(destination_id, params, fn) {
      // Verify required paramteres
      if (!destination_id) { throw new Error('Missing arg destination_id'); }

      // Params are optional
      if (!fn || typeof params === 'function') {
          fn = params;
          params = {};
      }

      // Assume defaults
      if (!params.order_id) { params.order_id = false; }
      if (!params.callback) { params.callback = false; }
      if (!params.allow_funding_sources) { params.allow_funding_sources = false; }
      if (!params.discount) { params.discount = 0; } else { params.discount = parseFloat(params.discount); }
      if (!params.tax) { params.tax = 0; } else { params.tax = parseFloat(params.tax); }
      if (!params.shipping) { params.shipping = 0; } else { params.shipping = parseFloat(params.shipping); }
      if (!params.notes) { params.notes = ''; } 

     	// Calcualte subtotal
     	var subtotal = 0;
     	gatewaySession.forEach(function(product) {
         	subtotal += parseFloat(product['Price']) * parseFloat(product['Quantity']);
     	});

     	// Calculate grand total
     	total = Math.round((subtotal - params.discount + params.shipping + params.tax) * 100) / 100;

     	// Create request body
     	request = {
    		'Key'     : vars._client_id,
    		'Secret'  : vars._client_secret,
    		'Test'    : (serverMode == 'TEST') ? 'true' : 'false',
    		'AllowFundingSources' : (params.allow_funding_sources == 'TEST') ? 'true' : 'false',
    		'PurchaseOrder': {
    			'DestinationId' : destination_id,
    			'OrderItems'    : gatewaySession,
    			'Discount'      : -params.discount,
    			'Shipping'      : params.shipping,
    			'Tax'           : params.tax,
    			'Total'			: total,
    			'Notes'         : params.notes
    		}
     	};
    
    	// Append optional parameters
    	if(redirect_uri) { request['Redirect'] = redirect_uri; }
    	if(params.callback) { request['Callback'] = params.callback; }
    	if(params.order_id) { request['OrderId'] = params.order_id; }

        var host = exports.sandbox ? 'uat.dwolla.com' : 'www.dwolla.com';

    	// Send off the request
        exports._post('/offsitegateway/checkouts/', request, function(err, data) {
            if (err) fn(err);
            else fn(null, data.CheckoutId);
        });
    };

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
    	amount = parseFloat(amount).toFixed(2);

    	// Calculate an HMAC-SHA1 hexadecimal hash
    	// of the checkoutId and amount ampersand separated
    	// using the consumer secret of the application
    	// as the hash key.
    	//
    	// @doc: http://developers.dwolla.com/dev/docs/gateway
        hash = crypto.createHmac('sha1', vars._client_secret).update(checkout_id + "&" + amount).digest('hex');

        return hash == signature;
    };
};