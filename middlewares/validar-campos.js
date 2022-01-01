
const { validationResult } = require("express-validator");


const validarCampos = (req,res, next)=>{

  const Error = validationResult(req);

    if (!Error.isEmpty()) {
        return res.status(400).json({
          ok: false,
          Error: Error.mapped(),
        });
      }

      next()
}

module.exports = {
    validarCampos
}