const Role = require("../modelos/Role.js");
const User = require("../modelos/usuario.js");
require("dotenv")

createRoles = async () => {
  try {
    // Count Documents
    const count = await Role.estimatedDocumentCount();

    // check for existing roles
    if (count > 0) return;

    // Create default Roles
    const values = await Promise.all([
      new Role({ name: "user" }).save(),
      new Role({ name: "moderator" }).save(),
      new Role({ name: "admin" }).save(),
    ]);
  } catch (error) {
    console.error(error);
  }
};

createAdmin = async () => {
  // check for an existing admin user
  const userFound = await User.findOne({ email: "joaquin.fiorio1@hotmail.com" });
  if (userFound) return;

  // get roles _id
  const roles = await Role.find({ name: { $in: ["admin", "moderator"] } });

  // create a new admin user
  const newUser = await User.create({
    nombre: "joaco",
    apellido: "Fiorio",
    pais: "Argentina",
    ciudad: "Pergamino",
    telefono: "+5492477358701",
    email: "joaquin.fiorio1@hotmail.com",
    password: "12345", // Corregido: la contraseña debe ser una cadena de texto
    direccion: "Dorrego 620",
    roles: roles.map((role) => role._id),
    verificado: true
  });
};

createRoles();
createAdmin();
