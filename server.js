const express = require("express");
const cors = require("cors");

const app = express();

// var corsOptions = {
//   origin: "http://localhost:3100"
// };

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to PMO application." });
});

require("./app/routes/user.routes.js")(app);
require("./app/routes/team.routes.js")(app);
require("./app/routes/admin.routes.js")(app);
require("./app/routes/project.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3100;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
