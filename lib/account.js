module.exports = function(exports) {
    // ************************
    // Contacts Methods
    // ************************
    var vars = exports.vars;
    
    /**
     * Retrieves the basic account information for the Dwolla account associated with the account identifier.
     * https://www.dwolla.com/developers/endpoints/users/basicinformation
     *
     * @param {String}     id
     * @param {Function}   fn
     **/
    exports.basicAccountInfo = function(id, fn) {
      if (typeof fn !== 'function') { throw new Error('Missing callback'); }
      if (!vars._client_id) { throw new Error('Missing arg client_id'); }
      if (!vars._client_secret) { throw new Error('Missing arg client_secret'); }
      if (!id) { throw new Error('Missing arg id'); }
    
      var path = '/users/' + id;
      var params = {};
      params.client_id = vars._client_id;
      params.client_secret = vars._client_secret;
      exports._request(path, params, fn);
    };
    
    /**
     * Retrieves the account information for the user assoicated with the authorized access token.
     * https://www.dwolla.com/developers/endpoints/users/accountinformation
     *
     * @param {Function}   fn
     **/
    exports.fullAccountInfo = function(fn) {
      if (typeof fn !== 'function') { throw new Error('Missing callback'); }
      if (!vars._token) { throw new Error('Missing arg oauth_token'); }
    
      var params = { oauth_token: vars._token };
      exports._request('/users/', params, fn);
    };
    
    /**
     * Retrieves the account balance for the user for the authorized access token.
     * https://www.dwolla.com/developers/endpoints/balance/account
     *
     * @param {Function}   fn
     * */
    exports.balance = function(fn) {
      if (typeof fn !== 'function') { throw new Error('Missing callback'); }
      if (!vars._token) { throw new Error('Missing arg oauth_token'); }
    
      var params = { oauth_token: vars._token };
      exports._request('/balance/', params, fn);
    };
};