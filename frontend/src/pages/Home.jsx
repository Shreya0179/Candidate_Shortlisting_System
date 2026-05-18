import Navbar from "../components/Navbar";

import CandidateForm from "../components/CandidateForm";

import CandidateList from "../components/CandidateList";

import MatchForm from "../components/MatchForm";

import AIShortlist from "../components/AIShortlist";

function Home() {

    return (

        <div>

            <Navbar />

            <h1
                style={{
                    textAlign: "center",
                    marginTop: "30px"
                }}
            >

                AI Candidate Shortlisting System

            </h1>

            <CandidateForm />

            <CandidateList />

            <MatchForm />

            <AIShortlist />

        </div>

    );

}

export default Home;