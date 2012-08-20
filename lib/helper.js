module.exports = function(API_PATH) {
    function _request(path, params, fn) {
      var options = {
        host: 'www.dwolla.com'
        , path: API_PATH + path
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
    
    function _post(path, post_data, fn) {
      var options = {
        host: 'www.dwolla.com'
        , path: API_PATH + path
        , method: 'POST'
        , headers: {
          'Content-Type': 'application/json'
        }
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