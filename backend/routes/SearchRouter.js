const router = require("express").Router();
const {searchEvents} = require("../controllers/SearchController");

router.get('/', searchEvents);

module.exports = router;