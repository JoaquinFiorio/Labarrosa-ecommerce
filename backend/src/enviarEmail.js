const nodemailer = require("nodemailer");
require("dotenv").config()

const auth = {
    host: 'smtpout.secureserver.net',
    port: 465,
    secure: true,
    auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_PASSWORD
    }
};

const transporter = nodemailer.createTransport(auth);

function enviarLinkReset(email, id){
    const  mailOptions = {
        from: 'Recuperar Password <mi-empresa@gmail.com>',
        to:email,
        subject:"Instrucciones reseteo password",
        text: `Para resetear tu password, por favor hace click en este link: http://localhost:4200/reset/${id}`
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log('Error occurred. ' + err.message);
            return process.exit(1);
        }
    });
}

function enviarLinkVerificacion(email, id){
    const  mailOptions = {
        from: 'Verificación de Email HBM <mi-empresa@gmail.com>',
        to:email,
        subject:"Instrucciones Verificacion",
        text: `Para verificar tu email, por favor hace click en este link: http://localhost:4200/verificacion/${id}`
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log('Error occurred. ' + err.message);
            return process.exit(1);
        }
    });
}

module.exports = {
    enviarLinkReset,
    enviarLinkVerificacion
};