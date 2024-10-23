const router = require("express").Router();
const {addEvent, allEvents, joinEvent, deleteEvent, getOneEvent} = require("../controllers/EventController")
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
router.get("/:eventId",getOneEvent);
// router.post("/addEvent",addEvent);
router.post("/addEvent", upload.single("image"), addEvent);
router.post('/join/:eventId', joinEvent);
router.delete("/delete/:eventId",deleteEvent);


module.exports = router;