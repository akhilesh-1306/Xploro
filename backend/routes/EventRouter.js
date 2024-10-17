const router = require("express").Router();
const {addEvent, allEvents, joinEvent} = require("../controllers/EventController")

router.get("/",allEvents);
router.post("/addEvent",addEvent);
router.post("/joinEvent",joinEvent);

module.exports = router;