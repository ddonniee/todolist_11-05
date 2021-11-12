var express = require('express');
var router = express.Router();
const db = require('../data/data.json')
const crudService = require('../service/crud.service');

router.get('/', function (req, res, next) {
  const list = crudService.getTodoList('monthly')
  res.render('monthly.html', { title: 'Monthly', list });
});

router.post('/', function (req, res, next) {

  if (req.body && req.body.title && req.body.type) {
    crudService.todoAdd(req.body.type, req.body.title)
  }

  const list = crudService.getTodoList('monthly')
  res.render('monthly.html', { title: 'Daily', list });
})

router.put('/:id', function (req, res, next) {

  if (req.params && req.params.id && req.body && req.body.title) {
    crudService.todoUpdate('monthly', +req.params.id, req.body.title)
  }

  const list = crudService.getTodoList('monthly')
  res.status(200).json({ list })
})

router.delete('/:id', function (req, res, next) {

  if (req.params && req.params.id) {
    crudService.todoDelete('monthly', +req.params.id)
  }

  const list = crudService.getTodoList('monthly')
  res.status(200).json({ list })
})

module.exports = router;