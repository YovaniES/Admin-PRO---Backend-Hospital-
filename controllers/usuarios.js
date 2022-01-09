const bcrypt = require("bcryptjs");
const { json } = require("express/lib/response");
const { generarJWT } = require("../helpers/jwt");

const Usuario = require("../models/usuario");

/* OBETNER USUARIO ======================================== 
-skip: para saltar la paginacion
- limit: para mostrar la cantidad de usuarios -> desde+5
- promise.all -> para ejecutar las 2 promesas de manera simultanea
*/
const obtenerUsuarios = async (req, res) => {
  const desde = Number(req.query.desde) || 0;


 const [listaUsuarios , totalUsuarios] =await Promise.all([
    Usuario.find({}, "nombre email role google img")
           .skip(desde)
           .limit(5)
    ,
    Usuario.countDocuments()
  ])

  
  res.json({
    ok: true,
    listaUsuarios,

    uid: req.uid,
    totalUsuarios
  });
};

/* CREAR USUARIO ======================================== */
const crearUsuarios = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existeEmail = await Usuario.findOne({ email });

    if (existeEmail) {
      return res.status(400).json({
        ok: false,
        msg: "El correo ya está registrado en la BD",
      });
    }
    const usuario = new Usuario(req.body);

    //Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    //Guardar usuario
    await usuario.save();

    //Generar el TOKEN -JWT
    const token = await generarJWT(usuario.id);

    res.json({
      ok: true,
      usuario,
      token,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado...! Revisar logs",
    });
  }
};

/* ACTUALIZAR USUARIO======================================== */
const actualizarUsuario = async (req, res) => {
  //TODO: Validar TOKEN y comprobar si el usuario es correcto
  const uid = req.params.id;

  try {
    const usuarioDB = await Usuario.findById(uid);
    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe usuario con ese ID",
      });
    }

    //Actualizaciones
    const { password, google, email, ...campos } = req.body;

    if (usuarioDB.email !== email) {
      const existeEmail = await Usuario.findOne({ email });

      if (existeEmail) {
        return res.status(400).json({
          ok: false,
          msg: "Ya existe un Usuario con ese email",
        });
      }
    }

    campos.email = email;
    const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {new: true});

    res.json({
      ok: true,
      usuario: usuarioActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};

/* ELIMINAR USUARIO ========================================*/
const borrarUsuario = async (req, res) => {
  const uid = req.params.id;

  try {
    const usuarioDB = await Usuario.findById(uid);

    if (!usuarioDB) {
      return res.status(400).json({
        ok: false,
        msg: "No existe usuario con ese ID",
      });
    }

    await Usuario.findByIdAndDelete(uid);

    res.json({
      ok: true,
      msg: `Usuario: ${usuarioDB.nombre}; Eliminado`,
    });
  } catch (error) {
    console.log(error);
    res.status(500),
      json({
        ok: false,
        msg: "Hable con el Administrador",
      });
  }
};

module.exports = {
  obtenerUsuarios,
  crearUsuarios,
  actualizarUsuario,
  borrarUsuario,
};
