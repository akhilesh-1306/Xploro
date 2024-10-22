const router = require("express").Router();
const {addUserInteraction,triggerRecommendation} = require("../controllers/UserInteractionController");

router.post("/interaction",addUserInteraction);
router.post("/recommendation",triggerRecommendation);

module.exports = router;