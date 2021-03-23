const { XMLHttpRequest } = require('xmlhttprequest')
const API = 'https://rickandmortyapi.com/api/character/'

// Callback es first error, entonces cuando lo utilizamos debemos utilizar la sintaxis
// callback(error, response)

function fetchData(url_api, callback) {
  let xhttp = new XMLHttpRequest()
  xhttp.open('GET', url_api, true) // true, activa el asincronismo de XMLHttpRequest
  xhttp.onreadystatechange = function (event) { // deja esperando por el cambio de estado de la peticion (EventEmmiter)
    if (xhttp.readyState === 4) { // 4 = se completo la consulta
      if (xhttp.status === 200) { // 200 = se realizo la consulta correctamente
        callback(null, JSON.parse(xhttp.responseText)) // Parseamos el texto obtenido como texto
      } else {
        const error = new Error('Error ' + url_api)
        return callback(error, null)
      }
    }
  }
  xhttp.send() // Enviamos la peticion
}

// Peticion multiple :: CallBack Hell!!
fetchData(API, function(error1, data1) { // Obtiene todos los personajes
  if (error1) return console.error(error1)
  fetchData(API + data1.results[0].id, function(error2, data2){ // Consulta solo el primer personaje
    if (error2) return console.error(error2)
    fetchData(data2.origin.url, function(error3, data3){ // Consulta por la dimension del personaje
      if (error3) return console.error(error3)
      console.log(data1.info.count)
      console.log(data2.name)
      console.log(data3.dimension)
    })
  })
})