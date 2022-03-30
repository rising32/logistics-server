const User = require("../models/user.model.js");
const mailgun = require("mailgun-js");
const request = require('request');
const crypto = require('crypto');
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
        // find a User by email
        User.findUserByEmail(req.body.email, (err, data) => {
          if (err) {
            if (err.kind === "not_found") {              
              // let salt = crypto.randomBytes(16).toString('base64');
              // let hash = crypto.createHmac('sha512',salt)
              //                                 .update(req.body.password)
              //                                 .digest("base64");
              // req.body.password = salt + "$" + hash;

              // req.body.email_token = crypto.randomBytes(64).toString('hex');
              // req.body.isVerified = false;
              // Create a User   
              const user = new User({
                email: req.body.email,
                phone_number: req.body.phone_number,
                password: req.body.password,
                display_name: req.body.display_name || null,
                birthday:req.body.birthday || null,
                is_project_manager:req.body.is_project_manager || 0,
                registration_time:new Date()
              });

              // Save User in the database
              User.insertNewUser(user, (err, data) => {
                if (err)
                  res.status(500).send({
                    message:
                      err.message || "Some error occurred while creating the User."
                  });
                else {
                  //res.send(data);
                  // const data = {
                  //   from: 'noreplay@email.com',
                  //   to: req.body.email,
                  //   subject: 'Maldiv - Verify your email',
                  //   text:`Hello, thanks for registering on our siter. Please copy paste th address below to verify your account.
                  //     http://${req.headers.host}/verify-email?token=${req.body.emailToken}`,
                  //   html: `<h1>Hellow,</h1>
                  //     <p>Thanks for registering on our site</p>
                  //     <p>Please click the link below to verify your account.</p>
                  //     <a href="http://${req.headers.host}/verify-email?token=${req.body.emailToken}">Verify your account</a>`
                  // };
                  // mg.messages().send(data, function (error, body) {
                  //   console.log("======ssss=======")
                  //   console.log(req.body.emailToken);
                  //   res.status(201).send({id: result._id});
                  // });
                  // Save User login in the database
                  User.userLogin(user, (err, data) => 
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
            } else {
              res.status(500).send({
                message: "Error retrieving User with user email " + req.body.email
              });
            }
          } else {
            res.send({
              message:"This email is already used. Please use other email.",
              email:req.body.email
            });
          }
        });        
      }
  });
};

exports.verifyemail = (req, res) => {
  const user = UserModel.findByEmailToken(req.query.token).then((result) => {
    console.log(result)
    console.log(req.query.token)
    if (!result || result.length <= 0){
      res.status(404).send();
    }
    result[0].emailToken = null;
    result[0].isVerified = true;
    UserModel.patchUser(result[0]._id, result[0]).then((resultValue) => {
      console.log(resultValue)
      res.status(200).send(resultValue);
    });
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

// Find all Users
exports.findAll = (req, res) => {
  User.findAll((err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Users"
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
  loginByUserEmail(user, res);
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

// Delete a User with the specified id in the request
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
  const loginUser = new User(req.body);
  var isEnableLogin = false;
  if(loginUser.email != null)
    User.findUserByEmail(loginUser.email, (er, dat) => {
      if (er)
        res.status(200).send({
          message:"Could not find User with this email."
        });
      else
        loginByUserEmail(loginUser, res);
    });
  else if(loginUser.phone_number != null)
  {
    User.findUserByPhoneNum(loginUser.phone_number, (er, dat) => {
      if (er)
        res.status(200).send({
          message:"Could not find User with this Phone Number."
        });
      else
      {          
        loginUser.email = dat.email;      
        loginByUserEmail(loginUser, res);     
      }    
    });
  }
};

function loginByUserEmail(loginUser, res)
{
  //check if user already logged in
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
}

// User Login by token
exports.userLoginByToken = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }  

  User.findOnlineUserByToken(req.body.token, (err, data) => {
    if (!err)
      res.status(200).send(data);
    else 
    {
      res.status(500).send({
        message:
          err.message || "Your token is not valid."
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
