const mongoose = require('mongoose');

const verificacionEmailSchema = new mongoose.Schema(
    {
        id:String,
        email: String
    }
);

module.exports = mongoose.model('VerificacionEmail', verificacionEmailSchema);
