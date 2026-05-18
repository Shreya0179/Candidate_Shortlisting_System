const Candidate = require("../models/Candidate");

const shortlistCandidates = async (req, res) => {

    try {

        const { requiredSkills, minExperience } = req.body;


        // Filter by minimum experience
        const filteredCandidates = await Candidate.find({
            experience: { $gte: minExperience }
        });


        const rankedCandidates = filteredCandidates.map(candidate => {

            const matchedSkills = candidate.skills.filter(skill =>
                requiredSkills
        .map(s => s.toLowerCase())
        .includes(skill.toLowerCase())
            );


            const matchScore =
                (matchedSkills.length / requiredSkills.length) * 100;


            let ranking = "Low";

            if (matchScore >= 80) {
                ranking = "High";
            }
            else if (matchScore >= 40) {
                ranking = "Medium";
            }


            return {

                name: candidate.name,

                email: candidate.email,

                skills: candidate.skills,

                experience: candidate.experience,

                matchedSkills,

                matchScore: matchScore.toFixed(2),

                ranking

            };

        });


        // Sort descending
        rankedCandidates.sort(
            (a, b) => b.matchScore - a.matchScore
        );


        res.status(200).json(rankedCandidates);

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
    shortlistCandidates
};