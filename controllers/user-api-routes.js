var db = require("../models");

module.exports = function(app) {
  app.get("/api/users", function(req, res) {
    db.User.findAll({}).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.get("/api/users/:id", function(req, res) {
    // We use this route to grab a specific user information.
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
     // API used to create a new User.
    console.log(req.body);
    db.User.create(req.body).then(function(dbUser) {
      res.json(dbUser);
    });
  });

    // PUT route for updating users
  app.put("/api/users", function(req, res) {
    db.User.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbPost) {
        res.json(dbPost);
      });
  });

  app.post("/api/users/contact", function(req, res) {
     // Create an Author with the data available to us in req.body
    console.log(req.body);

    // add e-mail code here

// using SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
// const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// const msg = {
//   to: 'test@example.com',
//   from: 'test@example.com',
//   subject: 'Sending with SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// };
// sgMail.send(msg);
    
    res.json({type: 'success', message: 'Message sent!'});
  });


};
