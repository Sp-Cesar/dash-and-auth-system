const express = require('express');
const app = express();

//var de sesiones SIEMPRE SE DEBE INSTANCIAR PRIMERO ANTES QUE CUALQIOER RUTA
const session = require('express-session');
app.use(session({
    secret:'secret',
    resave: false,
    saveUninitialized: false,
    cookie:{
        maxAge: null
    }
}));

//Presindible para el NO mostrar el login SI la session esta iniciado
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});

//seteamos urlencode -> capturar el formulario
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//Usar a las rutas
app.use('/', require('./routes/dashRoutes'))
//Invoca Template
app.set('view engine', 'ejs');

//Puerto
app.listen(3000, ()=>{
    console.log('El puerto se ejecuta http://localhost:3000');
});