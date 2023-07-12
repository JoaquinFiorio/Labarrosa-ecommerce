const User = require("../modelos/usuario.js");
const Role = require("../modelos/Role.js");

createUser = async (req, res) => {
    try {
        const { nombre, apellido, pais, ciudad, telefono, email, password, roles } = req.body;
        const emailFound = await User.findOne({email})
        const telefonoFound = await User.findOne({telefono})
        const rolesFound = await Role.find({ name: { $in: roles } });
        
        if (emailFound) {
            return res.status(401).send({message: "Mail ya tiene una cuenta"})
        }
        if (telefonoFound) {
            return res.status(401).send({message: "Telefono ya en uso"})
        }

        // creating a new User
        const user = new User({
            nombre,
            apellido,
            pais,
            ciudad,
            telefono,
            email,
            password,
            roles: rolesFound.map((role) => role._id),
            verificado: true
        });

        // encrypting password
        user.password = await User.encryptPassword(user.password);

        // saving the new user
        const savedUser = await user.save();

        return res.status(200).json(savedUser);
    } catch (error) {
    console.error(error);
    }
};

getUsers = async (req, res) => {
    const users = await User.find();
    return res.json(users);
};

getUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    return res.json(user);
};

changeUserInfo = async (req, res) => {
    const { nombre, apellido, pais, ciudad, direccion, telefono } = req.body;
    
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        user.nombre = nombre;
        user.apellido = apellido;
        user.pais = pais;
        user.ciudad = ciudad;
        user.direccion = direccion;
        user.telefono = telefono;

        await user.save();

        res.status(200).json({ message: 'Información de usuario actualizada exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la información del usuario' });
    }
};