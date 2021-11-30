var express = require('express')
var path = require('path')
var app = express()
var router = express.Router()
var mysql = require('mysql')
const passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
const { doesNotMatch } = require('assert')

// Database Setting
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'jsman'
});

// Routing
router.get('/', function(req, res){
    var msg;
    var errMsg = req.flash('error');
    if(errMsg) msg = errMsg;
	res.render('login.ejs', {'message' : msg});
})

passport.serializeUser(function(user, done){
    done(null, user);
    console.log('passport session save: ', user.id);
})

passport.deserializeUser(function(id, done) {
    console.log('passport session get id: ', id);
    done(err, id);
});

// register strategy
passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, email, password, done) {
    var query = connection.query('select * from user where email=?', [email], function(err, rows){
        if(err) {
            return done(err);
        }
        if(rows.length) {
            return done(null, {'email': email, 'id': rows[0].user_id});
        } else{
            return done(null, false, {'message': 'your login info is not found'});
        }
    })
}))

// Routing & call local strategy
router.post('/', function(req, res, next){
    passport.authenticate('local-login', function(err, user, info){
        if (err) return res.status(500).json(err);
        if (!user) { 
            return res.status(401).json(info.message)
        }

        req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.json(user);
        });
    })(req, res, next);
})

module.exports = router;