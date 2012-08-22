module.exports = function(exports, helpers) {
    // ************************
    // Authentication Methods
    // ************************
    var https = require('https')
        , qs = require('querystring')
        , vars = exports.vars
        ;

    /**
     * Retrieves an OAuth permissions page URL
     * http://developers.dwolla.com/dev/docs/auth
     *
     * @param {String}     redirect_uri
     * @param {String}     scope
     **/
    exports.authUrl = function(redirect_uri, scope) {
      if (!vars._client_id) { throw new Error('Missing arg client_id'); }
      if (!scope) { scope = "Send|Transactions|Balance|Request|Contacts|AccountInfoFull|Funding"; }
    
      var params = {
          client_id: vars._client_id,
          response_type: 'code',
          scope: scope
      }
      
      if(redirect_uri) {
          params['redirect_uri'] = redirect_uri
      }
      
      return 'https://www.dwolla.com/oauth/v2/authenticate?' + qs.stringify(params);
    }
    
    /**
     * Exchanges a temporary code for a never-expiring
     * OAuth access token
     * http://developers.dwolla.com/dev/docs/auth
     *
     * @param {String}     code
     * @param {String}     redirect_uri
     * @param {Function}   fn
     **/
    exports.requestToken = function(client_id, client_secret, code, redirect_uri, fn) {
      if (!vars._client_id) { throw new Error('Missing arg client_id'); }
      if (!vars._client_secret) { throw new Error('Missing arg client_secret'); }
      if (!code) { throw new Error('Missing arg code'); }
    
      var params = {
          client_id: vars._client_id,
          client_secret: vars._client_secret,
          grant_type: 'authorization_code',
          code: code
      }
    
      if(redirect_uri) {
          params['redirect_uri'] = redirect_uri
      }
    
      var options = {
        host: 'www.dwolla.com'
        , path: '/oauth/v2/token?' + qs.stringify(params)
      };
    
      var req = https.request(options, function(res) {
        var data = '';
        res.on('data', function(chunk) {
          data += chunk;
        });
        res.on('end', function() {
          try {
            data = JSON.parse(data);
          } catch (e) {
            fn('Error parsing response from Dwolla API.', data);
          }
          if (data['error']) {
            fn(data['error_description']);
          } else {
            fn(null, data['access_token']);
          }
        });
      });
      req.end();
    }
}