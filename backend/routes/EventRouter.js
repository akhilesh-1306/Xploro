const router = require("express").Router();
const {addEvent, allEvents, joinEvent, searchEvents} = require("../controllers/EventController")
const multer = require("multer");
// const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/"); // Ensure this directory exists
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    }
  });
  
  // File upload middleware
  const upload = multer({ storage });

router.get("/",allEvents);
// router.post("/addEvent",addEvent);
router.post("/addEvent", upload.single("image"), addEvent);
router.post('/join/:eventId', joinEvent);


module.exports = router;