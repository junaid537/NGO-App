var express = require('express');
var router = express.Router();
const { createUser , getWhetherUserAdmin} = require("../controllers/userController");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;


