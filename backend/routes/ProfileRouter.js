const router = require("express").Router();
const {getProfileDetails} = require("../controllers/ProfileController")

router.get("/",getProfileDetails);

module.exports = router;