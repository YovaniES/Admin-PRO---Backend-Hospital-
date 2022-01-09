const mongoose = require('mongoose');
 
const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN, {
      keepAlive: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      //useFindAndModify: false,
      //useCreateIndex: true,
    });
    console.log("Base de Datos: \x1b[32m%s\x1b[0,", "O N L I N E");
 
    //console.log('DB Online');
  } catch (error) {
    console.log(error);
    throw new Error('E R R O R, a la hora de iniciar la BD ver logs');
  }
};
 
module.exports = {
  dbConnection,
};

