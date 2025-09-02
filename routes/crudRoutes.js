const express = require('express');
const route = express.Router();
const conexion = require('../models/db')
const crudController = require('../controllers/crudController');

function cheackAuth(req, res, next){
    if(req.session.loggedin){
        next();
    }else{
        res.redirect('/');
    }
}

route.get('/create', cheackAuth, (req,res)=>{
    res.render('dash/users/create',{
        name:req.session.nombre
    });
})
route.get('/update/:id', cheackAuth, (req,res)=>{
    const id = req.params.id;
    conexion.query('SELECT * FROM usuarios WHERE id = ?',[id], (error, results)=>{
        if(error){
            console.log(error);
        }else{
            res.render('dash/users/edit',{
                user: results[0],
                name:req.session.nombre
            });
        }
    })
})
route.get('/delete/:id', cheackAuth ,(req, res)=>{
    const id = req.params.id;
    conexion.query('DELETE FROM usuarios WHERE id = ?',[id], (error, results)=>{
        if(error){
            console.log(error);
        }else{
            console.log('Usuario eliminado con éxito:', results);
            res.redirect('/usuarios');
        }
    });
})

route.post('/register', crudController.register);
route.post('/update', crudController.update);

module.exports = route;