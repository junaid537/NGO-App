const router = require("express").Router();
const { hello } = require("../controllers/dC");

router.get("/", hello);

//router.put("/",updateUser);

module.exports = router;
