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
route.get('/logout', (req, res)=>{
    req.session.destroy(()=>{
        res.redirect('/');
    });
});


route.post('/auth', loginController.auth);

module.exports = route;