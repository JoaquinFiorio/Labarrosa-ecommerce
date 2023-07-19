const { Router } = require("express");
require("../controladores/mercadoPago.js");
const router = Router();
require("../libs/middlewares")

// routes

router.post("/createOrder", verifyToken, crearOrden);

router.get("/success", ordenExitosa);

router.get("/failure", ordenExitosa);

router.post("/resultado", recibirOrden);

module.exports = router