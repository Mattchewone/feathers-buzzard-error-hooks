const assert = require('assert')
const app = require('../../app')
const utils = require('../../../test-utils/')

const servicePath = 'pots'
const serviceOnServer = app.service(servicePath)

describe(`${servicePath} Service`, () => {
  it('registered the service', () => {
    const service = app.service('pots')

    assert.ok(service, 'Registered the service')
  })

  utils.clients.makeClients().forEach(client => {
    runClientTests(client)
  })

  describe(`${servicePath} - Server`, function () {
    it('swallow errors', function (done) {
      serviceOnServer.create({ name: 'matt' })
        .then(response => {
          assert(response.passed, 'we made it')
          done()
        })
        .catch(done)
    })
  })
})

function runClientTests (feathersClient) {
  const transport = feathersClient.io ? 'feathers-socketio' : 'feathers-rest'
  let serviceOnClient = feathersClient.service(servicePath)

  describe(`${servicePath} - ${transport} Transport`, function () {
    it('swallow errors', function (done) {
      serviceOnClient.create({ name: 'matt' })
        .then(response => {
          assert(response.passed, 'we made it')
          done()
        })
        .catch(done)
    })
  })
}
