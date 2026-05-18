const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const candidateRoutes = require("./routes/candidateRoutes");
const matchRoutes = require("./routes/matchRoutes");

const app = express();


// Middleware
app.use(express.json());

app.use(cors({
    origin: "*"
}));


// Routes
app.use("/api/candidates", candidateRoutes);

app.use("/api", matchRoutes);


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)

.then(() => {

    console.log("MongoDB Connected");

})

.catch((err) => {

    console.log(err);

});


// Home Route
app.get("/", (req, res) => {

    res.send("Candidate Shortlisting API Running");

});


// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});