const router = require('express').Router()
const controllers = require('../controllers/index.js')

router.post('/create-reservation', controllers.createReservation)

module.exports = router