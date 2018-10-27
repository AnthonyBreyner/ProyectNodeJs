'use strict'
const Hour=require('../models/hours')
function getHour(req,res){
	let hourid=req.params.hourid

	Hour.findById(hourid, (err,hour)=>{
		if(err) return res.status(500).send({message:`Error al realizar la peticion: ${err}`})
		if(!hour) return res.status(404).send({message:"Esa hora no a sido agregada"})
		

		res.status(200).send({hour})	
	})
}

function getHours(req,res){
	Hour.find({}, (err,hours)=>{
		if(err) return res.status(500).send({message:`Error al realizar la peticion: ${err}`})
		if(!hours) return res.status(404).send({message:"No existen horas de trabajo"})
	
		res.send(200, {hours})
	})
}

function horasuser (req, res) { 
  Hour.find({ userid:req.body.userid}, (err, hours) => {
    if (err) return res.status(500).send({ message: err })
    if (!hours) return res.status(404).send({ message: 'No existe' })
 
    res.send(200, {hours})
  })
}

function saveHour(req,res){
	console.log('POST /api/hour')
	console.log(req.body)

	let hour= new Hour()
	hour.currenttime=req.body.currenttime
	hour.entrytime=req.body.entrytime
	hour.departuretime=req.body.departuretime
	hour.horapref=req.body.horapref
	hour.description=req.body.description
	hour.userid=req.body.userid


	hour.save((err,hoursStored)=>{
		if(err) res.status(500).send({message:`Error al salvar en la base de datos ${err}`})
		
		res.status(200).send({hour:hoursStored})
	})
}

function updateHour(req,res){
	let hourid=req.params.hourid
	let update=req.body
	console.log(hourid, update)


	Hour.findByIdAndUpdate(hourid, update, (err, hourUpdate)=>{
		if(err) res.status(500).send({message:`Error al actualizar ${err}`})

		res.status(200).send({message:`Horas actualizas ${hourUpdate}`})
	})
}

function deleteHour(req,res){
	let hourid=req.params.hourid

	Hour.findById(hourid, (err, hour)=>{
		if(err) res.status(500).send({message:`Erros al borrar ${err}`})
			
		hour.remove(err=>{
			if(err) res.status(500).send({message:`Error al borrar horas ${err}`})
			res.status(200).send({message:`Eliminado.`})
		})
	})
}

module.exports={
	getHour,
	getHours,
	saveHour,
	updateHour,
	deleteHour,
	horasuser
	
}
