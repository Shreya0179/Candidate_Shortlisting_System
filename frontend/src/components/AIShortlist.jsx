import { useState } from "react";

import API from "../services/api";

function AIShortlist() {

    const [requiredSkills, setRequiredSkills] = useState("");

    const [minExperience, setMinExperience] = useState("");

    const [aiResult, setAIResult] = useState("");


    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await API.post(

                "/ai/shortlist",

                {
                    requiredSkills:
                        requiredSkills
                            .split(",")
                            .map(skill => skill.trim()),

                    minExperience
                }

            );

            setAIResult(response.data.aiResponse);

        }

        catch (error) {

            console.log(error);

            alert("AI Shortlisting Failed");

        }

    };


    return (

        <div
            style={{
                width: "80%",
                margin: "40px auto"
            }}
        >

            <h2>AI Candidate Shortlisting</h2>

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
                        backgroundColor: "green",
                        color: "white",
                        border: "none",
                        cursor: "pointer"
                    }}
                >

                    AI Shortlist

                </button>

            </form>


            {
                aiResult && (

                    <div
                        style={{
                            marginTop: "30px",
                            padding: "20px",
                            border: "1px solid gray",
                            borderRadius: "10px",
                            whiteSpace: "pre-wrap"
                        }}
                    >

                        <h3>AI Recommendation</h3>

                        <p>{aiResult}</p>

                    </div>

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

export default AIShortlist;