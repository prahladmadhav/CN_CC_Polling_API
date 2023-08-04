const Option = require("../models/option.model");
const Question = require("../models/question.model");

const getOptionData = (option) => {
    optionResult = {
        id: option.id,
        text: option.text,
        votes: option.votes,
        link_to_vote: `https://localhost:8000/options/${option.id}/add_vote`,
    };
    return optionResult;
};

module.exports.viewAll = async (req, res) => {
    try {
        let tempOptions = await Option.find({});
        if (tempOptions) {
            let options = [];
            tempOptions.forEach((option) => {
                options.push(getOptionData(option));
            });
            return res.status(200).json(options);
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
        let tempOption = await Option.findById(req.params.id);
        if (tempOption) {
            let option = getOptionData(tempOption);
            return res.status(200).json(option);
        } else {
            return res.status(400).json({
                error: "No option found for this id",
            });
        }
    } catch (err) {
        console.log(`Error: ${err}`);
        return res.status(500).json({
            error: `Error: ${err}`,
        });
    }
};
module.exports.addVote = async (req, res) => {
    try {
        let option = await Option.findById(req.params.id);
        if (option) {
            option.votes = option.votes + 1;
            await option.save();
            let optionResult = getOptionData(option);
            return res.status(200).json(optionResult);
        } else {
            return res.status(400).json({
                error: "No option found for this id",
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
        let option = await Option.findById(req.params.id);
        if (option) {
            if (option.votes == 0) {
                await Option.findByIdAndDelete(option._id);
                console.log(`Deleted Option: ${option.id}`);
                await Question.findByIdAndUpdate(option.question, { $pull: { options: option._id } });
                console.log(`Deleted Option(${option.id}) reference from Question(${option.question})`);
                return res.status(200).json({
                    success: true,
                    message: `Deleted Option: ${option.id}`,
                });
            } else {
                return res.status(400).json({
                    error: "The option has votes. Can not delete the option!",
                });
            }
        } else {
            return res.status(400).json({
                error: "No option found for this id",
            });
        }
    } catch (err) {
        console.log(`Error: ${err}`);
        return res.status(500).json({
            error: `Error: ${err}`,
        });
    }
};
