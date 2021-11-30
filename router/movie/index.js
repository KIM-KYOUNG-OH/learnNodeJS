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

connection.connect()

// Routing
router.get('/list', function(req, res){
    res.render('movie.ejs');
})

// /movie , GET
router.get('/', function(req, res) {
    var responseData = {};

    var query = connection.query('select title from movie', function(err, rows){
        if (err) throw err
        if (rows.length) {
            console.log(rows);
            responseData.result = 1;
            responseData.data = rows;
        }else {
			responseData.result = 0;
        }
		res.json(responseData);
    })
})

// /movie, POST
router.post('/', function(req, res) {
    var title = req.body.title;
    var type = req.body.type;
    var grade = req.body.grade;
    var actor = req.body.actor;

    var sql = {title, type, grade, actor};  // ES6에서 적용되는 문법(key값 생략 가능)
    var query = connection.query('insert into movie set ?', sql, function(err, rows){
        if(err) throw err;
        return res.json({'result': 1});
    })
})

// /movie/:title, GET
router.get('/:title', function(req, res) {
    var title = req.params.title;
    console.log('title : ', title);

    var responseData = {};

    var query = connection.query('select * from movie where title = ?', [title], function(err, rows){
        if (err) throw err
        if (rows[0]) {
            responseData.result = 1;
            responseData.data = rows;
        }else {
			responseData.result = 0;
        }
		res.json(responseData);
    })
})

// /movie/:title, DELETE
router.delete('/:title', function(req, res) {
    var title = req.params.title;
    
    var responseData = {};
    
    var query = connection.query('delete from movie where title = ?', [title], function(err, rows){
        console.log(rows)
        if (err) throw err

        if (rows.affectedRows > 0) {
            responseData.result = 1;
            responseData.data = title;
        }else {
			responseData.result = 0;
        }
		res.json(responseData);
    })
})

module.exports = router;