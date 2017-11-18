// dependencies
var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");

// starts the express app
var app = express();
var PORT = process.env.PORT || 8080;

// serves static content for the app from the "public" directory 
app.use(express.static("public"));

var db = require("./models");

// sets up the express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// sets up handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

require("./routes/service-api-routes.js")(app);
require("./routes/user-api-routes.js")(app);
require("./routes/html-routes.js")(app);


db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
