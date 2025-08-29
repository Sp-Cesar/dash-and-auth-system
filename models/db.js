const mysqsl = require('mysql');

const conexion = mysqsl.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dbdash'
});

conexion.connect((error)=>{
    if(error){
        console.log(error);
        return;
    }else{
        console.log('se conecto correctamente de DB!!!');
    }
});

module.exports = conexion;