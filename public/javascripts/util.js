function todoUpdate(type, id, title) {

  const sendParams = { title }

  const xhr = new XMLHttpRequest();

  xhr.open('PUT', `/${type}/${id}`)
  xhr.setRequestHeader('Content-type', 'application/json');
  xhr.send(JSON.stringify(sendParams))

  xhr.onreadystatechange = function (e) {

    if (xhr.readyState !== XMLHttpRequest.DONE) return

    if (xhr.status === 200) {
      location.reload()
    } else {
      console.log('ERROR')
    }
  }
}

function todoDelete(type, id) {

  const xhr = new XMLHttpRequest();

  xhr.open('DELETE', `/${type}/${id}`)
  xhr.setRequestHeader('Content-type', 'application/json');
  xhr.send()

  xhr.onreadystatechange = function (e) {

    if (xhr.readyState !== XMLHttpRequest.DONE) return

    if (xhr.status === 200) {
      location.reload()
    } else {
      console.log('ERROR')
    }
  }

}