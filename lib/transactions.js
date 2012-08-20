module.exports = function(exports, helpers) {
    // ************************
    // Transaction Methods
    // ************************
    var https = require('https')
        , qs = require('querystring')
        ;

    /**
     * Retrieves transactions for the user for the authorized access token.
     * Transactions are returned in descending order by transaction date.
     * https://www.dwolla.com/developers/endpoints/transactions/details
     *
     * @param {String}     oauth_token
     * @param {int}        transactionId
     * @param {Function}   fn
     **/
    exports.transactionById = function(oauth_token, id, fn) {
      if (typeof fn !== 'function') { throw new Error('Missing callback'); }
      if (!oauth_token) { throw new Error('Missing arg oauth_token'); }
    
      var params = { oauth_token: oauth_token };
      helpers._request('/transactions/' + id, params, fn);
    };
    
    /**
     * Retrieves transactions for the user for the authorized access token.
     * Transactions are returned in descending order by transaction date.
     * https://www.dwolla.com/developers/endpoints/transactions/list
     *
     * Optional params:
     *
     *   - sinceDate
     *   - types
     *   - limit
     *   - skip
     *
     * @param {String}     oauth_token
     * @param {Object}     params
     * @param {Function}   fn
     **/
    exports.transactions = function(oauth_token, params, fn) {
      // params are optional
      if (!fn || typeof params === 'function') {
        fn = params;
        params = {};
      }
      if (typeof fn !== 'function') { throw new Error('Missing callback'); }
      if (!oauth_token) { throw new Error('Missing arg oauth_token'); }
    
      params = params || {};
      params.oauth_token = oauth_token;
      helpers._request('/transactions/', params, fn);
    };
    
    /**
     * Retrieves transactions stats for the user for the authorized access token.
     * https://www.dwolla.com/developers/endpoints/transactions/stats
     *
     * Optional params:
     *
     *   - types
     *   - startDate
     *   - endDate
     *
     * @param {String}     oauth_token
     * @param {Object}     params
     * @param {Function}   fn
     **/
    exports.transactionsStats = function(oauth_token, params, fn) {
      // params are optional
      if (!fn || typeof params === 'function') {
        fn = params;
        params = {};
      }
      if (typeof fn !== 'function') { throw new Error('Missing callback'); }
      if (!oauth_token) { throw new Error('Missing arg oauth_token'); }
    
      params = params || {};
      params.oauth_token = oauth_token;
      helpers._request('/transactions/stats', params, fn);
    };
    

    /**
     * Send funds to a destination user for the user associated with the authorized access token.
     * https://www.dwolla.com/developers/endpoints/transactions/send
     *
     * Optional params:
     *
     *   - destinationType
     *   - facilitatorAmount
     *   - assumeCosts
     *   - notes
     *
     * @param {String}   oauth_token
     * @param {Number}   pin
     * @param {String}   destinationId
     * @param {String}   amount
     * @param {Function} fn
     */
    exports.send = function(oauth_token, pin, destinationId, amount, params, fn) {
      // params are optional
      if (!fn || typeof params === 'function') {
        fn = params;
        params = {};
      }
      if (typeof fn !== 'function') { throw new Error('Missing callback'); }
      if (!oauth_token) { throw new Error('Missing arg oauth_token'); }
      if (!pin) { throw new Error('Missing arg pin'); }
      if (!destinationId) { throw new Error('Missing arg destinationId'); }
      if (!amount) { throw new Error('Missing arg amount'); }
    
      params = params || {};
      params.oauth_token = oauth_token;
      params.pin = pin;
      params.destinationId = destinationId;
      params.amount = amount;
      helpers._post('/transactions/send', params, fn);
    };
    
    /**
     * Request funds from a source user for the user associated with the authorized access token.
     * https://www.dwolla.com/developers/endpoints/transactions/request
     *
     * Optional params:
     *
     *   - sourceType
     *   - facilitatorAmount
     *   - notes
     *
     * @param {String}   oauth_token
     * @param {Number}   pin
     * @param {String}   sourceId
     * @param {String}   amount
     * @param {Function} fn
     */
    exports.request = function(oauth_token, pin, sourceId, amount, params, fn) {
      // params are optional
      if (!fn || typeof params === 'function') {
        fn = params;
        params = {};
      }
      if (typeof fn !== 'function') { throw new Error('Missing callback'); }
      if (!oauth_token) { throw new Error('Missing arg oauth_token'); }
      if (!pin) { throw new Error('Missing arg pin'); }
      if (!sourceId) { throw new Error('Missing arg sourceId'); }
      if (!amount) { throw new Error('Missing arg amount'); }
    
      params = params || {};
      params.oauth_token = oauth_token;
      params.pin = pin;
      params.sourceId= sourceId;
      params.amount = amount;
      helpers._post('/transactions/request', params, fn);
    };
}