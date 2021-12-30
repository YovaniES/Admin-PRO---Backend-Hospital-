const express = require('express')

require('dotenv').config();
const cors = require('cors')
const {dbConection} = require('./database/config')

/* Creamos el servicio de express */
const app = express();

//Configurar CORS - para peticiones
app.use(cors());


//Base de Datos
dbConection();


app.listen(process.env.PORT, ()=>{
    console.log('Servidor corriendo en el puerto', + process.env.PORT)
})