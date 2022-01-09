const Hospital = require("../models/hospital");
const Medico = require("../models/medico");
const Usuario = require("../models/usuario");

/* RegExp: Expresion regular para poder buscar por nombre, apellido o iniciales de texto 
-> nombre: nombre del usuario de busqueda de la BD
 */
const buscarAbc = async (req, res) => {
  const resultadoBusqueda = req.params.buscarXyz;
  const regex = new RegExp(resultadoBusqueda, "i");

  const [usuarioBuscado, medicoBuscado, hospitalBuscado] = await Promise.all([
    Usuario.find({ nombre: regex }),
    Medico.find({ nombre: regex }),
    Hospital.find({ nombre: regex }),
  ]);

  try {
    res.json({
      ok: true,
      usuarioBuscado,
      medicoBuscado,
      hospitalBuscado,
    });
  } catch (error) {
    console.log(error);

    res.status(400).json({
      ok: false,
      msg: "Hable con el Administrador",
    });
  }
};

/* Buscar por colecciones (U,M,H) =========================== */
const buscarColeccion = async (req, res) => {
  const tablaUMH = req.params.tabla;
  const buscarAbc = req.params.buscarXyz;
  const regex = new RegExp(buscarAbc, "i");

  let data = [];

  switch (tablaUMH) {
    case "medicos":
      data = await Medico.find({ nombre: regex })
                         .populate("idUsuario", "nombre img")
                         .populate("idHospital", "nombre img"); 
      break;

    case "hospitales":
      data = await Hospital.find({ nombre: regex }).populate("idUsuario", "nombre img");

      break;

    case "usuarios":
      data = await Usuario.find({ nombre: regex });

      break;

    default:
      return res.status(400).json({
        ok: false,
        msg: "La tabla a buscar tiene que ser: usuarios | médicos | hospitales",
      });
  }

  res.json({
    ok: true,
    resultados: data,
  });
};

module.exports = {
  buscarAbc,
  buscarColeccion,
};
