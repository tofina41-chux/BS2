import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3001/api" // This is the standard "address" for your future Node.js server
});

