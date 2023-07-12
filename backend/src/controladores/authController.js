const jwt = require("jsonwebtoken");
const User = require("../modelos/usuario.js");
const Role = require("../modelos/Role.js");
const Reset = require("../modelos/ResetPassword.js")
const VerificacionEmail = require("../modelos/VerificacionEmail.js")
const { enviarLinkReset, enviarLinkVerificacion } = require("../enviarEmail.js")
const bcrypt = require("bcryptjs")
const { v1: uuidv1 } = require('uuid');
require("dotenv").config()

signupHandler = async (req, res) => {
    try {
        const { nombre, apellido, pais, ciudad, telefono, email, password, roles } = req.body;
        const emailFound = await User.findOne({email})
        const telefonoFound = await User.findOne({telefono})
        
        if (emailFound) {
            return res.status(401).send({message: "Mail ya tiene una cuenta"})
        }
        if (telefonoFound) {
            return res.status(401).send({message: "Telefono ya en uso"})
        }

        // Creating a new User Object
        const newUser = new User({
            nombre,
            apellido,
            pais,
            ciudad,
            telefono,
            email,
            password,
            verificado: false
        });

        // checking for roles
        if (roles) {
            const foundRoles = await Role.find({ name: { $in: roles } });
            newUser.roles = foundRoles.map((role) => role._id);
        } else {
            const role = await Role.findOne({ name: "user" });
            newUser.roles = [role._id];
        }

        // Creating verificacion model
        const idVerificacion = uuidv1();
        const verificacion = new VerificacionEmail({id: idVerificacion, email: req.body.email});
        await verificacion.save();
        enviarLinkVerificacion(req.body.email, idVerificacion);

        // Saving the User Object in Mongodb
        const savedUser = await newUser.save();

        // Create a token
        const token = jwt.sign({ id: savedUser._id }, process.env.SECRET, {
            expiresIn: 86400, // 24 hours
        });

        return res.status(200).json({ token });
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

signinHandler = async (req, res) => {
    try {
        // Request body email can be an email or nombre
        const userFound = await User.findOne({ email: req.body.email }).populate(
            "roles"
        );

        if (!userFound) return res.status(400).json({ message: "User Not Found" });

        const matchPassword = await User.comparePassword(
            req.body.password,
            userFound.password
        );

        if (!matchPassword)
            return res.status(401).json({
                token: null,
                message: "Invalid Password",
            });

        const token = jwt.sign({ id: userFound._id }, process.env.SECRET, {
            expiresIn: 86400, // 24 hours
        });

        res.json({ token, userFound });
    } catch (error) {
        console.log(error);
    }
};

verificacionEmail = async (req, res) => {
    const { id } = req.params;

    const userReset =  await VerificacionEmail.findOne({ id });

    if(!userReset) return res.status(400).send({message: "Usuario no encontrado"});

    const user = await User.findOne({ email: userReset.email });

    if(user.verificado === true) return res.status(400).send({message: "Usuario ya esta verificado"});

    await User.findOneAndUpdate({ _id : user.id}, {verificado : true}, { new: true });
    await VerificacionEmail.findOneAndDelete({ id });
    return res.status(200).send({message: "Email verificado correctamente"})
};

forgot = async (req, res) => {
    const { email } = req.body;
    const userFound = await User.findOne({ email });
    
    if(!userFound) return res.status(400).send({message: "no se encontro el usuario"});

    const id = uuidv1();
    const request = new Reset({id: id, email: req.body.email});
    await request.save()
    enviarLinkReset(userFound.email, id)
    res.status(200).send({message: "email mandado con exito. ID: " + id})
}

resetPassword = async (req, res) => {
    const { id } = req.params;

    const userReset =  await Reset.findOne({ id })

    if(!userReset) return res.status(400).send({message: "Usuario no encontrado"})

    const user = await User.findOne({ email: userReset.email })

    bcrypt.hash(req.body.password, 10).then( async (hashed) =>{
        await User.findOneAndUpdate({ _id : user.id}, {password : hashed}, { new: true })
        await Reset.findOneAndDelete({ id });
        return res.status(200).send({message: "Contraseña cambiada correctamente"})
    })

}