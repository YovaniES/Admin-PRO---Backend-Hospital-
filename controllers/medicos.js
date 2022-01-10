const { response } = require("express");
const Medico = require("../models/medico");

/* OBTENER MÉDICOS ====================================== */
const obtenerMedicos = async (req, res) => {
  const medicos = await Medico.find()
    .populate("idUsuario", "nombre img")
    .populate("idHospital", "nombre img");

  res.json({
    ok: true,
    medicos,
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
      msg: "Médico creado",
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
const actualizarMedico = async (req, res) => {
  //validamos el token
  const idMed = req.params.id;
  const uid = req.uid;

  try {
    const medicoDB = await Medico.findById(idMed);

    if (!medicoDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe Médico con ese ID en la BD",
      });
    }

    const cambiosMedico = {
      ...req.body,
      usuario:uid
    }

    //Actualizaciones de médico
    const medicoActualizado = await Medico.findByIdAndUpdate(idMed, cambiosMedico, {new:true});

    res.json({
      ok: true,
      msg: `El médico: '${medicoDB.nombre}' Se actualizó correctamente`,
      medicoActualizado,
    });


  } catch (error) {
    console.log("error");

    res.status(500).json({
      ok: false,
      msg: "Error inesperado, consulte con el Administrador",
    });
  }
};



/* ELIMINAR MÉDICOS ====================================== */
const eliminarMedico = async (req, res) => {
  const idMed = req.params.id

  try {
      const medicoDB=await Medico.findById(idMed)
      if (!medicoDB) {
        return res.status(404).json({
          ok:true,
          msg: "No existe Médico con ese ID en la BD",
        })
      }

      await Medico.findByIdAndDelete(idMed)
      res.json({
        ok:true,
        msg:`Medico: '${medicoDB.nombre}' fue eliminado de la BD con éxito.`
      })

  } catch (error) {
    
  }

};

module.exports = {
  obtenerMedicos,
  crearMedico,
  actualizarMedico,
  eliminarMedico,
};
