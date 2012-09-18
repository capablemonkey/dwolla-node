module.exports = function(exports, API_PATH) {
    // ************************
    // Helper Methods
    // ************************
    var https = require('https')
        , qs = require('querystring')
        , vars = exports.vars
        ;

    exports.setToken = function(token) {
        vars._token = token;
        
        return true;
    }

    exports.getToken = function() {
        return vars._token;
    }

    exports._request = function(path, params, fn) {
      var options = {
        host: 'www.dwolla.com'
        , path: exports.vars.API_PATH + path
      };
      if (params) {
        options.path += '?' + qs.stringify(params);
      }
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
          if (data.Success) {
            fn(null, data.Response);
          } else {
            fn(data.Message);
          }
        });
      });
      req.end();
    }
    
    exports._post = function(path, post_data, fn) {
      var options = {
        host: 'www.dwolla.com'
        , path: exports.vars.API_PATH + path
        , method: 'POST'
        , headers: {
          'Content-Type': 'application/json'
        }
      };
console.log(options);
console.log(post_data);
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
          if (data.Success) {
            fn(null, data.Response);
          } else {
            fn(data.Message);
          }
        });
      });
      req.write(JSON.stringify(post_data));
      req.end();
    }
}
