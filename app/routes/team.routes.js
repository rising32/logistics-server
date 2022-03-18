module.exports = app => {
  const team = require("../controllers/team.controller.js");

  // Add a new team member
  app.post("/team/add_member", team.addTeamMember);

  // Get user's team member
  app.post("/team/get_team_members", team.getTeamMembers);
};