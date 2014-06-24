module.exports = function dwolla(client_id, client_secret) {
    // Global variables
    exports.vars = {
        API_PATH: '/oauth/rest',
        _client_id: client_id,
        _client_secret: client_secret,
        _token: ''
    };

    // Sandbox (UAT) mode flag
    exports.sandbox = false;

    // Include helpers
    require('./helper')(exports);
    
    // Include API Helper Functions
    require('./authentication')(exports);
    require('./account')(exports);
    require('./contacts')(exports);
    require('./transactions')(exports);
    require('./funding')(exports);
    require('./offsiteGateway')(exports);
    require('./masspay.js')(exports);

    return exports;
};