const { v4: uuidv4 } = require("uuid");
const { actualizarImg } = require("../helpers/actualizar-imagen");
const { validarMongoId } = require("../middlewares/validar-mongoId");

const path = require('path');
const fs = require('fs')

//router.put('/:tipoUMH/:id', validarJWT,subirImg)
const subirImg = (req, res) => {
  const tipo = req.params.tipoUMH;
  const id   = req.params.id;

  //validar tipo de archivo a subir
  const tipoUMHValidos = ["usuarios", "medicos", "hospitales"];

  if (!tipoUMHValidos.includes(tipo)) {
    return res.status(400).json({
      ok: false,
      msg: "El 'tipo' debe de ser: medicos, usuarios, hospitales",
    });
  }

  //validamos si existe un archivo
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      ok: false,
      msg: "No hay ningún archivo seleccionado",
    });
  }

  //Procesamos la Imagen
  const file = req.files.imagen;
  const nombreCortado = file.name.split("."); //iamgenx.3.a.jpg ->cortamos el jpg

  extensionImg = nombreCortado[nombreCortado.length - 1].toLowerCase() ;;

  //validamos la extensión
  const extensionesValidas = ["png", "jpg", "jpeg", "gif"];
  if (!extensionesValidas.includes(extensionImg)) {
    return res.status(400).json({
      ok: false,
      msg: "No es una imagen con extension válida",
    });
  }

  //Generar el nombre del archivo
  const nombreImgGenerado = `${ uuidv4() }.${extensionImg}`;


  //creamos el Path donde vamos a guardar las imagenes UMH
  const path = `./uploads/${tipo}/${nombreImgGenerado}`


  //mover la imagen a su directivo correspondiente
  file.mv(path, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        ok: false,
        msg: "Error al mover la Imagen",
      });
    }

    //Actualizar BASE DE DATOS, se borra la img anterior UMH
    if (!validarMongoId(id)) {
      return res.status(400).json({
        ok:false,
        msg:'ERROR!!! El ID ingresado tiene que ser tipo MongoId'
      })
    }

    actualizarImg(tipo, id, nombreImgGenerado)

    res.json({
      ok: true,
      msg:`Imagen de '${tipo}' subido y actualizado con éxito`,
      nombreImgGenerado,
    });
  });
};


const obtenerImg = (req,res)=>{
  const tipo = req.params.tipo
  const foto = req.params.foto;

  const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`)
  //Imagen por Defecto
 if (fs.existsSync(pathImg)) {
   res.sendFile(pathImg)
 }else{
   const pathImg = path.join(__dirname,`../uploads/no-imagen.png`)
   res.sendFile(pathImg)
 }
  
}

module.exports = {
  subirImg,
  obtenerImg
};
