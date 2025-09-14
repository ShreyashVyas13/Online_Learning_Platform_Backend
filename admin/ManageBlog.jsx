import { useEffect, useState } from "react";
import { getBlogs, addBlog, updateBlog, deleteBlog } from "../services/api";
import "./ManageBlog.css";
import { useNavigate } from "react-router-dom";

function ManageBlog() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({
    title: "",
    desc: "",
    category: "",
    author: "",
    date: "",
    image: "", // file name from /images folder
  });
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchBlogs = async () => {
    const res = await getBlogs();
    setBlogs(res.data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await updateBlog(editId, form);
      } else {
        await addBlog(form);
      }
      setForm({ title: "", desc: "", category: "", author: "", date: "", image: "" });
      setEditId(null);
      setShowModal(false);
      fetchBlogs();
    } catch (err) {
      console.error("Error saving blog:", err);
    }
  };

  const handleEdit = (blog) => {
    setForm(blog);
    setEditId(blog._id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    await deleteBlog(id);
    fetchBlogs();
  };

  return (
    <div className="admin-page">
      <h1>Manage Blogs</h1>
      <button onClick={() => { setForm({ title:"", desc:"", category:"", author:"", date:"", image:"" }); setEditId(null); setShowModal(true); }}>
        ➕ Add Blog
      </button>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{editId ? "Edit Blog" : "Add Blog"}</h2>
            <form onSubmit={handleSubmit}>
              <input placeholder="Title" value={form.title} onChange={(e)=>setForm({...form, title:e.target.value})} required/>
              <textarea placeholder="Description" value={form.desc} onChange={(e)=>setForm({...form, desc:e.target.value})} required/>
              <input placeholder="Category" value={form.category} onChange={(e)=>setForm({...form, category:e.target.value})} required/>
              <input placeholder="Author" value={form.author} onChange={(e)=>setForm({...form, author:e.target.value})} required/>
              <input placeholder="Date" value={form.date} onChange={(e)=>setForm({...form, date:e.target.value})} required/>
              <input placeholder="Image filename (e.g., js.png)" value={form.image} onChange={(e)=>setForm({...form, image:e.target.value})} required/>
              <div className="modal-actions">
                <button type="submit">{editId ? "Update" : "Add"}</button>
                <button type="button" onClick={()=>setShowModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="admin-list">
        {blogs.map((b) => (
          <div key={b._id} className="admin-card">
            <h3>{b.title}</h3>
            <p>{b.category}</p>
            <div className="actions">
              <button onClick={() => handleEdit(b)}>✏️ Edit</button>
              <button onClick={() => handleDelete(b._id)}>🗑 Delete</button>
               {/* Add this button to manage extra details */}
    <button onClick={() => navigate(`/manage-blog-details/${b._id}`)}>
       🛠️Manage Details
    </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageBlog;
