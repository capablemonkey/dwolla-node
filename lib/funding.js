module.exports = function(exports, helpers) {
    // ************************
    // Funding Sources Methods
    // ************************
    var https = require('https')
        , qs = require('querystring')
        ;

    /**
     * Retrieves verified funding source by identifier for the user associated with the authorized access token.
     * https://www.dwolla.com/developers/endpoints/fundingsources/details
     *
     * @param {String}     oauth_token
     * @param {String}     fundingId
     * @param {Function}   fn
     **/
    exports.fundingSourceById = function(oauth_token, id, fn) {
      if (typeof fn !== 'function') { throw new Error('Missing callback'); }
      if (!oauth_token) { throw new Error('Missing arg oauth_token'); }
    
      var params = { oauth_token: oauth_token };
      helpers._request('/fundingsources/' + id, params, fn);
    };
    
    /**
     * Retrieves a list of verified funding sources for the user
     * associated with the authorized access token.
     * https://www.dwolla.com/developers/endpoints/fundingsources/list
     *
     * @param {String}     oauth_token
     * @param {Function}   fn
     **/
    exports.fundingSources = function(oauth_token, fn) {
      if (typeof fn !== 'function') { throw new Error('Missing callback'); }
      if (!oauth_token) { throw new Error('Missing arg oauth_token'); }
    
      var params = { oauth_token: oauth_token };
      helpers._request('/fundingsources/', params, fn);
    };
}