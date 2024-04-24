const bcrypt = require("bcryptjs");
const db = require("../config/connection");
const jwt = require("jsonwebtoken");

//Ver todos los Usuarios
module.exports.getUsers = async (req, res) => {

  db.query('SELECT * FROM yushu.users', (err,data)=>{
    if(err) return res.status(500).json(err)

    return res.status(200).json(data)
  });

}

//Registrar
module.exports.register = async (req, res) => {

    const userfind = await User.findOne({email: req.body.email});
    try {
        if(userfind){
          res.status(404).json("User already exist");
        } else{
          const salt = bcrypt.genSaltSync(10);
          const hash = bcrypt.hashSync(req.body.pass, salt);
  
          const user = new User({
            name: req.body.name,
            email: req.body.email,
            pass: hash,
            created_at: req.body.created_at
          });
  
          const inserteduser = await user.save();
          res.status(201).json(inserteduser);
          
        }
    } catch (error) {
        res.status(400).json({message: error.message});
    }
  }