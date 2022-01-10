const res = require("express/lib/response");
const Hospital = require("../models/hospital");

/* OBTENER HOSPITAL ================================================ */
const obtenerHospitales = async (req, res) => {
  const hospitales = await Hospital.find()
                                   .populate('idUsuario','nombre img') //con populate podremos saber el NOMBRE y la IMG del usuaio que creo los Hospitales
  res.json({
    ok: true,
    hospitales,

  });
};

/* CREAR HOSPITAL ================================================ */
const crearHospital = async (req, res) => {
  const uid = req.uid;

  const hospital = new Hospital({
    idUsuario: uid,
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
const actualizarHospital = async (req, res) => {
  const idHosp = req.params.id;
  const uid = req.uid;

  try {
      const hospital  = await Hospital.findById(idHosp)

      if (!hospital) {
        return res.status(404).json({
          ok:true,
          msg:'No existe Hospital con ese ID en la BD'
        })
      }

      //hospital.nombre = req.body.nombre
      const cambiosHospital = {
        ...req.body,
        idUsuario:uid
      }

const hospitalActualizado = await Hospital.findByIdAndUpdate(idHosp, cambiosHospital, {new:true})
      res.json({
        ok: true,
        msg: ` '${hospital.nombre}' fue actualizado con éxito`,
        hospitalActualizado
      });
    
  } catch (error) {
    res.status(500).json({
      ok:false,
      msg:'Hable con el Administrador'
    })
  }
};

/* ELIMINAR HOSPITAL ================================================ */
const borrarHospital = async (req, res) => {
  const id = req.params.id;

  try {
    const hospital = await Hospital.findById(id);

    if (!hospital) {
      return res.status(404).json({
        ok:true,
        msg:'Hospital no encontrado con ese ID, en la BD'
      })
    }
    await Hospital.findByIdAndDelete(id)
  
    res.json({
      ok:true,
      msg: 'Hospital Eliminado'
    })

  } catch (error) {
  console.log(error)
  
  res.status(500).json({
    ok:false,
    msg:'Hable con el Admistrador'
  })
  }

  res.json({
    ok: true,
    msg:'No existe Hospital con ese ID en la BD'
  });

};

module.exports = {
  obtenerHospitales,
  crearHospital,
  actualizarHospital,
  borrarHospital,
};
