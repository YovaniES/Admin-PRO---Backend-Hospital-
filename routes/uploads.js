const { Router } = require("express");
const fileUpload = require("express-fileupload");

const { validarJWT } = require("../middlewares/validar-jwt");
const {subirImg, obtenerImg} = require("../controllers/uploads");

const router = Router();

//middleware fileUpload que nos premite llamar files.imagen en el controlador
router.use(fileUpload());

router.put("/:tipoUMH/:id", validarJWT, subirImg);
router.get('/:tipo/:foto', obtenerImg)

module.exports = router;
