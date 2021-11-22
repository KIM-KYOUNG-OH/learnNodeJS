var express = require('express')
var path = require('path')
var app = express()
var router = express.Router();

//url routing
router.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, "../../public/main.html"))
})

module.exports = router;