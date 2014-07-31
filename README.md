# dwolla-node: official Dwolla API node.js wrapper 
===========
Bindings for the Dwolla API.  All API methods are asynchronous.

Contributions are welcomed with open arms.

## Version
1.1.0

## Installation

    npm install dwolla

## Documentation

[http://developers.dwolla.com/dev/docs](http://developers.dwolla.com/dev/docs)

## Usage

You'll need [Dwolla API Credentials](https://www.dwolla.com/applications) to interact with the Dwolla API.

```javascript
// Instantiate a Dwolla API client
var Dwolla = require('dwolla')(['{CLIENT_ID}', '{CLIENT_SECRET}']);

// Set a user's OAuth token
Dwolla.setToken('[TOKEN]');

// Use the Sandbox API environment, instead of production
Dwolla.sandbox = true;

// Send money to a Dwolla ID: 812-626-8794
Dwolla.send('[PIN]', '812-626-8794', 1.00, function(error, transactionId) {
    if(error) { console.log('Error: ' + error); }

    console.log('Transaction ID: ' + transactionId);
});
```
    
## Examples / Quickstart

This repo includes various usage examples, including:

* Authenticating with OAuth [oauth.js]
* Sending money [send.js]
* Fetching account information [accountInfo.js]
* Grabbing a user's contacts [contacts.js]
* Listing a user's funding sources [fundingSources.js]
* Creating Gateway Checkout sessions [offsiteGateway.js]
* Enable or check an account's Auto-Withdrawal feature [autoWithdrawal.js]
* Fetch a user's account balance [balance.js]
* Listing or searching a user's contacts [contacts.js]
* Creating a money request, and listing a user's pending money requests [requests.js]

## Methods

Helper Methods:

    setToken(oauth_token)   ==> (bool) did the token change sucessfully?
    getToken()              ==> (string) the currently used oauth token

Authentication Methods:

    authUrl([redirect_uri, scope])          ==> (string) OAuth permissions page URL
    finishAuth(code[, redirect_uri, fn])  ==> (object) access_token, refresh_token, expiration times
    refreshAuth(refresh_token, fn)      ==> (object) access_token, refresh_token, expiration times

Account Methods:

    basicAccountInfo(id, fn)                    ==> (object) user profile for given email address or Dwolla ID
    fullAccountInfo(fn)                         ==> (object) the user entity associated with the token
    balance(fn)                                 ==> (string) the Dwolla balance of the account associated with the token
    toggleAutoWithdraw(enabled, fundingId, fn)  ==> (object) current {Enabled, FundingId}
    getAutoWithdrawalStatus(fn)                 ==> (object) current {Enabled, FundingId}

Contacts Methods:

    contacts(params, fn)            ==> (array) list of contacts matching the search criteria
    nearby(lat, lon, params, fn)    ==> (array) list of nearby spots matching the search criteria
    
Funding Sources Methods:

    fundingSources(fn)          ==> (array) a list of funding sources associated with the token
    fundingSourceById(id, fn)   ==> (object) information about the {$id} funding source
    addFundingSource(account_number, routing_number, account_type, name, fn)    ==>  (object) the new, unverified funding source resource
    verifyFundingSource(deposit1, deposit2, fundingId, fn)  ==> (object) funding source resource
    withdrawToFundingSource(pin, amount, fundingId, fn)  ==> (object) the resulting Withdraw transaction
    depositFromFundingSource(pin, amount, fundingId, fn) ==> (object) the resulting Deposit transaction

Transactions Methods:

    send(pin, destinationId, amount, params, fn)    ==> (string) transaction ID
    transactionById(id, fn)                         ==> (object) transaction details
    transactions(params, fn)                        ==> (array) a list of recent transactions matching the search criteria
    transactionsStats(params, fn)                   ==> (object) statistics about the account associated with the token
    refund(pin, transactionId, fundsSource, amount, params, fn)         => (object) resulting Refund transaction resource
    
Money Request Methods:

    request(pin, sourceId, amount, params, fn)      ==> (string) request ID
    requests(params, fn)        ==> (array) list of Request resources
    requestById(request_id, fn)     ==> (object) a Request resource
    cancelRequest(request_id, fn)   ==> (bool) true if successfully cancelled, otherwise, error 
    fulfillRequest(pin, request_id, amount, params, fn)     ==> (object) the Request resource

Offsite Gateway Methods:

    startGatewaySession(redirectUri)                            ==> (bool) did session start?
    addGatewayProduct(name, amount[, description, quantity])    ==> (bool) was product added?
    verifyGatewaySignature(signature, checkout_id, amount)      ==> (bool) is signature valid?
    getGatewayURL(destination_id[, params], fn)                 ==> (string) checkout URL
    setMode(mode)                                               ==> (bool) did the mode change successfully?

## Changelog

1.1.0
* Add unit tests to validate HTTP requests
* Add support for Auto-Withdrawal endpoints
* Add support for new expiring OAuth access tokens and refresh tokens
* Add support for adding funding sources, verifying them, withdraw, deposit
* Add support for Money requests listing, cancel, fulfill, lookup

1.0.2
* Add support for MassPay
* Remove Register endpoint binding, since that's been deprecated
* Remove debug console output from helper.js
* Don't require app key and secret to be passed into requestToken, use credentials previously set during module instantiation instead.

1.0.1

* Add support for offsite gateway's guest checkout mode

1.0.0

* First revision of major refactor

## Tests

To run unit tests, do:

`mocha ./test/unit`

Currently, unit tests only ensure HTTP requests created by the bindings are valid.  We plan to add support for testing sample API responses against the bindings.  Eventually, we'd also like to support live testing against the sandbox API.

## Credits

This wrapper is a forked extension of Kenan Shifflett's 'node-dwolla' module.  Michael Schonfeld did much of the initial refactoring of `node-dwolla`.

- Kenan Shifflett &lt;kenan.shifflett@gmail.com&gt;
- Gordon Zheng &lt;gordon@dwolla.com&gt;
- David Stancu &lt;david@dwolla.com&gt;
- Michael Schonfeld &lt;michael@schonfeld.org&gt;

## Support

- Dwolla Developer Support &lt;devsupport@dwolla.com&gt;

## TODO

1. Use `nock` module to mock `http` instead of mocking `restler` with `mockery` because the former lets us validate restler's behavior, which we are today assuming will always work as expected.

## License 

(The MIT License)

Copyright (c) 2014 Dwolla &lt;api@dwolla.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.