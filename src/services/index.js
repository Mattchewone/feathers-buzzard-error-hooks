const pots = require('./pots/pots.service.js')
module.exports = function (app) {
  app.configure(pots)
}
