const bcrypt = require("bcryptjs");
const { googleVerify } = require("../helpers/google-verify");
const { generarJWT } = require("../helpers/jwt");

const Usuario = require("../models/usuario");

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    //Verificar email
    const usuarioDB = await Usuario.findOne({ email });

    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "Email no encontrado",
      });
    }

    //verificar contraseña
    const validPassword = bcrypt.compareSync(password, usuarioDB.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Contraseña no válida",
      });
    }

    //Generar el TOKEN -JWT
    const token = await generarJWT(usuarioDB.id);

    res.json({
      ok: true,
      token,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el Administrador",
    });
  }
};

const googleSingIn = async (req, res) => {
  const googleTOKEN = req.body.token;

  try {
    const { name, email, picture } = await googleVerify(googleTOKEN);

    //verificar si existe en BD y verificaremos si es la misma persona del email
    const usuarioDB = await Usuario.findOne({email});
    let usuarioNuevo;
    if (!usuarioDB) {
        usuarioNuevo = new Usuario({
            nombre: name,
            email,
            password:'@@@',
            img:picture,
            google: true
        })
    } else {
        //si existe el usuarioNuevo
        usuarioNuevo = usuarioDB;
        usuarioNuevo.google = true;
    }
    //guardamos el usuarioNuevo en la BD
    await usuarioNuevo.save();

    //Generar el TOKEN-JWT
    const token = await generarJWT(usuarioNuevo.id)

    res.json({
      ok: true,
      token,
      usuarioGOOGLE:usuarioNuevo.nombre

    });

  } catch (error) {
    res.status(401).json({
      ok: false,
      msg: "Token no es correcto",
    });
  }
};

/* RENOVAR TOKEN */
const renovarTOKEN = async (req,res)=>{
  const uid = req.uid;

  //Generar el TOKEN
  const tokenNUEVO = await generarJWT(uid)

  res.json({
    ok:true,
    msg:'El token se renovó con éxito',
    tokenNUEVO
  })
}

module.exports = {
  login,
  googleSingIn,
  renovarTOKEN
};
