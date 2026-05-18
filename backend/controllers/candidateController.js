const Candidate = require("../models/Candidate");


// ADD CANDIDATE
const addCandidate = async (req, res) => {
    try {

        const candidate = new Candidate(req.body);

        await candidate.save();

        res.status(201).json({
            message: "Candidate Added Successfully",
            candidate
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};


// GET ALL CANDIDATES
const getCandidates = async (req, res) => {
    try {

        const candidates = await Candidate.find();

        res.status(200).json(candidates);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

const updateCandidate = async (req, res) => {

    try {

        const updatedCandidate = await Candidate.findByIdAndUpdate(

            req.params.id,

            req.body,

            {
                new: true
            }

        );

        res.status(200).json({
            message: "Candidate Updated Successfully",
            updatedCandidate
        });

    }
    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};
module.exports = {
    addCandidate,
    getCandidates,
    updateCandidate
};