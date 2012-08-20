module.exports = function(exports, helpers) {
    // ************************
    // Contacts Methods
    // ************************
    var https = require('https')
        , qs = require('querystring')
        ;
    
    /**
     * Retrieves the basic account information for the Dwolla account associated with the account identifier.
     * https://www.dwolla.com/developers/endpoints/users/basicinformation
     *
     * @param {String}     client_id
     * @param {String}     client_secret
     * @param {String}     id
     * @param {Function}   fn
     **/
    exports.basicAccountInfo = function(client_id, client_secret, id, fn) {
      if (typeof fn !== 'function') { throw new Error('Missing callback'); }
      if (!client_id) { throw new Error('Missing arg client_id'); }
      if (!client_secret) { throw new Error('Missing arg client_secret'); }
      if (!id) { throw new Error('Missing arg id'); }
    
      var path = '/users/' + id;
      var params = {};
      params.client_id = client_id;
      params.client_secret = client_secret;
      helpers._request(path, params, fn);
    };
    
    /**
     * Retrieves the account information for the user assoicated with the authorized access token.
     * https://www.dwolla.com/developers/endpoints/users/accountinformation
     *
     * @param {String}     oauth_token
     * @param {Function}   fn
     **/
    exports.fullAccountInfo = function(oauth_token, fn) {
      if (typeof fn !== 'function') { throw new Error('Missing callback'); }
      if (!oauth_token) { throw new Error('Missing arg oauth_token'); }
    
      var params = { oauth_token: oauth_token };
      helpers._request('/users/', params, fn);
    };
    
    /**
     * Retrieves the account balance for the user for the authorized access token.
     * https://www.dwolla.com/developers/endpoints/balance/account
     *
     * @param {String}     oauth_token
     * @param {Function}   fn
     * */
    exports.balance = function(oauth_token, fn) {
      if (typeof fn !== 'function') { throw new Error('Missing callback'); }
      if (!oauth_token) { throw new Error('Missing arg oauth_token'); }
    
      var params = { oauth_token: oauth_token };
      helpers._request('/balance/', params, fn);
    };
    
    
    /**
     * Register a new Dwolla user account.
     * https://www.dwolla.com/developers/endpoints/register/user
     *
     * @param {String} client_id
     * @param {String} client_secret
     * @param {Object} userInfo
     * @param {Function} fn
     */
    exports.register = function(client_id, client_secret, userInfo, fn) {
      if (typeof fn !== 'function') { throw new Error('Missing callback'); }
      if (!client_id) { throw new Error('Missing arg client_id'); }
      if (!client_secret) { throw new Error('Missing arg client_secret'); }
      if (!userInfo) { throw new Error('Missing arg userInfo'); }
    
      var params = {};
      params.client_id = client_id;
      params.client_secret = client_secret;
      helpers._post('/register/?' + qs.stringify(params), userInfo, fn);
    };
}