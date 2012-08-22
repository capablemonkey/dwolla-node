module.exports = function dwolla(client_id, client_secret) {
    // Global variables
    exports.vars = {
        API_PATH: '/oauth/rest'
        , _client_id: client_id
        , _client_secret: client_secret
        , _token: ''
    }

    // Global modules
    var https = require('https')
        , qs = require('querystring')
        ;

    // Include helpers
    require('./helper')(exports);
    
    // Include API Helper Functions
    require('./authentication')(exports);
    require('./account')(exports);
    require('./contacts')(exports);
    require('./transactions')(exports);
    require('./funding')(exports);
    require('./offsiteGateway')(exports);

    return exports;
}