const express = require("express");
const fileUpload = require('express-fileupload');
const cors = require("cors");
const path = require("path")

const app = express();

// var corsOptions = {
//   origin: "http://localhost:3100"
// };

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(fileUpload({
  createParentPath: true,
  limits: { fileSize: 50 * 1024 * 1024 },
  useTempFiles : true,
  tempFileDir : '/tmp/'
}));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to PMO application." });
});
//get image
app.get('/show/files', (req,res)=>{
  res.sendFile(path.resolve("./uploads") + "\\" + req.body.file_name); 
 })

require("./app/routes/user.routes.js")(app);
require("./app/routes/team.routes.js")(app);
require("./app/routes/admin.routes.js")(app);
require("./app/routes/project.routes.js")(app);
require("./app/routes/priority.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3100;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
