const router = require("express").Router();
const {createUser, getWhetherUserAdmin} = require("../controllers/userController");
//const {getRole}=require("../auth-middleware.js");


router.post("/", createUser);
router.get("/", getWhetherUserAdmin);
//router.get("/role",getRole)
module.exports = router;


