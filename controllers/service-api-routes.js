var db = require("../models");
const Op = require('sequelize').Op;

module.exports = function(app) {

  app.get("/api/services/", function(req, res) {
    db.Service.findAll({})
    .then(function(dbPost) {
      res.json(dbPost);
    });
  });

  app.post("/api/services", function(req, res) {
    db.Service.create(req.body).then(function(dbPost) {
      res.json(dbPost);
    });
  });

 app.get('/api/services/search/:term', function(req, res) {
    db.Service.findAll({
      where: {
        [Op.or]: [
          {
            title: {
              [Op.like]: '%' + req.params.term + '%'
            }
          },
          {
            description: {
              [Op.like]: '%' + req.params.term + '%'
            }
          }
        ]
      },
      limit: 8
    }).then(function(data) {
      res.json(data);
    });
  });
};
