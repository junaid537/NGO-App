const router = require("express").Router();
const { createEvent , getEventsWithUncompletedStatus,getdueDate,deleteEvent} = require("../controllers/eventController");

router.post("/", createEvent);
router.get("/:eventId",getdueDate);
router.get("/", getEventsWithUncompletedStatus);
router.delete("/:eventId",deleteEvent)
module.exports = router;


/**var express = require('express');
var router = express.Router();

/* GET home page. 
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
  });
  
  module.exports = router; */