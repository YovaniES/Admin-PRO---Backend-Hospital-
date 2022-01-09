/* 
ruta: api/todo/:busqueda
*/

const { Router } = require("express");
const { validarJWT } = require("../middlewares/validar-jwt");
const {buscarAbc, buscarColeccion} = require("../controllers/busquedas");

const router = Router();

/* buscarXyz: para buscar usuario, medicos, hospital
   coleccion/tabla/buscarXyz: para buscar en cada coleccion 
   
*/
router.get("/:buscarXyz", [validarJWT], buscarAbc);

router.get("/coleccion/:tabla/:buscarXyz", validarJWT, buscarColeccion)


module.exports = router;
