'use strict'
const express=require('express')
const morgan = require('morgan')
const path = require('path')
const bodyParser= require('body-parser')
const hbs = require('express-handlebars')
const app= express()
const api=require('./routes')
const ProductCtrl=require('./controllers/products')
const HourCtrl=require('./controllers/hours')
app.use(bodyParser.urlencoded({extend: false}))
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
//app.use(express.static('public'))
app.engine('.hbs', hbs({
	defaultlayout: 'default',
	extname: '.hbs'
}))
app.set('view engine', '.hbs')
app.use('/api',api)

app.get('/login',(req,res)=>{
	res.render('login')
})

app.get('/home',(req,res)=>{
	res.render('home')
})

app.get('/signup',(req,res)=>{
	res.render('signup')
})

app.get('/verhorasdetrabajo',(req,res)=>{
	res.render('verhorasdetrabajo')
})

app.get('/adminusuarios',(req,res)=>{
	res.render('adminusuarios')
})

app.get('/administrador', (req, res) => {
  res.render('administrador')
})


module.exports=app