const mongoose = require('mongoose')

const dbConection = async() =>{
    try {
        await mongoose.connect(process.env.BD_CNN, {
            useNewUrlParser:true,
            useUnifiedTopoLogy:true,
            useCreateIndex:true
        }
        )
    } catch (error) {
        console.log(error)
        throw new Error('Error a la hora de iniciar la BD, ver logs')
    }
}

module.exports = {
    dbConection
}