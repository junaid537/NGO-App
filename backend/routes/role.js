
const router = require("express").Router();
const { getRole} = require("../controllers/roleController");

console.log("inside role router")
router.get("/", getRole);

module.exports = router;