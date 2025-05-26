import User from "../models/User.js";

// Obtener todos los usuarios
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuarios", error: error.message });
  }
};

// Obtener usuario por ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error al buscar usuario", error: error.message });
  }
};

// Actualizar usuario por ID
export const updateUser = async (req, res) => {
  try {
    const { name, lastname, email } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, lastname, email },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser)
      return res.status(404).json({ message: "Usuario no encontrado" });

    res.status(200).json({ message: "Usuario actualizado", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar usuario", error: error.message });
  }
};

// Eliminar usuario por ID
export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser)
      return res.status(404).json({ message: "Usuario no encontrado" });
    res.status(200).json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar usuario", error: error.message });
  }
};
