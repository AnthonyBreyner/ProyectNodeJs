'use strict'
const express=require('express')
const api=express.Router()
const HourCtrl=require('../controllers/hours')
const ProductCtrl=require('../controllers/products')
const userCtrl=require('../controllers/user')
const auth=require('../middlewares/auth')

api.get('/hour', auth, HourCtrl.getHours)
api.get('/hour/:hourid', auth, HourCtrl.getHour)
api.post('/hour', auth, HourCtrl.saveHour)
api.put('/hour/:hourid', auth, HourCtrl.updateHour)
api.delete('/hour/:hourid', auth, HourCtrl.deleteHour)
api.get('/product', auth, ProductCtrl.getProducts)
api.get('/product/:productid', auth, ProductCtrl.getProduct)
api.post('/product', auth, ProductCtrl.saveproduct)
api.put('/product/:productid', auth, ProductCtrl.updateproduct)
api.delete('/product/:productid', auth, ProductCtrl.deleteproduct)
api.get('/user', userCtrl.getUser)
api.post('/signup', userCtrl.signUp)
api.post('/signin', userCtrl.signIn)
api.get('/private', auth, (req, res)=>{
	res.status(200).send({message:"Tienes acceso"})
	alert(message);
})
module.exports= api