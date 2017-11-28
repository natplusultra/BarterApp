// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get("/", function(req, res) {
    var hbsObject = {};
    res.render("../views/home", hbsObject);
  });

  // app.get("/user", function(req, res) {
  //   res.sendFile(path.join(__dirname, "../public/user.html"));
  // });

    app.get("/service", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/serviceadd.html"));
  });

    app.get("/update-user", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/updateuser.html"));
  });

  app.get("/user/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    db.User.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Service]
    }).then(function(data) {
      var hbsObject = {
        data: data
      };
      res.render("../views/user", data);
    });
  });


  app.get("/product/:id", function(req, res) {
    var hbsObject = {}
    // add page level scripts
    pageScripts = [{ script: '/assets/js/product.js' }];

    // Here we add an "include" property to our options in our findOne query
    db.Service.findOne({
      where: {
        id: req.params.id
      },
      include: [db.User]
    }).then(function(data) {
      if (data) {
        hbsObject = data.get({plain:true});
        hbsObject.scripts = pageScripts;

        console.log(hbsObject);
        console.log("-------------------------------------")

        res.render("../views/product", hbsObject);
      }
    });
  });

  // // cms route loads cms.html
  // app.get("/cms", function(req, res) {
  //   res.sendFile(path.join(__dirname, "../public/cms.html"));
  // });

  // // blog route loads blog.html
  // app.get("/blog", function(req, res) {
  //   res.sendFile(path.join(__dirname, "../public/blog.html"));
  // });

  // app.get("/authors", function(req, res) {
  //   res.sendFile(path.join(__dirname, "../public/author-manager.html"));
  // });

  // app.get("/allservice", function(req, res) {
  //   res.sendFile(path.join(__dirname, "../public/blog.html"));
  // });



};
