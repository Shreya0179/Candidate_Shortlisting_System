import { useState } from "react";

import API from "../services/api";

function CandidateForm() {

    const [formData, setFormData] = useState({

        name: "",
        email: "",
        skills: "",
        experience: "",
        bio: ""

    });


    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const candidateData = {

                ...formData,

                skills: formData.skills
                    .split(",")
                    .map(skill => skill.trim())

            };

            const response = await API.post(
                "/candidates",
                candidateData
            );

            alert("Candidate Added Successfully");

            console.log(response.data);

            setFormData({

                name: "",
                email: "",
                skills: "",
                experience: "",
                bio: ""

            });

        }

        catch (error) {

            console.log(error);

            alert("Error Adding Candidate");

        }

    };


    return (

        <div
            style={{
                width: "400px",
                margin: "30px auto",
                padding: "20px",
                border: "1px solid gray",
                borderRadius: "10px"
            }}
        >

            <h2>Add Candidate</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="name"
                    placeholder="Enter Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                />

                <input
                    type="text"
                    name="skills"
                    placeholder="React, Node.js, MongoDB"
                    value={formData.skills}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                />

                <input
                    type="number"
                    name="experience"
                    placeholder="Experience"
                    value={formData.experience}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                />

                <textarea
                    name="bio"
                    placeholder="Enter Bio"
                    value={formData.bio}
                    onChange={handleChange}
                    style={inputStyle}
                />

                <button
                    type="submit"
                    style={{
                        padding: "10px",
                        width: "100%",
                        backgroundColor: "black",
                        color: "white",
                        border: "none",
                        cursor: "pointer"
                    }}
                >

                    Add Candidate

                </button>

            </form>

        </div>

    );

}


const inputStyle = {

    width: "100%",

    padding: "10px",

    marginBottom: "15px"

};

export default CandidateForm;