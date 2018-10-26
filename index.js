'use strict'

const mongoose=require('mongoose')
const app=require('./app')
const config=require('./config')

mongoose.connect(config.db, (err, res)=>{
	if(err) {
		return console.log(`Error a connectar a la BD: ${err}`)
	}

	console.log('conexion a base de datos establecida...')
	

	app.listen(config.port,()=>{
	console.log(`Api Rest corriendo en http://localhost:${config.port}`);
});
})
