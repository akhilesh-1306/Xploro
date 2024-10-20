const router = require("express").Router();
const {getProfileDetails, updateProfileDetails, changePassword} = require("../controllers/ProfileController")

router.get("/",getProfileDetails);
router.put("/update",updateProfileDetails);
router.put("/change-password",changePassword);

module.exports = router;