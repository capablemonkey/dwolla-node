module.exports = function(exports, helpers) {
    // ************************
    // Contacts Methods
    // ************************
    var https = require('https')
        , qs = require('querystring')
        ;

    /**
     * Retrieves contacts for the user for the authorized access token.
     * https://www.dwolla.com/developers/endpoints/contacts/user
     *
     * Optional params:
     *
     *   - search
     *   - types
     *   - limit
     *
     * @param {String}     oauth_token
     * @param {Object}     params
     * @param {Function}   fn
     * */
    exports.contacts = function(oauth_token, params, fn) {
      // params are optional
      if (!fn || typeof params === 'function') {
        fn = params;
        params = {};
      }
      if (typeof fn !== 'function') { throw new Error('Missing callback'); }
      if (!oauth_token) { throw new Error('Missing arg oauth_token'); }
    
      params = params || {};
      params.oauth_token = oauth_token;
      helpers._request('/contacts/', params, fn);
    };
    
    /**
     * Retrieves nearby Dwolla spots within the range of the provided latitude and longitude.
     * Half of the limit are returned as spots with closest proximity. The other half of the spots
     * are returned as random spots within the range.
     * https://www.dwolla.com/developers/endpoints/contacts/nearby
     *
     * Optional params:
     *
     *   - range
     *   - limit
     *
     * @param {String}   client_id
     * @param {String}   client_secret
     * @param {String}   lat
     * @param {String}   lon
     * @param {Object}   params
     * @param {Function} fn
     **/
    exports.nearby = function(client_id, client_secret, lat, lon, params, fn) {
      // params are optional
      if (!fn || typeof params === 'function') {
        fn = params;
        params = {};
      }
      if (typeof fn !== 'function') { throw new Error('Missing callback'); }
      if (!client_id) { throw new Error('Missing arg client_id'); }
      if (!client_secret) { throw new Error('Missing arg client_secret'); }
      if (!lat) { throw new Error('Missing arg lat'); }
      if (!lon) { throw new Error('Missing arg lon'); }
    
      params = params || {};
      params.client_id = client_id;
      params.client_secret = client_secret;
      params.latitude = lat;
      params.longitude = lon;
    
      helpers._request('/contacts/nearby', params, fn);
    };
}