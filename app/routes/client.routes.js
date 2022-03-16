module.exports = app => {
    const client = require("../controllers/client.controller.js");
  
    // Create a new Client  
    app.post("/client/create", client.create);

    // Update a Client with id
    app.post("/client/update", client.updateByClient);

    // Regist my Client
    app.post("/client/regist_my_client", client.registMyClient);

    // Regist my Client
    app.post("/client/get_my_clients", client.getMyClients);
    
  };