const User = require("../models/user_model");

const registerUser = async (req, res) => {
  try {
    const { nombre, email, direccion, contraseña, celular, rol } = req.body;

    const user = new User({
      nombre,
      email,
      contraseña,
      direccion,
      celular,
      rol,
    });
    await user
      .save()
      .then((data) =>
        res.status(200).json({
          data,
        })
      )
      .catch((err) => res.json(err));
  } catch (error) {
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

const getUser = async (req, res) => {
  try {
    const { email, contraseña } = req.body;
    const { id_user } = req.query;

    if (id_user !== undefined) {
      let user = (await User.findOne({ _id: id_user })) || null;
      if (user === null) {
        return res.status(200).json({ msg: "Usuario no existe" });
      }

      return res.status(200).json(user);
    }

    if((email!==undefined) && (contraseña!==undefined)){
            let user = (await User.findOne({email})) || null;
            if(!user){
                return res.status(200).json({msg:"Usuario no existe"})
            }
            if(user.contraseña===contraseña){
                return res.status(200).json(user)
            }else{
                return res.status(200).json({msg:"Contraseña inválida"})
            }

            
        }
    res
      .status(200)
      .json({ msg: "No envió ningún parametro de busqueda válido" });
  } catch (error) {
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { nombre, contraseña, email, direccion, rol, celular } = req.body;
    const { id_user } = req.query;

    const u =
      (await User.updateOne(
        { _id: id_user },
        {
          nombre,
          contraseña,
          email,
          direccion,
          rol,
          celular,
        },
        { new: true }
      )) || null;

    if (u === null) {
      return res.status(500).json({ msg: "Error actualizando usuario" });
    }

    res.status(200).json(u);
  } catch (error) {
    res.status(500).json({ msg: "Error en el servidor" });
  }
};
const deleteUser = async (req, res) => {
  try {
    const { id_user } = req.query;
    await User.findByIdAndDelete(id_user)
      .then((data) => res.status(200).json(data))
      .catch((err) => {
        return res
          .status(400)
          .json({ success: false, msg: "Error eliminando usuario" });
      });
  } catch (error) {
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

module.exports = {
  registerUser,
  getUser,
  updateUser,
  deleteUser,
};
