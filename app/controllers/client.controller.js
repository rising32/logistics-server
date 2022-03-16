const Client = require("../models/client.model.js");

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Client
  const client = new Client({
    client_name: req.body.client_name,
    is_active: req.body.is_active || false
  });

  // Save Client in the database
  Client.insertNewClient(client, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Client."
      });
    else {
      res.send(data);      
    }
  });
};

// Update a Client identified by the id in the request
exports.updateByClient = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    console.log(req.body);
    const client = new Client(req.body);
    Client.updateByClient(
        client,
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found client with id ${client.client_id}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating client with id " + client.client_id
            });
          }
        } else res.send(data);
      }
    );
  };

// Regist My client
exports.registMyClient = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Regist my Client
    const client = new Client({
      client_id: req.body.client_id,
      is_active: req.body.is_active || false
    });
  
    // Save Client in the database
    Client.registMyClient(req.body.user_id, client, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Client."
        });
      else {
        res.send(data);      
      }
    });
  };

// Get My clients
exports.getMyClients = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }    
  
    // Save Client in the database
    Client.getMyClients(req.body.user_id, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Client."
        });
      else {
        res.send(data);      
      }
    });
  };