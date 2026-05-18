const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const candidateRoutes = require("./routes/candidateRoutes");
const matchRoutes = require("./routes/matchRoutes");

const app = express();

//app.use(cors());
//const cors = require("cors");

app.use(cors({

    origin: [

        "http://localhost:5173",

        "https://your-frontend-name.onrender.com"

    ]

}));
app.use(express.json());

app.use("/api/candidates", candidateRoutes);
app.use("/api", matchRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.get("/", (req, res) => {
    res.send("Candidate Shortlisting API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});