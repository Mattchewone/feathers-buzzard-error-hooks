const feathers = require('@feathersjs/feathers')
const io = require('socket.io-client')
const axios = require('axios')
const rest = require('@feathersjs/rest-client')
const socketio = require('@feathersjs/socketio-client')
const auth = require('@feathersjs/authentication-client')

const host = 'http://localhost:3030'

function makeClient ({ transport = 'socketio' }) {
  const feathersClient = feathers()

  if (transport === 'socketio') {
    var socket = io(host, {
      transports: ['websocket'],
      extraHeaders: {
        'origin': `http://localhost:3030`
      }
    })
    feathersClient.configure(socketio(socket, { timeout: 60000 }))
  }
  // Headers are mocked in individual service calls for Rest.
  if (transport === 'rest') {
    feathersClient.configure(rest(host).axios(axios))
  }

  feathersClient
    .configure(auth())

  return feathersClient
}

module.exports = [
  makeClient({
    transport: 'socketio'
  }),
  makeClient({
    transport: 'rest'
  })
]

module.exports.makeClients = function () {
  return [
    makeClient({
      transport: 'socketio'
    }),
    makeClient({
      transport: 'rest'
    })
  ]
}
