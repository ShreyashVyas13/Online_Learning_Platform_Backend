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

// ✅ Make sure API_URL is defined before using it
const API_URL = "http://localhost:5000/api/blogs";

// Fetch all blogs
export const getBlogs = () => axios.get(API_URL);

// Add a new blog
export const addBlog = (data) => axios.post(API_URL, data);

// Update an existing blog
export const updateBlog = (id, data) => axios.put(`${API_URL}/${id}`, data);

// Delete a blog
export const deleteBlog = (id) => axios.delete(`${API_URL}/${id}`);