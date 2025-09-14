// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { getBlogById, updateBlog } from "../services/api";
// import "./ManageBlogDetails.css";

// function ManageBlogDetails() {
//   const { id } = useParams(); // blog ID
//   const navigate = useNavigate();
//   const [blog, setBlog] = useState(null);
//   const [extra, setExtra] = useState("");
//   const [tags, setTags] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchBlog = async () => {
//       try {
//         const res = await getBlogById(id);
//         setBlog(res.data);
//         setExtra(res.data.extra || "");
//         setTags(res.data.tags?.join(", ") || "");
//       } catch (err) {
//         console.error("Error fetching blog:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchBlog();
//   }, [id]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await updateBlog(id, {
//         ...blog,
//         extra,
//         tags: tags.split(",").map((t) => t.trim()),
//       });
//       alert("Blog details updated!");
//       navigate("/manage-blog"); // go back to blog list
//     } catch (err) {
//       console.error("Error updating blog:", err);
//       alert("Failed to update blog details");
//     }
//   };

//   if (loading) return <p>Loading blog details...</p>;
//   if (!blog) return <p>Blog not found</p>;

//   return (
//     <div className="manage-blog-details">
//       <h1>Manage Details for: {blog.title}</h1>

//       <form onSubmit={handleSubmit}>
//         <label>
//           Extra Details:
//           <textarea
//             value={extra}
//             onChange={(e) => setExtra(e.target.value)}
//             placeholder="Enter extra details about the blog..."
//           />
//         </label>

//         <label>
//           Tags (comma separated):
//           <input
//             type="text"
//             value={tags}
//             onChange={(e) => setTags(e.target.value)}
//             placeholder="e.g., javascript, react, tutorial"
//           />
//         </label>

//         <div className="actions">
//           <button type="submit">Save Details</button>
//           <button type="button" onClick={() => navigate("/manage-blog")}>
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default ManageBlogDetails;

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBlogById, updateBlog } from "../services/api";
import "./ManageBlogDetails.css";

function ManageBlogDetails() {
  const { id } = useParams(); // blog ID
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [extra, setExtra] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await getBlogById(id);
        setBlog(res.data);
        setExtra(res.data.extra || "");
        setTags(res.data.tags?.join(", ") || "");
      } catch (err) {
        console.error("Error fetching blog:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update backend
      const updatedBlog = {
        ...blog,
        extra,
        tags: tags.split(",").map((t) => t.trim()),
      };
      await updateBlog(id, updatedBlog);

      // Update local state so changes are reflected immediately
      setBlog(updatedBlog);

      alert("Blog details updated!");

      // Optionally navigate to the blog detail page
      navigate(`/blog/${id}`);
    } catch (err) {
      console.error("Error updating blog:", err);
      alert("Failed to update blog details");
    }
  };

  if (loading) return <p>Loading blog details...</p>;
  if (!blog) return <p>Blog not found</p>;

  return (
    <div className="manage-blog-details-page">
      <h1>Manage Details for: {blog.title}</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Extra Details:
          <textarea
            value={extra}
            onChange={(e) => setExtra(e.target.value)}
            placeholder="Enter extra details about the blog..."
          />
        </label>

        <label>
          Tags (comma separated):
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="e.g., javascript, react, tutorial"
          />
        </label>

        <div className="manage-blog-details-actions">
          <button type="submit">Save Details</button>
          <button type="button" onClick={() => navigate("/manage-blogs")}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default ManageBlogDetails;
