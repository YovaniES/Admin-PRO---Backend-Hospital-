/* 
Path:'/api/login' + /renew
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { validarJWT } = require("../middlewares/validar-jwt");
const { login, googleSingIn, renovarTOKEN } = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.post(
  "/",
  [
    check("email", "El correo es obligatorio").isEmail(),
    check("password", "El password es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  login
);

router.post(
  "/google",
  [
    check("token", "El token de Google es Obligatorio").not().isEmpty(),
    validarCampos
  ],
  googleSingIn
);

router.get("/renovarTOKEN",
           validarJWT, 
           renovarTOKEN
           );

module.exports = router;
