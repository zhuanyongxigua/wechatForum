const express = require('express')
var bodyParser = require('body-parser');
var appData = require('../data.json');
var pages = appData.pages;
var apiRoutes = express.Router();

apiRoutes.use(bodyParser.json());

apiRoutes.route('/pages')
  .get(function (req, res) {
    res.json({
      errno: 0,
      data: pages
    });
  })
  .post(function (req, res) {
    var assignPages = JSON.parse(JSON.stringify(pages));
    var results = [];
    var toSearch = req.body.param.consultVo.queryStr;
    for (var i = 0; i < assignPages.rows.length; i++) {
      if (assignPages.rows[i].name.indexOf(toSearch) != -1) {
        results.push(assignPages.rows[i]);
      } else if (assignPages.rows[i].content.indexOf(toSearch) != -1) {
        results.push(assignPages.rows[i]);
      }
    }
    assignPages.pages = Math.ceil(results.length / req.body.pageSize);
    assignPages.pageNum = req.body.currentpage;
    var startPage = (req.body.currentpage - 1) * req.body.pageSize;
    var endPage = startPage + req.body.pageSize;
    assignPages.rows = results.slice(startPage, endPage);
    res.send(assignPages);
  });
module.exports = apiRoutes;

