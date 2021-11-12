var express = require('express');
var router = express.Router();
const db = require('../data/data.json')
const crudService = require('../service/crud.service');

router.get('/', function (req, res, next) {
  const list = crudService.getTodoList('daily')
  res.render('daily.html', { title: 'Daily', list });
});

router.post('/', function (req, res, next) {

  if (req.body && req.body.title && req.body.type) {
    crudService.todoAdd(req.body.type, req.body.title)
  }

  const list = crudService.getTodoList('daily')
  res.render('daily.html', { title: 'Daily', list });
})

router.put('/:id', function (req, res, next) {

  if (req.params && req.params.id && req.body && req.body.title) {
    crudService.todoUpdate('daily', +req.params.id, req.body.title)
  }

  const list = crudService.getTodoList('daily')
  res.status(200).json({ list })
})

router.delete('/:id', function (req, res, next) {

  if (req.params && req.params.id) {
    crudService.todoDelete('daily', +req.params.id)
  }

  const list = crudService.getTodoList('daily')
  res.status(200).json({ list })
})

module.exports = router;