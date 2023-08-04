const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home.controller");

router.get("/", homeController.home);
router.use("/questions", require("./question.route"));
router.use("/options", require("./option.route"));

module.exports = router;
