module.exports = function(exports) {
    // ************************
    // Request Methods
    // ************************
    var vars = exports.vars;

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
};
