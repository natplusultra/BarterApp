var db = require("../models");

module.exports = function(app) {
  app.get("/api/users", function(req, res) {
    db.User.findAll({}).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.get("/api/users/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    db.User.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Service]
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.get("/api/users/firebase/:firebase_uid", function(req, res) {
    //We use this route to find the User with a firebase_uid 
    db.User.findOne({
      where: {
        firebase_uuid: req.params.firebase_uid
      },
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });




  app.post("/api/users", function(req, res) {
     // Create an Author with the data available to us in req.body
    console.log(req.body);
    db.User.create(req.body).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.post("/api/users/contact", function(req, res) {
     // Create an Author with the data available to us in req.body
    console.log(req.body);

    // add e-mail code here

// using SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
  to: req.body.serviceEmail,
  from: req.body.email,
  subject: 'New Message from Baz!',
  text: req.body.message,
  html: req.body.message,
};
sgMail.send(msg);

    
    res.json({type: 'success', message: 'Message sent!'});
  });


};
