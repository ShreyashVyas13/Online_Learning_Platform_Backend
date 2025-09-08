// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5000/api",  // backend base url
// });

// // Tutorials API
// export const getTutorials = () => API.get("/tutorials");
// export const addTutorial = (data) => API.post("/tutorials", data);
// export const updateTutorial = (id, data) => API.put(`/tutorials/${id}`, data);
// export const deleteTutorial = (id) => API.delete(`/tutorials/${id}`);
import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

export const getTutorials = () => API.get("/tutorials");
export const addTutorial = (data) => API.post("/tutorials", data);
export const updateTutorial = (id, data) => API.put(`/tutorials/${id}`, data);
export const deleteTutorial = (id) => API.delete(`/tutorials/${id}`);
export const getTutorialByLink = (link) => API.get(`/tutorials/link/${link}`);