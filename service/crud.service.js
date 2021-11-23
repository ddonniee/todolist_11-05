const fs = require('fs')
const db = require('../data/data.json')

function getTodoList(type) {
  if (type && db[type]) {
    return db[type]
  } else {
    throw Error('INVALID_TYPE')
  }
}

// data.json file에 추가하기 by은정 21.10.18
function todoAdd(type, title) {

  if (!db[type]) throw Error('INVALID_TYPE')

  const newDate = new Date()
  const id = newDate.getTime()

  const newTodoItem = { id, title }

  db[type].push(newTodoItem)

  fs.writeFileSync('data/data.json', JSON.stringify(db))

}

function todoUpdate(type, id, title) {
  if (!db[type] || typeof id != 'number' || typeof title != 'string') throw Error('INVALID_TYPE')

  db[type].map(ele => {
    if (ele.id === id) {
      ele.title = title
    }
  })

  fs.writeFileSync('data/data.json', JSON.stringify(db))

}

function todoDelete(type, id) {

  if (!db[type] || typeof id != 'number') throw Error('INVALID_TYPE')

  db[type] = db[type].filter(ele => ele.id !== id)
  fs.writeFileSync('data/data.json', JSON.stringify(db))
}

exports.getTodoList = getTodoList
exports.todoAdd = todoAdd
exports.todoUpdate = todoUpdate
exports.todoDelete = todoDelete