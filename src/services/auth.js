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
  const q = "SELECT * FROM yushu.users WHERE User = ? OR Id = ?";

  db.query(q, [req.body.user, req.body.id], (err, data)=>{
    if(err) return res.json(err);

    if(data.length) return res.status(409).json("Usuario ya existe");

    //Encriptar la contraseña y crear el usuario
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.pass, salt);

    const u = "INSERT INTO yushu.users(Id, User, Pass, FirstName, SecondName,  FirstLastName, SecondLastName) VALUE (?)";

    const values = [
      req.body.id,
      req.body.user,
      hash,
      req.body.firstname,
      req.body.secondname,
      req.body.firstlastname,
      req.body.secondlastname,
    ]

    db.query(u, [values], (err, data)=>{
      if(err) return res.json(err);

      return res.status(201).json("Se ha creado el usuario con exito.");
    })
  })
}

//Autenticar
module.exports.login = async (req, res) => {

  //Chequear si el usuario existe
  const q = "SELECT * FROM yushu.users WHERE user = ?";

  db.query(q, [req.body.user], (err, data) => {
    if(err) return res.json(err);

    if(data.length === 0) return res.status(404).json("Usuario no existe o esta mal escrito");

    //Chequear si la contraseña esta correcta
    const isPasswordCorrect = bcrypt.compareSync(req.body.pass, data[0].Pass);

    if(!isPasswordCorrect) return res.status(400).json("Contraseña incorrecta");

    const token = jwt.sign({ id: data[0].id}, "jwtkey");
    const user = {
      user: req.body.user,
      token
    }

    res.cookie("access_token", token, {
      httpOnly: true,
    }).status(200).json(user);

  });
}

//Cerrar Sesion
module.exports.logout = (req, res) => {
  res.clearCookie("access_token", {
    sameSite: "none",
    secure: true
  }).status(200).json("Usuario ha cerrado sesion")
}

//Actualizar
module.exports.update = async (req, res) => {
  


}

//Eliminar
module.exports.deleteUser = async (req, res) => {

//Revisar si existe un registro con ese usuario
  const q = "SELECT * FROM yushu.users WHERE Id = ? OR User = ?";

  db.query(q, [req.body.user, req.body.id], (err, data)=>{

    if(err) return res.json(err);

    if(data.length === 0) return res.status(409).json("Usuario no existe o esta mal escrito");

    //Eliminar usuario
    const u = "DELETE FROM yushu.users WHERE Id = ? AND User = ?";

    db.query(u, [req.body.id, req.body.user], (err, data) => {
      if(err) return res.status(403).json("Nose pudo eliminar el usuario");

      return res.status(201).json("Usuario se ha eliminado correctamente");
    })
  })
}
