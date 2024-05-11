const bcrypt = require("bcryptjs");
const db = require("../config/connection");
const jwt = require("jsonwebtoken");

//Ver todos los Usuarios
module.exports.getUsers = async (req, res) => {

  const q = "SELECT * FROM yushu.users";

  db.query(q, (err,data)=>{
    if(err) return res.status(500).json(err)

    return res.status(200).json(data)
  });

}

//Registrar
module.exports.register = async (req, res) => {

  //Revisar si existe un registro con ese usuario
  const q = "SELECT * FROM yushu.users WHERE User = ? OR Ci = ?";

  db.query(q, [req.body.user, req.body.ci], (err, data)=>{
    if (data.length) return res.status(409).json("User already exist");

    //Encriptar la contraseña y crear el usuario
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.pass, salt);

    const u = ""
  })
}