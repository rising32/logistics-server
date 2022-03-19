const sql = require("./db.js");

const User = function(user) {
  this.user_id = user.user_id,
  this.email = user.email;
  this.phone_number = user.phone_number;
  this.password = user.password;
  this.display_name = user.display_name;
  this.birthday = user.birthday;
  this.avatar = user.avatar;
  this.is_project_manager = user.is_project_manager;
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

    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
};

User.findUserByEmail = (email, result) => {
  sql.query(`SELECT * FROM tbl_user WHERE email = ${email}`, (err, res) => {
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

    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
};

User.findOnlineUserByEmail = (user, result) => {
  sql.query(
    "select l.login_id, u.* from tbl_login l, (SELECT * FROM `tbl_user` WHERE email = ? and password = ?) u where l.user_id = u.user_id and out_time is null", 
    [user.email, user.password],
    (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", {user:res});
      result(null, {user:res});
      
      return;
    }

    // not found Online User with the email, password
    result({ kind: "not_found" }, null);
  });
};

User.updateByUser = (user, result) => {
  sql.query(
    "UPDATE tbl_user SET email = ?, phone_number = ?,password = ?, display_name = ?, birthday = ?, avatar = ?, is_project_manager = ? WHERE user_id = ?",
    [user.email, user.phone_number, user.password, user.display_name,user.birthday,user.avatar, user.is_project_manager, user.user_id],
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
  sql.query(
    "insert into tbl_login set user_id = (SELECT user_id FROM `tbl_user` WHERE email = ? and password = ?)",
    [loginUser.email, loginUser.password],
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
          console.log("login user: ", {login_id:res.insertId, user:resUser });
          result(null, { login_id:res.insertId, user:resUser});
        });
    });
};

User.userLogout = (user_id, result) => {
  sql.query(
    "UPDATE tbl_login SET out_time = ? WHERE login_time = (select MAX(login_time) from tbl_login where user_id = ?)",
    [new Date(), user_id],
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
