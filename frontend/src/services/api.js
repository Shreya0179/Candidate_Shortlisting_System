import axios from "axios";

const API = axios.create({
    baseURL: "https://candidate-shortlisting-system-k2xb.onrender.com/"
});

export default API;