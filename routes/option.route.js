const express = require("express");
const router = express.Router();
const optionController = require("../controllers/option.controller");
const mongoose = require('mongoose');
const validateObjectId = (req, res, next) => {
    const optionId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(optionId)) {
        return res.status(400).json({
            error: "Invalid option ID",
        });
    }
    next();
};

router.get("/", optionController.viewAll);
router.get("/:id", validateObjectId, optionController.view);
router.post("/:id/add_vote", validateObjectId, optionController.addVote);
router.delete("/:id/delete", validateObjectId, optionController.destroy);

module.exports = router;
