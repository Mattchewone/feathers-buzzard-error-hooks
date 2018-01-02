// Initializes the `pots` service on path `/pots`
const createService = require('./pots.class.js')
const hooks = require('./pots.hooks')

module.exports = function (app) {
  const paginate = app.get('paginate')

  const options = {
    name: 'pots',
    paginate
  }

  // Initialize our service with any options it requires
  app.use('/pots', createService(options))

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('pots')

  service.hooks(hooks)
}
