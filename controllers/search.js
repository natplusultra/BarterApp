var express = require('express');
var app = express();
var mysql = require('mysql');

module.exports = function(app) {
  app.get('/search', function(req, res) {
    connection.query(
      'SELECT title from Services where title like "%' + req.query.key + '%"',
      function(err, rows, fields) {
        if (err) throw err;
        var data = [];
        for (i = 0; i < rows.length; i++) {
          data.push(rows[i].first_name);
        }
        res.end(JSON.stringify(data));
        console.log(data);
      }
    );
  });
};
