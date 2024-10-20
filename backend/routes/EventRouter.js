const router = require("express").Router();
const {addEvent, allEvents, joinEvent, searchEvents} = require("../controllers/EventController")

router.get("/",allEvents);
router.post("/addEvent",addEvent);
router.post('/join/:eventId', joinEvent);


module.exports = router;