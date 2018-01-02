/* eslint-disable no-unused-vars */
const errors = require('@feathersjs/errors')
const notImplementedError = new errors.NotImplemented('Method not implemented')

class Service {
  constructor (options) {
    this.options = options || {}
  }

  async find (params) {
    return []
  }

  async get (id, params) {
    return notImplementedError
  }

  async create (data, params) {
    return data
  }

  async update (id, data, params) {
    return notImplementedError
  }

  async patch (id, data, params) {
    return notImplementedError
  }

  async remove (id, params) {
    return notImplementedError
  }
}

module.exports = function (options) {
  return new Service(options)
}

module.exports.Service = Service
