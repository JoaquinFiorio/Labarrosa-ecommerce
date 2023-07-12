const jwt = require("jsonwebtoken");
const User = require("../modelos/usuario");
const Role = require("../modelos/Role");
require("dotenv").config()

verifyToken = async (req, res, next) => {
    const token = req.headers["x-access-token"];
    if (!token) return res.status(401).send({ message: "No token provided" });
    try {
        req.token = token
        const decoded = jwt.verify(token, process.env.SECRET);
        req.userId = decoded.id;
        const user = await User.findById(req.userId, {password: 0});
        if(!user) {
            return res.status(404).json({message: 'Invalid or expired token'});
        }

        next();
    } catch (err) {
        return res
        .status(500)
        .send({ error:'Unauthorized' })
    }
}

isModerador = async (req, res, next) => {
    const user = await User.findById(req.userId);
    const role = await Role.find({_id: {$in: user.roles}})
    for (let i = 0; i < role.length; i++) {
        if(role[i].name === "moderator") {
            next();
            return;
        }
    }
    return res.satus(403).json({message: "Moderator role required"})
}