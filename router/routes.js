const express = require('express')
const router = express.Router()
const googleData = require('../controllers/sendGoogleResult')
const clickData = require('../controllers/sendClickResult')


router.route("/google").post(googleData)
router.route("/click").post(clickData)

module.exports = router
