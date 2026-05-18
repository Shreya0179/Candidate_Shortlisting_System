import { useEffect, useState } from "react";

import API from "../services/api";

function CandidateList() {

    const [candidates, setCandidates] = useState([]);

    const [search, setSearch] = useState("");


    const fetchCandidates = async () => {

        try {

            const response = await API.get("/candidates");

            setCandidates(response.data);

        }

        catch (error) {

            console.log(error);

        }

    };


    useEffect(() => {

        fetchCandidates();

    }, []);


    // Filter candidates
    const filteredCandidates = candidates.filter(candidate =>

        candidate.name
            .toLowerCase()
            .includes(search.toLowerCase())

    );


    return (

        <div
            style={{
                width: "80%",
                margin: "30px auto"
            }}
        >

            <h2>All Candidates</h2>


            <input
                type="text"

                placeholder="Search Candidate"

                value={search}

                onChange={(e) =>
                    setSearch(e.target.value)
                }

                style={{
                    width: "100%",
                    padding: "10px",
                    marginBottom: "20px"
                }}
            />


            {
                filteredCandidates.length > 0 ? (

                    filteredCandidates.map(candidate => (

                        <div
                            key={candidate._id}

                            style={{
                                border: "1px solid gray",
                                padding: "15px",
                                marginBottom: "20px",
                                borderRadius: "10px"
                            }}
                        >

                            <h3>{candidate.name}</h3>

                            <p>
                                <strong>Email:</strong>
                                {" "}
                                {candidate.email}
                            </p>

                            <p>
                                <strong>Skills:</strong>
                                {" "}
                                {candidate.skills.join(", ")}
                            </p>

                            <p>
                                <strong>Experience:</strong>
                                {" "}
                                {candidate.experience} years
                            </p>

                            <p>
                                <strong>Bio:</strong>
                                {" "}
                                {candidate.bio}
                            </p>

                        </div>

                    ))

                ) : (

                    <h3>No Candidates Found</h3>

                )
            }

        </div>

    );

}

export default CandidateList;