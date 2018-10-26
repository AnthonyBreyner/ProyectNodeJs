'use strict'
const Product=require('../models/product')
function getProduct(req,res){
	let productid=req.params.productid

	Product.findById(productid, (err,product)=>{
		if(err) return res.status(500).send({message:`Error al realizar la peticion: ${err}`})
		if(!product) return res.status(404).send({message:"El producto no existe"})
		

		res.status(200).send({product})	
	})
}

function getProducts(req,res){
	Product.find({}, (err,products)=>{
		if(err) return res.status(500).send({message:`Error al realizar la peticion: ${err}`})
		if(!products) return res.status(404).send({message:"No existen productos"})
	
		res.send(200, {products})
	})
}

function saveproduct(req,res){
	console.log('POST /api/product')
	console.log(req.body)

	let product = new Product()
	product.name=req.body.name
	product.picture=req.body.picture
	product.price=req.body.price
	product.category=req.body.category
	product.description=req.body.description

	product.save((err,productStored)=>{
		if(err) res.status(500).send({message:`Error al salvar en la base de datos ${err}`})

		res.status(200).send({product:productStored})
	})
}

function updateproduct(req,res){
	let productid=req.params.productid
	let update=req.body

	Product.findByIdAndUpdate(productid, update, (err, productUpdate)=>{
		if(err) res.status(500).send({message:`Erros al actualizar el producto ${err}`})

		res.status(200).send({message:`Producto actualizado ${productUpdate}`})
	})
}

function deleteproduct(req,res){
	let productid=req.params.productid

	Product.findById(productid, (err, product)=>{
		if(err) res.status(500).send({message:`Erros al borrar el producto ${err}`})

		product.remove(err=>{
			if(err) res.status(500).send({message:`Erros al borrar el producto ${err}`})
			res.status(200).send({message:`El producto a sido eliminado.`})
		})
	})
}

module.exports={
	getProduct,
	getProducts,
	saveproduct,
	updateproduct,
	deleteproduct
	
}
