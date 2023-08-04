const express = require("express");
const router = express.Router();
const questionController = require("../controllers/question.controller");
const mongoose = require('mongoose');
const validateObjectId = (req, res, next) => {
    const questionId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(questionId)) {
        return res.status(400).json({
            error: "Invalid question ID",
        });
    }
    next();
};
router.get("/", questionController.viewAll);
router.post("/create", questionController.create);
router.get("/:id", validateObjectId, questionController.view);
router.post("/:id/options/create", validateObjectId, questionController.createOption);
router.delete("/:id/delete", validateObjectId, questionController.destroy);

module.exports = router;
