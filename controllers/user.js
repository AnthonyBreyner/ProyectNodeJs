'use strict'

const User = require('../models/user')
const service = require('../services')

function signUp (req, res) {
  const user = new User({
    email: req.body.email,
    displayName: req.body.displayName,
    address: req.body.address,
    mobile: req.body.mobile,
    password: req.body.password
  })

  user.save((err) => {
    if (err) return res.status(500).send({ message: `Error al crear el usuario: ${err}` })


    return res.status(201).send({ token: service.createToken(user) })
    res.status(200).send({message:"Se registro con exito"})
  })
}

function getUser(req,res){ 
  User.find({}, (err,users)=>{
    if(err) return res.status(500).send({message:`Error al realizar la peticion: ${err}`})
    if(!users) return res.status(404).send({message:"No existen horas de trabajo"})
  
    res.send(200, {users})
  })
}

function signIn (req, res) {
  User.findOne({ email:req.body.email, password:req.body.password}, (err, user) => {
    if (err) return res.status(500).send({ message: err })
    if (!user) return res.status(404).send({ message: 'No existe el usuario o clave incorrecta' })
 
    req.user = user
    res.status(200).send({
      message: 'Te has logueado correctamente',
      token: service.createToken(user),
      userid:user._id,
      perfil:user.perfil,
      name:user.email,
    })
  })
}

function updateUser(req,res){
  let userid=req.params.userid
  let update=req.body
  console.log(userid, update)


  User.findByIdAndUpdate(userid, update, (err, userUpdate)=>{
    if(err) res.status(500).send({message:`Error al actualizar ${err}`})

    res.status(200).send({message:`Usuario actualizado ${userUpdate}`})
  })
}

function deleteUser(req,res){
  let userid=req.params.userid

  User.findById(userid, (err, user)=>{
    if(err) res.status(500).send({message:`Error al borrar ${err}`})
      
    User.remove(err=>{
      if(err) res.status(500).send({message:`Error al borrar Usuraio ${err}`})
      res.status(200).send({message:`Eliminado.`})
    })
  })
}


module.exports = {
  signUp,
  getUser,
  signIn,
  updateUser,
  deleteUser
}
