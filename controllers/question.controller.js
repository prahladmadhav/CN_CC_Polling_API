const Question = require("../models/question.model");
const Option = require("../models/option.model");

const getOptionsData = (options) => {
    optionsResult = [];
    options.forEach((option) => {
        optionsResult.push({
            id: option.id,
            text: option.text,
            votes: option.votes,
            link_to_vote: `https://localhost:8000/options/${option.id}/add_vote`,
        });
    });
    return optionsResult;
};

module.exports.viewAll = async (req, res) => {
    try {
        let tempQuestions = await Question.find({}).populate("options");
        let questions = [];
        if (tempQuestions) {
            tempQuestions.forEach((question) => {
                questions.push({
                    id: question.id,
                    title: question.title,
                    options: getOptionsData(question.options),
                });
            });
            return res.status(200).json(questions);
        } else {
            return res.status(200).json([]);
        }
    } catch (err) {
        console.log(`Error: ${err}`);
        return res.status(500).json({
            error: `Error: ${err}`,
        });
    }
};
module.exports.view = async (req, res) => {
    try {
        let tempQuestion = await Question.findById(req.params.id).populate("options");
        if (tempQuestion) {
            tempQuestion;
            let question = {
                id: tempQuestion.id,
                title: tempQuestion.title,
                options: getOptionsData(tempQuestion.options),
            };
            return res.status(200).json(question);
        } else {
            return res.status(400).json({
                error: "No question found for this id",
            });
        }
    } catch (err) {
        console.log(`Error: ${err}`);
        return res.status(500).json({
            error: `Error: ${err}`,
        });
    }
};
module.exports.create = async (req, res) => {
    try {
        if (req.body.title) {
            let question = await Question.create({
                title: req.body.title,
            });
            if (question) {
                return res.status(200).json(question);
            } else {
                console.log(`Error creating question ${question}`);
                return res.status(500).json({
                    error: `Error creating question ${question}`,
                });
            }
        } else {
            return res.status(400).json({
                error: "The request body must contain title!",
            });
        }
    } catch (err) {
        console.log(`Error: ${err}`);
        return res.status(500).json({
            error: `Error: ${err}`,
        });
    }
};
module.exports.createOption = async (req, res) => {
    try {
        if (req.body.text && req.body.votes) {
            const votesAsNumber = parseInt(req.body.votes);
            if (!isNaN(votesAsNumber) && votesAsNumber >= 0) {
                let question = await Question.findById(req.params.id);
                if (question) {
                    let option = await Option.create({
                        text: req.body.text,
                        votes: votesAsNumber,
                        question: question._id,
                    });
                    if (option) {
                        question.options.push(option._id);
                        await question.save();
                        return res.status(200).json({
                            id: option.id,
                            text: option.text,
                            votes: option.votes,
                            link_to_vote: `https://localhost:8000/options/${option.id}/add_vote`,
                        });
                    } else {
                        console.log(`Error creating option ${question.id}`);
                        return res.status(500).json({
                            error: `Error creating option ${question.id}`,
                        });
                    }
                } else {
                    return res.status(400).json({
                        error: "No question found for this id",
                    });
                }
            } else {
                return res.status(400).json({
                    error: "Votes in the request body should be a number and non-negative!",
                });
            }
        } else {
            return res.status(400).json({
                error: "The request body must contain text and votes!",
            });
        }
    } catch (err) {
        console.log(`Error: ${err}`);
        return res.status(500).json({
            error: `Error: ${err}`,
        });
    }
};
module.exports.destroy = async (req, res) => {
    try {
        let question = await Question.findById(req.params.id).populate("options");
        if (question) {
            question;
            let isVoted = false;
            for (let i = 0; i < question.options.length; i++) {
                if (question.options[i].votes > 0) {
                    isVoted = true;
                    break;
                }
            }
            if (!isVoted) {
                await Question.deleteOne({ _id: question._id });
                console.log(`Deleted Question: ${question.id}`);
                await Option.deleteMany({ question: question._id });
                console.log(`Deleted Options of Question: ${question.id}`);
                return res.status(200).json({
                    success: true,
                    message: `Deleted Question: ${question.id}`,
                });
            } else {
                return res.status(400).json({
                    error: "An option in this question has votes. Can not delete the question!",
                });
            }
        } else {
            return res.status(400).json({
                error: "No question found for this id",
            });
        }
    } catch (err) {
        console.log(`Error: ${err}`);
        return res.status(500).json({
            error: `Error: ${err}`,
        });
    }
};
