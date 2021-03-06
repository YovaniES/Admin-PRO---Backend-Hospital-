/* 
Ruta: /api/usuarios
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");

const {obtenerUsuarios, crearUsuarios, actualizarUsuario, borrarUsuario} = require("../controllers/usuarios");

const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router()

router.get("/",validarJWT, obtenerUsuarios);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    validarCampos,
  ],
  crearUsuarios
);

router.put("/:id",
  validarJWT,
  [
    check("nombre", "El nombre del Usuario es obligatorio").not().isEmpty(),
    check("email", "El correo del Usuario es obligatorio").isEmail,
    check("role", "El rol es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  actualizarUsuario
);

router.delete("/:id",
  validarJWT,
  borrarUsuario
);

module.exports = router;
