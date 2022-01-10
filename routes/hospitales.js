/* ruta:'/api/hospitales' */

const { Router } = require("express");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const router = Router();

const {
  actualizarHospital,
  borrarHospital,
  crearHospital,
  obtenerHospitales,
} = require("../controllers/hospitales");
const { check } = require("express-validator");

router.get("/", obtenerHospitales);

router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre del Hospital es necesario").not().isEmpty(),
    validarCampos,
  ],
  crearHospital
);

router.put("/:id", 
          [
            validarJWT,
            check('nombre','El nombre del Hospital es necesario').not().isEmpty(),
            validarCampos
          ], actualizarHospital);

router.delete("/:id", borrarHospital);

module.exports = router;
