const errors = require('@feathersjs/errors')

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [
      context => {
        const { app } = context
        return app.service('pots').find({ query: {} })
          .then(() => {
            return Promise.reject(new errors.NotFound('Something went wrong'))
          })
      }
    ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [
      context => {
        context.result = { passed: true }
        return context
      }
    ],
    update: [],
    patch: [],
    remove: []
  }
}
