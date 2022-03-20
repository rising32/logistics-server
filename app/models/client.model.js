const sql = require("./db.js");

const Client = function(client) {
    this.user_id = client.user_id;
    this.client_id = client.client_id;
    this.client_name = client.client_name;
    this.is_active = client.is_active;
};

Client.insertNewClient = (newClient, result) => {
  sql.query("INSERT INTO mst_client SET client_name = ?, is_active=?", [newClient.client_name, newClient.is_active], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    newClient.client_id = res.insertId;
    newClient.client_address = null;
    newClient.client_detail = null;
    console.log("created new Client: ", { ...newClient });
    result(null, { ...newClient });
  });
};

Client.updateByClient = (client, result) => {
    sql.query(
      "UPDATE mst_client SET client_name = ?,client_address = ?, client_detail = ?,is_active = ? WHERE client_id = ?",
      [client.client_name, client.client_address, client.client_detail, client.is_active, client.client_id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found client with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated client: ", { ...client });
        result(null, {...client });
      }
    );
  };

Client.registMyClient = (client, result) => {    
    sql.query(
        "INSERT INTO tbl_user_client SET user_id = ?, client_id = ?, is_active = ?", 
        [client.user_id, client.client_id, client.is_active], 
        (err, res) => 
        {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }    
            console.log("created my Client: ", { uc_id: res.insertId, ...client});
            result(null, { uc_id: res.insertId, ...client });
        });
    };

Client.getMyClients = (user_id, result) => {    
    sql.query(
        "select c.* from mst_client c, (SELECT * FROM tbl_user_client WHERE user_id = ?) uc where c.client_id = uc.client_id", 
        user_id, (err, res) => 
        {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }    
            console.log("created my Client: ", { user_id : user_id, clients:res});
            result(null, { user_id : user_id, clients:res });
        });
    };

module.exports = Client;
