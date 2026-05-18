const {
    aiShortlistCandidates
} = require("../controllers/aiController");
const express = require("express");

const router = express.Router();

const {
    shortlistCandidates
} = require("../controllers/matchController");


// MATCH API
router.post("/match", shortlistCandidates);
//shortlist using AI
router.post("/ai/shortlist", aiShortlistCandidates);
module.exports = router;