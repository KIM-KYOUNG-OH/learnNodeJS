var express = require('express')
var path = require('path')
var app = express()
var router = express.Router()
var mysql = require('mysql')

// Database Setting
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'jsman'
});

// Routing
router.post('/form', function(req, res){
	// get : req.param('email')
	console.log(req.body.email)
	res.render('email.ejs', {email: req.body.email})
})

// app.post('/ajax_send_email', function(req, res) {
// 	console.log(req.body.email);
// 	// check validation about input value => select db
// 	var responseData = {'result': 'ok', 'email': req.body.email}
// 	res.json(responseData);
// })

router.post('/ajax', function(req, res) {
    var email = req.body.email;
    var responseData = {};

    var query = connection.query('select name from user where email = "' + email + '"', function(err, rows){
        if (err) {
			throw err;
		}
        if (rows[0]) {
            console.log(rows[0].name);
            responseData.result = 'ok';
            responseData.name = rows[0].name;
        }else {
            console.log('none : ' + rows[0]);
			responseData.result = 'none';
            responseData.name = '';
        }
		res.json(responseData);
    })
})

module.exports = router;