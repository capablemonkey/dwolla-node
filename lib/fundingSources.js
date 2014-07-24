module.exports = function(exports) {
    // ************************
    // Funding Sources Methods
    // ************************
    var vars = exports.vars;

    /**
     * Retrieves verified funding source by identifier for the user associated with the authorized access token.
     * https://www.dwolla.com/developers/endpoints/fundingsources/details
     *
     * @param {String}     fundingId
     * @param {Function}   fn
     **/
    exports.fundingSourceById = function(id, fn) {
      if (typeof fn !== 'function') { throw new Error('Missing callback'); }
      if (!vars._token) { throw new Error('Missing arg oauth_token'); }
    
      var params = { oauth_token: vars._token };
      exports._request('/fundingsources/' + id, params, fn);
    };
    
    /**
     * Retrieves a list of verified funding sources for the user
     * associated with the authorized access token.
     * https://www.dwolla.com/developers/endpoints/fundingsources/list
     *
     * @param {Function}   fn
     **/
    exports.fundingSources = function(fn) {
      if (typeof fn !== 'function') { throw new Error('Missing callback'); }
      if (!vars._token) { throw new Error('Missing arg oauth_token'); }
    
      var params = { oauth_token: vars._token };
      exports._request('/fundingsources/', params, fn);
    };
};