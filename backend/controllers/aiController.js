const axios = require("axios");

const Candidate = require("../models/Candidate");

const aiShortlistCandidates = async (req, res) => {

    try {

        const { requiredSkills, minExperience } = req.body;


        // Only candidates meeting minimum experience
        const candidates = await Candidate.find({
            experience: { $gte: minExperience }
        });


        // Convert candidate data into text
        const candidateText = candidates.map((candidate, index) => {

            return `
${index + 1}. ${candidate.name}
Skills: ${candidate.skills.join(", ")}
Experience: ${candidate.experience} years
Bio: ${candidate.bio}
`;

        }).join("\n");


        // AI Prompt
        const prompt = `
You are an AI recruiter.

Job Requirements:
Required Skills: ${requiredSkills.join(", ")}
Minimum Experience: ${minExperience} years

Candidates:
${candidateText}

Instructions:
1. Only include candidates meeting minimum experience and 1. STRICTLY exclude candidates having experience less than minimum experience.
2. Rank candidates from best to worst.
3. Keep response simple and clean.
4. Do NOT use markdown tables.
5. Use this exact format:

Candidate Name:
Match Quality:
Reason:

6. Keep explanation short.
`;


        // OpenRouter API Call
        const response = await axios.post(

            "https://openrouter.ai/api/v1/chat/completions",

            {
                model: "openai/gpt-oss-120b:free",

                messages: [
                    {
                        role: "user",
                        content: prompt
                    }
                ]
            },

            {
                headers: {

                    "Authorization":
                        `Bearer ${process.env.OPENROUTER_API_KEY}`,

                    "HTTP-Referer":
                        "http://localhost:5000",

                    "X-Title":
                        "Candidate Shortlisting System",

                    "Content-Type":
                        "application/json"
                }
            }

        );


        res.status(200).json({

            success: true,

            aiResponse:
                response.data.choices[0].message.content

        });

    }

    catch (error) {

        console.log(
            error.response?.data || error.message
        );

        res.status(500).json({

            success: false,

            message: "AI Shortlisting Failed"

        });

    }

};

module.exports = {
    aiShortlistCandidates
};