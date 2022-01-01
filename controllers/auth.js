const bcrypt = require("bcryptjs/dist/bcrypt");
const req = require("express/lib/request");
const res = require("express/lib/response");
const { generarJWT } = require("../helpers/jwt");
const Usuario = require("../models/usuario");

const login = async(req,res) =>{
    const {email, password} = req.body;
    try {
        //Verificar email
        const usuarioDB = await Usuario.findOne({email});

        if (!usuarioDB) {
            return res.status(400).json({
                ok:false,
                msg:'Email no encontrado'
            })
        }

        //verificar contraseña
        const validPassword = bcrypt.compareSync(password, usuarioDB.password)
        if (!validPassword) {
            return res.status(400).json({
                ok:false,
                msg:'Contraseña no válida'
            })
        }


        //Generar el TOKEN -JWT
        const token = await generarJWT(usuarioDB.id)

        res.json({
            ok:true,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el Administrador'
        })
    }
}

module.exports = login