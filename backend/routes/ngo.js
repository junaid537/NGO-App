const router = require("express").Router();
//const { hello } = require("../controllers/ngoController");
const { createNgo } = require("../controllers/ngoController");

router.put("/", createNgo);
//router.get("/", getNgo);

//router.put("/",updateUser);

module.exports = router;
