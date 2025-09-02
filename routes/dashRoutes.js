const express = require('express');
const route = express.Router();
const conexion = require('../models/db')
const loginController = require('../controllers/loginController');

function cheackAuth(req, res, next){
    if(req.session.loggedin){

        next();
    }else{
        res.redirect('/');
    }
}
function redirigirSiLogueado(req, res, next) {
  if (req.session.loggedin) {
    res.redirect('/dash');
  }else{
    next();
  }
}


route.get('/', redirigirSiLogueado,(req, res)=>{
    res.render('auth/login', { datosErrore: '' });
    
}); 

route.get('/dash',cheackAuth, (req, res)=>{
    res.render('dash/dash',{
        login:true,
        name:req.session.nombre
    });
    
}); 

route.get('/productos', cheackAuth ,(req, res)=>{
    conexion.query('SELECT * FROM productos', (error, results)=>{
        if(error){
            throw error;
        }else{
            res.render('dash/products/products',{
                name:req.session.nombre,
                resultado:results
            });
        }
    });
});

route.get('/detalle/:id', cheackAuth ,(req, res)=>{
    const id = req.params.id;
    conexion.query('SELECT * FROM productos WHERE id = ?',[id], (error, results)=>{
        if(error){
            throw error;
        }else{
            res.render('dash/products/detail',{
                name:req.session.nombre,
                producto:results[0]
            });
        }
    })
});

route.get('/usuarios', cheackAuth ,(req, res)=>{
    conexion.query('SELECT * FROM usuarios', (error, results)=>{
        if(error){
            throw error;
        }else{
            res.render('dash/users/users',{
                name:req.session.nombre,
                resultado:results
            });
        }
    });
});


route.get('/logout', (req, res)=>{
    req.session.destroy(()=>{
        res.redirect('/');
    });
});


route.post('/auth', loginController.auth);

module.exports = route;