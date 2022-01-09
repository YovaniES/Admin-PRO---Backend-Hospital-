require('dotenv').config();
const express = require('express');
const {dbConnection} = require('./database/config')

const cors = require('cors');

/* Creamos el servicio de express */
const app = express();

//Configurar CORS - para peticiones
app.use(cors());

//Lecctura y parseo del BODY
app.use(express.json());


//Base de Datos
dbConnection();

//DIRECTORIO PÙBLICO
app.use(express.static('public'))

//R U T A S
app.use('/api/usuarios', require('./routes/usuarios'))
app.use('/api/hospitales', require('./routes/hospitales'))
app.use('/api/medicos',require('./routes/medicos'))
app.use('/api/todo', require('./routes/busquedas'))
app.use('/api/login', require('./routes/auth'))
app.use('/api/upload', require('./routes/uploads'))


app.listen(process.env.PORT, ()=>{
    console.log('Servidor corriendo en el puerto', + process.env.PORT)
})