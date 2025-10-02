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

export const getTutorialById = (id) => API.get(`/tutorials/${id}`);

// ✅ Make sure API_URL is defined before using it
const API_URL = "http://localhost:5000/api/blogs";

export const getBlogById = (id) => axios.get(`${API_URL}/${id}`);

// Fetch all blogs
export const getBlogs = () => axios.get(API_URL);

// Add a new blog
export const addBlog = (data) => axios.post(API_URL, data);

// Update an existing blog
export const updateBlog = (id, data) => axios.put(`${API_URL}/${id}`, data);

// Delete a blog
export const deleteBlog = (id) => axios.delete(`${API_URL}/${id}`);

// ----- Inquiries -----
const BASE_API = "http://localhost:5000/api";
export const getInquiries = () => axios.get(`${BASE_API}/inquiries`);
export const sendInquiry = (data) => axios.post(`${BASE_API}/inquiries`, data);
// Send admin feedback

export const sendFeedback = (id, feedback) => {
  return axios.post(`http://localhost:5000/api/inquiries/${id}/feedback`, { feedback });
};
