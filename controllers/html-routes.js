var path = require('path');
var db = require('../models');
const Op = require('sequelize').Op;

module.exports = function(app) {
  app.get('/', function(req, res) {
    pageScripts = [{ script: '/assets/js/search.js' }];
    db.Service.findAll({
      where: {
        id: [7, 16, 14, 15]
      }
    }).then(function(data) {
      var hbsObject = {
        data: data
      };
      hbsObject.scripts = pageScripts;

      res.render('../views/home', hbsObject);
      });
  });

  app.get('/', function(req, res) {
    var hbsObject = {};
    res.render('../views/home', hbsObject);
  });

  app.get('/service', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/serviceadd.html'));
  });

  app.get('/update-user', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/updateuser.html'));
  });

  app.get('/user/:id', function(req, res) {

    db.User.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Service]
    }).then(function(data) {
      var hbsObject = {
        data: data
      };
      res.render('../views/user', data);
    });
  });

  app.get('/product/:id', function(req, res) {
    var hbsObject = {};
  
    pageScripts = [{ script: '/assets/js/product.js' }];
    db.Service.findOne({
      where: {
        id: req.params.id
      },
      include: [db.User]
    }).then(function(data) {
      if (data) {
        hbsObject = data.get({ plain: true });
        hbsObject.scripts = pageScripts;

        res.render('../views/product', hbsObject);
      }
    });
  });
};
