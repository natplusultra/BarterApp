// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {


  //Route for getting all the Services
  app.get("/api/services/", function(req, res) {
    db.Service.findAll({})
    .then(function(dbPost) {
      res.json(dbPost);
    });
  });


    // POST route for saving a new Service
  app.post("/api/services", function(req, res) {
    db.Service.create(req.body).then(function(dbPost) {
      res.json(dbPost);
    });
  });

};
