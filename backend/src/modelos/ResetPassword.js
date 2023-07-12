const mongoose = require('mongoose');
const { Schema } = mongoose;

const ResetSchema = new Schema({
    id:String,
    email: String
});

module.exports = mongoose.model('Reset', ResetSchema);