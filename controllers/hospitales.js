const res = require("express/lib/response");
const Hospital = require("../models/hospital");

/* OBTENER HOSPITAL ================================================ */
const obtenerHospitales = async (req, res) => {
  const hospitales = await Hospital.find()
                                   .populate('usuario','nombre img') //con populate podremos saber el NOMBRE y la IMG del usuaio que creo los Hospitales
  res.json({
    ok: true,
    hospitales,

  });
};

/* CREAR HOSPITAL ================================================ */
const crearHospital = async (req, res) => {
  const uid = req.uid;

  const hospital = new Hospital({
    usuario: uid,
    ...req.body,
  });

  try {
    const hospitalDB = await hospital.save();

    res.json({
      ok: true,
      hospital: hospitalDB,
    });

  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Hable con el Administrador e intentelo nuevamente",
    });
  }
};

/* ACTUALIZAR HOSPITAL ================================================ */
const actualizarHospital = (req, res) => {
  res.json({
    ok: true,
    msg: "Hospital actualizado",
  });
};

/* ELIMINAR HOSPITAL ================================================ */
const borrarHospital = (req, res) => {
  res.json({
    ok: true,
    msg: "Hospital eliminado",
  });
};

module.exports = {
  obtenerHospitales,
  crearHospital,
  actualizarHospital,
  borrarHospital,
};
