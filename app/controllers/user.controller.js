const User = require("../models/user.model.js");
const mailgun = require("mailgun-js");
const request = require('request');
const DOMAIN = 'sandboxdedcd2e35d334e85be47f70bdbba2691.mailgun.org';
const mg = mailgun({apiKey: '8d149746cc1740e4a4b2c2eaef510ac8-1b237f8b-1a64a321', domain: DOMAIN});

// Create and Save a new User
exports.signup = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const data = {
    members:[
      {
        email_address: req.body.email,
        status:'subscribed',
        // merge_fields:
        // {
        //   FNAME:req.body.display_name
        // }
      }
    ]
  }
  const postData = JSON.stringify(data);
  const options = {
    url: 'https://us14.api.mailchimp.com/3.0/lists/37fca1e237/',
    method: 'POST',
    headers: {
      Authorization:'auth 84b3ab1df9dba1f48cbac489dc35d111-us14'
    },
    body: postData
  }
  request(options, (err, response, body) =>{      
      const items = JSON.parse(response.body);      
      // if (items.errors.length > 0){
      //   console.log(items.errors);
      //   res.send({error:items.errors[0].error});
      // }
      // else
      {
        // Create a Tutorial
        const user = new User({
          email: req.body.email,
          phone_number: req.body.phone_number,
          password: req.body.password,
          display_name: req.body.display_name || null,
          birthday:req.body.birthday || null,
          is_project_manager:req.body.is_project_manager || 0,
          registration_time:new Date()
        });

        // Save Tutorial in the database
        User.insertNewUser(user, (err, data) => {
          if (err)
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the User."
            });
          else {
            //res.send(data);
            // Save User login in the database
            User.userLogin(data, (err, data) => 
            {
              if (err)
                res.status(500).send({
                  message:
                    err.message || "Some error occurred while logging in the User."
                });
              else 
                res.send(data);
            });
          }
        });
      }
  });
};

// Find a single User by Id
exports.findOne = (req, res) => {
  User.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};
exports.findUserByEmail = (req, res) => {
  User.findUserByEmail(req.params.email, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with user email ${req.params.email}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with user email " + req.params.email
        });
      }
    } else res.send(data);
  });
};
exports.findOnlineUserByEmail = (req, res) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password
  });

  User.findOnlineUserByEmail(user, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with user email ${user.email}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with user email " + user.email
        });
      }
    } else res.send(data);
  });
};
// Update a User identified by the id in the request
exports.updateByUser = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);
  const user = new User(req.body);
  User.updateByUser(
    user,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with id ${user.user_id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating User with id " + user.user_id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  User.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete User with id " + req.params.id
        });
      }
    } else res.send({ message: `User was deleted successfully!` });
  });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  User.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all users."
      });
    else res.send({ message: `All Users were deleted successfully!` });
  });
};

// Create and Save User Login
exports.userLogin = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a login User model
  const loginUser = new User({
    email: req.body.email,
    password: req.body.password
  });

  User.findOnlineUserByEmail(loginUser, (err, data) => {
    if (!err)
      res.status(200).send(data);
    else 
    {
      // Save User login in the database
      User.userLogin(loginUser, (err, data) => 
      {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while logging in the User."
          });
        else 
          res.send(data);
      });
    }
  }); 
};

exports.userLogout = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);
  const logoutUser = new User(req.body);
  User.userLogout(req.body.user_id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with id ${req.body.user_id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating User with id " + req.body.user_id
          });
        }
      } else res.send(data);
    }
  );
};
