const express = require('express');
const {dbConnection} = require('./database/config')

require('dotenv').config();
const cors = require('cors');

/* Creamos el servicio de express */
const app = express();

//Configurar CORS - para peticiones
app.use(cors());

//Lecctura y parseo del BODY
app.use(express.json());


//Base de Datos
dbConnection();

//R U T A S
app.use('/api/usuarios', require('./routes/usuarios'))
app.use('/api/login', require('./routes/auth'))


app.listen(process.env.PORT, ()=>{
    console.log('Servidor corriendo en el puerto', + process.env.PORT)
})