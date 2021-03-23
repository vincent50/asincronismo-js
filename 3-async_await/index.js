const { XMLHttpRequest } = require('xmlhttprequest')
const API = 'https://rickandmortyapi.com/api/character/'

// Con las async await podemos realizar multiples consultas de una forma mas rapida
// pero esto no reemplaza por completo a las promesas, ya que no podemos retornar un resultado solo con async await
// aqui seguiremos utilizando la promesa de la peticion con resolve o reject

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

// Pero modificaremos la obtencion de la informacion de las promesas de una forma mas ordenada
const anotherFuncion = async () => {
  try { // 
    const all = await fetchData(API) // Obtiene todos los personajes
    const character = await fetchData(`${API}${all.results[0].id}`) // Consulta solo el primer personaje
    const { dimension } = await fetchData(character.origin.url) // Consulta por la dimension del personaje
    console.log(all.info.count) 
    console.log(character.name) 
    console.log(dimension) // utilizamos destructuring para solo obtener la dimension
  } catch (error) {
    console.error(error) // Mostramos el error
  }
}

anotherFuncion()
