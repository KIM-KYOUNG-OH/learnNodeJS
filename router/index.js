var express = require('express')
var path = require('path')
var app = express()
var router = express.Router()
var main = require('./main/main')
var email = require('./email/email')
var join = require('./join/index')
var login = require('./login/index')
var logout = require('./logout/index')
var movie = require('./movie/index')

router.use('/main', main)
router.use('/email', email)
router.use('/join', join)
router.use('/login', login)
router.use('/logout', logout)
router.use('/movie', movie)

module.exports = router;