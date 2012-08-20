var dwolla = require('./lib/dwolla')
dwolla.startGatewaySession('NrGOvb6djfAR9Pb2U1Jho+f+fuPRSuEUTfCiiJevNH2K/u4NQg', 'PIJI6kXaRmbBVi2sgfRSdgqEjioIIbwOiMC+UvTQd/Oy5cWbU7', 'http://localhost:3000/redirect')
dwolla.addGatewayProduct('Test 1', 10)
dwolla.getGatewayURL('812-626-8794', )