const { XMLHttpRequest } = require('xmlhttprequest')
const API = 'https://rickandmortyapi.com/api/character/'

// Con las promesas solucionamos el callback hell

const fetchData = (url_api) => {
  return new Promise( (resolve, reject) => {
    const xhttp = new XMLHttpRequest()
    xhttp.open('GET', url_api, true) // true, activa el asincronismo de XMLHttpRequest
    xhttp.onreadystatechange = ( () => { // deja esperando por el cambio de estado de la peticion (EventEmmiter)
      if (xhttp.readyState === 4) { // 4 = se completo la consulta
        (xhttp.status === 200)  // 200 = se realizo la consulta correctamente
         ? resolve( JSON.parse(xhttp.responseText) ) // Devuelve un json con la informacion de la peticion
         : reject( new Error('Error', url_api) ) // Devuelve el error
      }
    })
    xhttp.send() // Enviamos la peticion
  })
}

fetchData(API)
  .then( data => { // Obtiene todos los personajes
    console.log( data.info.count ) 
    return fetchData(`${API}${data.results[0].id}`)
  })
  .then( data => { // Consulta solo el primer personaje
    console.log( data.name ) 
    return fetchData(data.origin.url)
  })
  .then( data => { // Consulta por la dimension del personaje
    console.log( data.dimension ) 
  })
  .catch( error => console.error(error))

