module.exports = app => {
  const team = require("../controllers/team.controller.js");

  // Add a new team member
  app.post("/team/add_member", team.addTeamMember);

  // Update a Team member type with id
  app.post("/team/update_by_member", team.updateByMember);

  // Get user's team member
  app.post("/team/get_team_members", team.getTeamMembers);

  // Get user's team Member
  app.post("/team/get_member", team.getTeamMember);
};