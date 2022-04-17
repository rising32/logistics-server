const sql = require("./db.js");
const crypto = require('crypto');

const User = function(user) {
  this.user_id = user.user_id,
  this.email = user.email;
  this.phone_number = user.phone_number;
  this.password = user.password;
  this.display_name = user.display_name;
  this.birthday = user.birthday;
  this.avatar = user.avatar;
  this.role_id = user.role_id;
  this.registration_time = user.registration_time;
};

User.insertNewUser = (newUser, result) => {
  sql.query("INSERT INTO tbl_user SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created new User: ", { user_id: res.insertId, ...newUser });
    result(null, { user_id: res.insertId, ...newUser });
  });
};

User.findById = (id, result) => {
  sql.query(`SELECT * FROM tbl_user WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found User with the id
    result({ kind: "not_found" }, null);
  });
};

User.findAll = (result) => {
  sql.query(`SELECT * FROM tbl_user`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res);
      result(null, res);
      return;
    }

    // not found User with the id
    result({ kind: "not_found" }, null);
  });
};

User.findUserByEmail = (email, result) => {
  sql.query("SELECT * FROM tbl_user WHERE email = ?", email, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Email with the id
    result({ kind: "not_found" }, null);
  });
};

User.findUserByPhoneNum = (phone_number, result) => {
  sql.query("SELECT * FROM tbl_user WHERE phone_number = ?", phone_number, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      result(null, res[0]);
      return;
    }

    // not found Email with the id
    result({ kind: "not_found" }, null);
  });
};

User.findOnlineUserByEmail = (user, result) => {
  sql.query(
    "select l.login_id, l.token, u.* from tbl_login l, (SELECT * FROM `tbl_user` WHERE email = ? and password = ?) u where l.user_id = u.user_id and out_time is null", 
    [user.email, user.password],
    (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      user = new User(res[0]);      
      console.log("found user: ", {login_id: res[0].login_id, token: res[0].token,user:user});
      result(null, {login_id: res[0].login_id, token: res[0].token, user:user});
      
      return;
    }

    // not found Online User with the email, password
    result({ kind: "not_found" }, null);
  });
};

User.updateByUser = (user, result) => {
  sql.query(
    "UPDATE tbl_user SET email = ?, phone_number = ?,password = ?, display_name = ?, birthday = ?, avatar = ?, role_id = ? WHERE user_id = ?",
    [user.email, user.phone_number, user.password, user.display_name,user.birthday,user.avatar, user.role_id, user.user_id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found User with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated user: ", { ...user });
      result(null, {...user });
    }
  );
};

User.remove = (id, result) => {
  sql.query("DELETE FROM tbl_user WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found user with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted user with id: ", id);
    result(null, res);
  });
};
User.removeAll = result => {
  sql.query("DELETE FROM tbl_user", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} users`);
    result(null, res);
  });
};

User.userLogin = (loginUser, result) => {
  let salt = crypto.randomBytes(16).toString('base64');
  let hash = crypto.createHmac('sha512',salt)
                                  .update(loginUser.email)
                                  .digest("base64");
  var token = salt + "$" + hash;
  sql.query(
    "insert into tbl_login set user_id = (SELECT user_id FROM `tbl_user` WHERE email = ? and password = ?), token = ?",
    [loginUser.email, loginUser.password, token],
    (err, res) => 
    {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }  
      
      sql.query(
        "SELECT * FROM `tbl_user` WHERE email = ? and password = ?",
        [loginUser.email, loginUser.password],
        (err, resUser) => 
        {
          if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }
          console.log("login user: ", {login_id:res.insertId, token:token, user:resUser[0] });
          result(null, { login_id:res.insertId,token:token, user:resUser[0]});
        });
    });
};

User.findOnlineUserByToken = (token, result) => {  
  sql.query(
    "select l.login_id, l.token, u.* from tbl_user u, (SELECT * FROM `tbl_login` WHERE token = ?) l where u.user_id = l.user_id", token, (err, res) => 
    {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      var loginUser = new User(res[0]);  
      console.log("login user: ", {login_id:res[0].login_id, token:token, user:loginUser});
      result(null, {login_id:res[0].login_id, token:token, user:loginUser});
    });
};

User.userLogout = (user_id, result) => {
  sql.query(
    "UPDATE tbl_login SET tbl_login.out_time = NOW() WHERE login_id = (select tmp.max_login_id from (select MAX(login_id) max_login_id from tbl_login where user_id = ?) tmp)",
    [user_id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found User with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("logout user: ", {user_id:user_id });
      result(null, {user_id:user_id });
    }
  );
};

module.exports = User;
