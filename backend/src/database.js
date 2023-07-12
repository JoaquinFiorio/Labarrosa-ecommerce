const mongoose = require('mongoose');
require("dotenv").config()

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true , useUnifiedTopology: true})
.then(() => console.log('La base de datos está conectada') )
.catch(err => console.error(err));