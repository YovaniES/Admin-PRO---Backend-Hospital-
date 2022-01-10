/* 
Ruta: /api/medicos
*/

const { Router } = require("express");
const { check } = require("express-validator");
const {
  obtenerMedicos,
  crearMedico,
  actualizarMedico,
  eliminarMedico,
} = require("../controllers/medicos");

const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.get("/", obtenerMedicos);

router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre del médico es obligatorio").not().isEmpty(),
    check("idHospital", "El ID del hospital debe de ser válido").isMongoId(),
    check("idHospital", "El ID del hospital es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  crearMedico
);

router.put(
  "/:id",
  [
    validarJWT,
    check("nombre", "El nombre del Médico es necesario para su actualización").not().isEmpty(),
    check("idHospital", "El ID del Hospital es necesario en el Body"),
    validarCampos,
  ],
  actualizarMedico
);

router.delete("/:id", eliminarMedico);

module.exports = router;
