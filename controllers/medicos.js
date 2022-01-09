const { response } = require("express");
const Medico = require("../models/medico");

/* OBTENER MÉDICOS ====================================== */
const obtenerMedicos = async (req, res) => {
  const medicos = await Medico.find()
                              .populate('idUsuario', 'nombre img')
                              .populate('idHospital', 'nombre img')
                              
  res.json({
    ok: true,
    medicos
  });
};



/* CREAR MÉDICOS ====================================== */
const crearMedico = async (req, res = response) => {
  const uid = req.uid;
  const medico = new Medico({
    idUsuario: uid,
    ...req.body,
  });

  try {
    const medicoDB = await medico.save();
    res.json({
      ok: true,
      msg:'Médico creado',
      medico: medicoDB,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el Administrador",
    });
  }
};

/* ACTUALIZAR MÉDICOS ====================================== */
const actualizarMedico = (req, res) => {
  res.json({
    ok: true,
    msg: "Se actualizó el médico",
  });
};

/* ELIMINAR MÉDICOS ====================================== */
const eliminarMedico = (req, res) => {
  res.json({
    ok: true,
    msg: "Se eliminó el médico con éxito",
  });
};

module.exports = {
  obtenerMedicos,
  crearMedico,
  actualizarMedico,
  eliminarMedico,
};
