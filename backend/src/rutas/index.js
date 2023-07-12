const { Router } = require("express");
require("../controladores/userController.js");
require("../controladores/authController.js");
const router = Router();

router.use((req, res, next) => {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

router.get("/", getUsers);

router.get("/:id", getUser)

router.post("/", createUser);

router.put("/user/:id", changeUserInfo)

router.post("/signup", signupHandler);

router.post("/signin", signinHandler);

router.put("/:id", verificacionEmail);

module.exports = router;