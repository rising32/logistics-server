module.exports = app => {
    const team = require("../controllers/team.controller.js");
  
    // Create a new team  
    app.post("/team/create", team.create);

    // Add a new team member
    app.post("/team/add_member", team.addTeamMember);
  };