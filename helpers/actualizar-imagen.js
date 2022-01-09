const fs = require("fs");

const Medico = require("../models/medico");
const Hospital = require("../models/hospital");
const Usuario = require("../models/usuario");

const borrarImg = (path) => {
  if (fs.existsSync(path)) {
    //si existe borramos la imagen anterior del directorio com unlinkSync sincronizado
    fs.unlinkSync(path);
  }
};

const actualizarImg = async (tipo, id, nombreImgGenerado) => {
  
    let pathViejo = "";
  switch (tipo) {
    case "medicos":
      const medico = await Medico.findById(id);
      if (!medico) {
        console.log("OJO...! El ID del Médico es incorrecto.");
        return false;
      }

      pathViejo = `./uploads/medicos/${medico.img}`;
      borrarImg(pathViejo);

      medico.img = nombreImgGenerado;
      await medico.save();
      return true;

      break;

    case "hospitales":
      const hospital = await Hospital.findById(id);
      if (!hospital) {
        console.log("OJO...! El ID del Hospital es incorrecto.");
        return false;
      }

      pathViejo = `./uploads/hospitales/${hospital.img}`;
      borrarImg(pathViejo);

      hospital.img = nombreImgGenerado;
      await hospital.save();
      return true;

      break;

    case "usuarios":
      const usuario = await Usuario.findById(id);
      if (!usuario) {
        console.log("OJO...! El ID del Usuario es incorrecto.");
        return false;
      }

      pathViejo = `./uploads/usuarios/${usuario.img}`;
      borrarImg(pathViejo);

      usuario.img = nombreImgGenerado;
      await usuario.save();
      return true;
      break;

    default:
      break;
  }
};

module.exports = {
  actualizarImg,
};
