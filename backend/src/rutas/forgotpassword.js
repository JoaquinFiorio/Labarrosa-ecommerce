const { Router } = require("express");
require("../controladores/authController.js");
const router = Router();

router.use((req, res, next) => {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

router.post("/", forgot);

router.put("/:id", resetPassword)

module.exports = router;