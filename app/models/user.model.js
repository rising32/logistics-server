const sql = require("./db.js");

const User = function(user) {
  this.user_id = user.user_id,
  this.email = user.email;
  this.password = user.password;
  this.display_name = user.display_name;
  this.birthday = user.birthday;
  this.avatar = user.avatar;
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
    "select * from tbl_login where user_id = (SELECT user_id FROM `tbl_user` WHERE email = ? and password = ?) and out_time is null", 
    [user.email, user.password],
    (err, res) => {
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

    // not found Online User with the email, password
    result({ kind: "not_found" }, null);
  });
};

User.updateByUser = (user, result) => {
  sql.query(
    "UPDATE tbl_user SET email = ?, password = ?, display_name = ?, birthday = ?, avatar = ? WHERE user_id = ?",
    [user.email, user.password, user.display_name,user.birthday,user.avatar, user.user_id],
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

User.userLogout = (user, result) => {
  sql.query(
    "UPDATE tbl_login SET out_time = ? WHERE login_time = (select MAX(login_time) from tbl_login where user_id = ?)",
    [new Date(), user.user_id],
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

      console.log("logout user: ", {...user });
      result(null, {...user });
    }
  );
};

module.exports = User;
