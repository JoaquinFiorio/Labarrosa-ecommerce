const express = require('express');
const cors = require("cors")
const helmet = require("helmet")
const path = require('path');
const morgan = require("morgan");
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
require('./database');
require("./libs/initialSetup");

//configuraciones
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(cors())
app.use(helmet());

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(session({
    secret:'misessionsecreta',
    resave:true,
    saveUninitialized:true
}));

//rutas
app.use('/api/user', require('./rutas/index'));
app.use('/api/forgot', require('./rutas/forgotpassword'))
app.use('/api/pedidos', require('./rutas/manejarPedidos'))
app.use('/api/pagar', require('./rutas/mercadoPago'))

app.listen(app.get('port'), () => {
    console.log('Servidor en puerto', app.get('port'));
});

