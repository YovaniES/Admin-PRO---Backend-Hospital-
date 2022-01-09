const mongoose = require('mongoose')

const validarMongoId = (mongoId)=>{
    return mongoose.Types.ObjectId.isValid(mongoId)
}

module.exports = {
    validarMongoId
}