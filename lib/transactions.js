module.exports = function(exports) {
    // ************************
    // Transaction Methods
    // ************************
    var https = require('https')
        , qs = require('querystring')
        , vars = exports.vars
        ;

    /**
     * Retrieves transactions for the user for the authorized access token.
     * Transactions are returned in descending order by transaction date.
     * https://www.dwolla.com/developers/endpoints/transactions/details
     *
     * @param {int}        transactionId
     * @param {Function}   fn
     **/
    exports.transactionById = function(id, fn) {
      if (typeof fn !== 'function') { throw new Error('Missing callback'); }
      if (!vars._token) { throw new Error('Missing arg oauth_token'); }

      var params = { oauth_token: vars._token };
      exports._request('/transactions/' + id, params, fn);
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
     * @param {Object}     params
     * @param {Function}   fn
     **/
    exports.transactions = function(params, fn) {
      // params are optional
      if (!fn || typeof params === 'function') {
        fn = params;
        params = {};
      }
      if (typeof fn !== 'function') { throw new Error('Missing callback'); }
      if (!vars._token) { throw new Error('Missing arg oauth_token'); }

      params = params || {};
      params.oauth_token = vars._token;
      exports._request('/transactions/', params, fn);
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
     * @param {Object}     params
     * @param {Function}   fn
     **/
    exports.transactionsStats = function(params, fn) {
      // params are optional
      if (!fn || typeof params === 'function') {
        fn = params;
        params = {};
      }
      if (typeof fn !== 'function') { throw new Error('Missing callback'); }
      if (!vars._token) { throw new Error('Missing arg oauth_token'); }

      params = params || {};
      params.oauth_token = vars._token;
      exports._request('/transactions/stats', params, fn);
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
     * @param {Number}   pin
     * @param {String}   destinationId
     * @param {String}   amount
     * @param {Function} fn
     */
    exports.send = function(pin, destinationId, amount, params, fn) {
      // params are optional
      if (!fn || typeof params === 'function') {
        fn = params;
        params = {};
      }
      if (typeof fn !== 'function') { throw new Error('Missing callback'); }
      if (!vars._token) { throw new Error('Missing arg oauth_token'); }
      if (!pin) { throw new Error('Missing arg pin'); }
      if (!destinationId) { throw new Error('Missing arg destinationId'); }
      if (!amount) { throw new Error('Missing arg amount'); }

      params = params || {};
      params.oauth_token = vars._token;
      params.pin = pin;
      params.destinationId = destinationId;
      params.amount = amount;
      exports._post('/transactions/send', params, fn);
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
     * @param {Number}   pin
     * @param {String}   sourceId
     * @param {String}   amount
     * @param {Function} fn
     */
    exports.request = function(sourceId, amount, params, fn) {
      // params are optional
      if (!fn || typeof params === 'function') {
        fn = params;
        params = {};
      }
      if (typeof fn !== 'function') { throw new Error('Missing callback'); }
      if (!vars._token) { throw new Error('Missing arg oauth_token'); }
      if (!sourceId) { throw new Error('Missing arg sourceId'); }
      if (!amount) { throw new Error('Missing arg amount'); }

      params = params || {};
      params.oauth_token = vars._token;
      params.sourceId= sourceId;
      params.amount = amount;
      exports._post('/requests/', params, fn);
    };
}
