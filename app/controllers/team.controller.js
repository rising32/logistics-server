const User = require("../models/team.model.js");

// Create and Save a new User
exports.signup = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Tutorial
  const user = new User({
    email: req.body.email,
    password: req.body.password,
    display_name: req.body.display_name || null,
    birthday:req.body.birthday || null
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
};

// Retrieve all Tutorials from the database (with condition).
// exports.findAll = (req, res) => {
//   const title = req.query.title;

//   Tutorial.getAll(title, (err, data) => {
//     if (err)
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving tutorials."
//       });
//     else res.send(data);
//   });
// };

// Find a single Tutorial by Id
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
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  User.updateById(
    req.params.id,
    new User(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating User with id " + req.params.id
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
      res.status(200).send({
        message: "User already logged in."
      });
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
  User.userLogout(
    logoutUser,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with id ${logoutUser.user_id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating User with id " + logoutUser.user_id
          });
        }
      } else res.send(data);
    }
  );
};
