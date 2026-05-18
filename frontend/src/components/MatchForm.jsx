import MatchChart from "./MatchChart";

import { useState } from "react";

import API from "../services/api";

function MatchForm() {

    const [requiredSkills, setRequiredSkills] = useState("");

    const [minExperience, setMinExperience] = useState("");

    const [results, setResults] = useState([]);

    const [savedCandidates, setSavedCandidates] = useState([]);


    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await API.post(

                "/match",

                {
                    requiredSkills:
                        requiredSkills
                            .split(",")
                            .map(skill => skill.trim()),

                    minExperience
                }

            );

            setResults(response.data);

        }

        catch (error) {

            console.log(error);

            alert("Error Matching Candidates");

        }

    };


    const saveCandidate = (candidate) => {

        const alreadySaved = savedCandidates.find(

            c => c.email === candidate.email

        );

        if (alreadySaved) {

            alert("Candidate Already Saved");

            return;

        }

        setSavedCandidates([
            ...savedCandidates,
            candidate
        ]);

    };


    return (

        <div
            style={{
                width: "80%",
                margin: "40px auto"
            }}
        >

            <h2>Shortlist Candidates</h2>


            <form onSubmit={handleSubmit}>

                <input
                    type="text"

                    placeholder="React, Node.js"

                    value={requiredSkills}

                    onChange={(e) =>
                        setRequiredSkills(e.target.value)
                    }

                    required

                    style={inputStyle}
                />


                <input
                    type="number"

                    placeholder="Minimum Experience"

                    value={minExperience}

                    onChange={(e) =>
                        setMinExperience(e.target.value)
                    }

                    required

                    style={inputStyle}
                />


                <button
                    type="submit"

                    style={{
                        padding: "10px 20px",
                        backgroundColor: "black",
                        color: "white",
                        border: "none",
                        cursor: "pointer"
                    }}
                >

                    Match Candidates

                </button>

            </form>


            <div style={{ marginTop: "30px" }}>

                {
                    results.length > 0 ? (

                        results.map((candidate, index) => (

                            <div
                                key={index}

                                style={{
                                    border: "1px solid gray",
                                    padding: "15px",
                                    marginBottom: "20px",
                                    borderRadius: "10px"
                                }}
                            >

                                <h3>{candidate.name}</h3>

                                <p>
                                    <strong>Match Score:</strong>
                                    {" "}
                                    {candidate.matchScore}%
                                </p>

                                <p>
                                    <strong>Matched Skills:</strong>
                                    {" "}
                                    {candidate.matchedSkills.join(", ")}
                                </p>

                                <p>
                                    <strong>Ranking:</strong>
                                    {" "}
                                    {candidate.ranking}
                                </p>


                                <button

                                    onClick={() =>
                                        saveCandidate(candidate)
                                    }

                                    style={{
                                        marginTop: "10px",
                                        padding: "8px 15px",
                                        backgroundColor: "green",
                                        color: "white",
                                        border: "none",
                                        cursor: "pointer"
                                    }}
                                >

                                    Save Candidate

                                </button>

                            </div>

                        ))

                    ) : (

                        <h3>No Matched Candidates</h3>

                    )
                }

            </div>


            <div style={{ marginTop: "40px" }}>

                <h2>Saved Candidates</h2>

                {
                    savedCandidates.length > 0 ? (

                        savedCandidates.map((candidate, index) => (

                            <div
                                key={index}

                                style={{
                                    border: "1px solid green",
                                    padding: "15px",
                                    marginBottom: "15px",
                                    borderRadius: "10px"
                                }}
                            >

                                <h3>{candidate.name}</h3>

                                <p>
                                    Match Score:
                                    {" "}
                                    {candidate.matchScore}%
                                </p>

                                <p>
                                    Ranking:
                                    {" "}
                                    {candidate.ranking}
                                </p>

                            </div>

                        ))

                    ) : (

                        <p>No Saved Candidates</p>

                    )
                }

            </div>
{
    results.length > 0 && (

        <MatchChart results={results} />

    )
}
        </div>

    );

}


const inputStyle = {

    width: "100%",

    padding: "10px",

    marginBottom: "15px"

};

export default MatchForm;