import axios from "axios";


const API_URL = "https://eyecamp-backend.onrender.com";

// http://192.168.103.158:5000/";

// http://localhost:5000/
  

// const API_URL = "http://192.168.103.158:5000/" ;

// "http://localhost:5000/"

  // "https://eyecamp-backend.onrender.com";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
