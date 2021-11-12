var express = require('express');
var router = express.Router();
const db = require('../data/data.json')
const crudService = require('../service/crud.service');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index.html', { title: 'Plan for your life' });
});

router.post('/', function (req, res, next) {
  res.render('index.html', { title: 'Plan for your life' });
});

module.exports = router;
