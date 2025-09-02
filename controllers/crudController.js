const conexion = require('../models/db');
const bcrypt = require('bcryptjs');

exports.register = async(req, res)=>{
    const nombre = req.body.nombre;
    const user = req.body.user;
    const pass = req.body.pass;
    const rol = req.body.rol;
    let passHaash = await bcrypt.hash(pass, 8);
    console.log('Hash generado para la contraseña:', passHaash);
    conexion.query('INSERT INTO usuarios SET ?', {nombre:nombre, user:user, pass:passHaash, rol:rol},(error,results)=>{
        if(error){
            console.log(error);
        }else{
            console.log('Usuario registrado con éxito:', results);
            res.redirect('/usuarios');
        }
    })
};

exports.update = async(req, res)=>{
    const id = req.body.id;
    const nombre = req.body.nombre;
    const user = req.body.user;
    const rol = req.body.rol;

    console.log('Datos recibidos para actualizar:', { id, nombre, user, rol });


    conexion.query('UPDATE usuarios SET ? WHERE id = ?', [{nombre:nombre, user:user, rol:rol}, id], (error, results)=>{
        if(error){
            console.log(error);
        }else{
            console.log('Usuario actualizado con éxito:');
            res.redirect('/usuarios');
        }
    })
}