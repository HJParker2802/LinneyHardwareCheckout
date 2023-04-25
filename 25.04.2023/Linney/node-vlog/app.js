var createError = require('http-errors')
var session = require('express-session')
var flash = require('express-flash')
var express = require('express')
var logger = require('morgan')
var path = require('path')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var db = require('./database')
var app = express()
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(logger('dev'))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(
  session({
    secret: '123@123abc',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  }),
)
app.use(flash())
app.get('/', function (req, res, next) {
  res.render('index', { title: 'User Form' })
})
app.post('/user_form', function (req, res, next) {
  var name = req.body.name
  var email = req.body.email
  var message = req.body.message
  var sql = `INSERT INTO users (name, email, message, created_at) VALUES ("${name}", "${email}", "${message}", NOW())`
  db.query(sql, function (err, result) {
    if (err) throw err
    console.log('Row has been updated')
    req.flash('success', 'Data stored!')
    res.redirect('/')
  })
})
app.use(function (req, res, next) {
  next(createError(404))
})
app.use(function (err, req, res, next) {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  res.status(err.status || 500)
  res.render('error')
})
app.listen(5000, function () {
  console.log('Node server is running on port : 5000')
})
module.exports = app