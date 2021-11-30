var express = require('express')
var path = require('path')
var app = express()
var router = express.Router();

//main page는 login 될 때만(세션 정보가 있을 때만) 접근이 가능하게 하자
//url routing
router.get('/', function(req, res) {
	console.log('main is loaded');
	var user = req.user;
	if(!user) return res.render('login.ejs');
	res.render('main.ejs', {'id' : user});
})

module.exports = router;