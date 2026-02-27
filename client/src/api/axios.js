import axios from "axios";

const api = axios.create({
  // Check this carefully! Is there a typo? Is it 5000?
  baseURL: "http://10.0.12.161:5000/api",
});

export default api;