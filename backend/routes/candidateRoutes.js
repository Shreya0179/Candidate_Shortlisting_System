const express = require("express");

const router = express.Router();

const {
    addCandidate,
    getCandidates,
    updateCandidate
} = require("../controllers/candidateController");


// POST API
router.post("/", addCandidate);


// GET API
router.get("/", getCandidates);
//PUT
router.put("/:id", updateCandidate);
module.exports = router;