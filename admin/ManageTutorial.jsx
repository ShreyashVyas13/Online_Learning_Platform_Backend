// import { useEffect, useState } from "react";
// import {
//   getTutorials,
//   addTutorial,
//   updateTutorial,
//   deleteTutorial,
// } from "../services/api.js";
// import "./ManageTutorial.css";

// function ManageTutorial() {
//   const [tutorials, setTutorials] = useState([]);
//   const [form, setForm] = useState({
//     title: "",
//     desc: "",
//     icon: "",
//     link: "",
//     sections: [{ title: "", content: "" }],
//   });
//   const [editId, setEditId] = useState(null);
//   const [showModal, setShowModal] = useState(false); // modal state

//   useEffect(() => {
//     fetchTutorials();
//   }, []);

//   const fetchTutorials = async () => {
//     const res = await getTutorials();
//     setTutorials(res.data);
//   };

//   const handleSectionChange = (index, field, value) => {
//     const updatedSections = [...form.sections];
//     updatedSections[index][field] = value;
//     setForm({ ...form, sections: updatedSections });
//   };

//   const addSectionField = () => {
//     setForm({
//       ...form,
//       sections: [...form.sections, { title: "", content: "" }],
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (editId) {
//         await updateTutorial(editId, form);
//       } else {
//         await addTutorial(form);
//       }
//       setForm({
//         title: "",
//         desc: "",
//         icon: "",
//         link: "",
//         sections: [{ title: "", content: "" }],
//       });
//       setEditId(null);
//       setShowModal(false); // close modal after submit
//       fetchTutorials();
//     } catch (err) {
//       console.error("Error saving tutorial:", err);
//     }
//   };

//   const handleEdit = (tutorial) => {
//     setForm({
//       title: tutorial.title,
//       desc: tutorial.desc,
//       icon: tutorial.icon,
//       link: tutorial.link,
//       sections: tutorial.sections?.length
//         ? tutorial.sections
//         : [{ title: "", content: "" }],
//     });
//     setEditId(tutorial._id);
//     setShowModal(true);
//   };

//   const handleDelete = async (id) => {
//     const confirm = window.confirm(
//       "Are you sure you want to delete this tutorial?"
//     );
//     if (!confirm) return;

//     try {
//       await deleteTutorial(id);
//       fetchTutorials();
//     } catch (err) {
//       console.error("Error deleting tutorial:", err);
//     }
//   };

//   return (
//     <div className="admin-page">
//       <h1>Manage Tutorials</h1>

//       {/* Add Tutorial Button */}
//       <button
//         className="add-btn"
//         onClick={() => {
//           setForm({
//             title: "",
//             desc: "",
//             icon: "",
//             link: "",
//             sections: [{ title: "", content: "" }],
//           });
//           setEditId(null);
//           setShowModal(true);
//         }}
//       >
//         ➕ Add Tutorial
//       </button>

//       {showModal && (
//         <div className="modal-overlay">
//           <div className="modall">
//             <span className="modal-close" onClick={() => setShowModal(false)}>
//               ×
//             </span>
//             <h2>{editId ? "Edit Tutorial" : "Add Tutorial"}</h2>
//             <form onSubmit={handleSubmit} className="modal-form">
//               <input
//                 type="text"
//                 placeholder="Title"
//                 value={form.title}
//                 onChange={(e) => setForm({ ...form, title: e.target.value })}
//                 required
//               />
//               <input
//                 type="text"
//                 placeholder="Description"
//                 value={form.desc}
//                 onChange={(e) => setForm({ ...form, desc: e.target.value })}
//                 required
//               />
//               <input
//                 type="text"
//                 placeholder="Icon (e.g., FaHtml5)"
//                 value={form.icon}
//                 onChange={(e) => setForm({ ...form, icon: e.target.value })}
//               />
//               <input
//                 type="text"
//                 placeholder="Link (e.g., /tutorial/html)"
//                 value={form.link}
//                 onChange={(e) => setForm({ ...form, link: e.target.value })}
//               />
//               <h3>Sections</h3>
//               {(form.sections || []).map((s, i) => (
//                 <div key={i} className="section-input">
//                   <input
//                     type="text"
//                     placeholder="Section Title"
//                     value={s.title}
//                     onChange={(e) =>
//                       handleSectionChange(i, "title", e.target.value)
//                     }
//                     required
//                   />
//                   <textarea
//                     placeholder="Section Content"
//                     value={s.content}
//                     onChange={(e) =>
//                       handleSectionChange(i, "content", e.target.value)
//                     }
//                     required
//                   />
//                 </div>
//               ))}
//               <button type="button" onClick={addSectionField}>
//                 + Add Section
//               </button>

//               <div className="modal-actions">
//                 <button type="submit">{editId ? "Update" : "Add"}</button>
//                 <button type="button" onClick={() => setShowModal(false)}>
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Tutorial List */}
//       <div className="admin-list">
//         {tutorials.map((t) => (
//           <div key={t._id} className="admin-cardd">
//             <h3>{t.title}</h3>
//             <p>{t.desc}</p>
//             <small>{t.link}</small>
//             <div className="actions">
//               <button onClick={() => handleEdit(t)}>✏️ Edit</button>
//               <button onClick={() => handleDelete(t._id)}>🗑️ Delete</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default ManageTutorial;

// import { useEffect, useState } from "react";
// import {
//   getTutorials,
//   addTutorial,
//   updateTutorial,
//   deleteTutorial,
// } from "../services/api.js";
// import "./ManageTutorial.css";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import hljs from "highlight.js";
// import "quill/modules/syntax";
// import "highlight.js/styles/github.css";
// import { useNavigate } from "react-router-dom";


// // Optional: highlight code blocks in the editor preview
// hljs.configure({ languages: ["javascript", "html", "css", "python"] });

// function ManageTutorial() {
//   const navigate = useNavigate();  // ✅ Must be here before any navigate() calls
//   const [tutorials, setTutorials] = useState([]);
//   const [form, setForm] = useState({
//     title: "",
//     desc: "",
//     icon: "",
//     link: "",
//     sections: [{ title: "", content: "" }],
//   });
//   const [editId, setEditId] = useState(null);
//   const [showModal, setShowModal] = useState(false); // modal state
//   // const quillModules = {
//   //   syntax: {
//   //     highlight: (text) => hljs.highlightAuto(text).value,
//   //   },
//   //   toolbar: [
//   //     [{ header: [1, 2, false] }],
//   //     ["bold", "italic", "underline", "strike"],
//   //     [{ list: "ordered" }, { list: "bullet" }],
//   //     ["blockquote", "code-block"],
//   //     ["link"],
//   //     ["clean"],
//   //   ],
//   // };
// const quillModules = {
//   syntax: true, // ✅ Enable proper code-block saving with <pre><code>
//   toolbar: [
//     [{ header: [1, 2, false] }],
//     ["bold", "italic", "underline", "strike"],
//     [{ list: "ordered" }, { list: "bullet" }],
//     ["blockquote", "code-block"], // code-block button
//     ["link"],
//     ["clean"],
//   ],
// };

//   const quillFormats = [
//     "header",
//     "bold",
//     "italic",
//     "underline",
//     "strike",
//     "list",
//     "bullet",
//     "blockquote",
//     "code-block",
//     "link",
//   ];

//   useEffect(() => {
//     fetchTutorials();
//     hljs.highlightAll(); // highlight all <pre><code> blocks after render
//   }, []);

//   const fetchTutorials = async () => {
//     const res = await getTutorials();
//     setTutorials(res.data);
//   };

//   const handleSectionChange = (index, field, value) => {
//     const updatedSections = [...form.sections];
//     updatedSections[index][field] = value;
//     setForm({ ...form, sections: updatedSections });
//   };

//   const addSectionField = () => {
//     setForm({
//       ...form,
//       sections: [...form.sections, { title: "", content: "" }],
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (editId) {
//         await updateTutorial(editId, form);
//       } else {
//         await addTutorial(form);
//       }
//       setForm({
//         title: "",
//         desc: "",
//         icon: "",
//         link: "",
//         sections: [{ title: "", content: "" }],
//       });
//       setEditId(null);
//       setShowModal(false); // close modal after submit
//       fetchTutorials();
//     } catch (err) {
//       console.error("Error saving tutorial:", err);
//     }
//   };

//   const handleEdit = (tutorial) => {
//     setForm({
//       title: tutorial.title,
//       desc: tutorial.desc,
//       icon: tutorial.icon,
//       link: tutorial.link,
//       sections: tutorial.sections?.length
//         ? tutorial.sections
//         : [{ title: "", content: "" }],
//     });
//     setEditId(tutorial._id);
//     setShowModal(true);
//   };

//   const handleDelete = async (id) => {
//     const confirm = window.confirm(
//       "Are you sure you want to delete this tutorial?"
//     );
//     if (!confirm) return;

//     try {
//       await deleteTutorial(id);
//       fetchTutorials();
//     } catch (err) {
//       console.error("Error deleting tutorial:", err);
//     }
//   };

//   return (
//     <div className="admin-page">
//       <h1>Manage Tutorials</h1>

//       {/* Add Tutorial Button */}
//       <button
//         className="add-btn"
//         onClick={() => {
//           setForm({
//             title: "",
//             desc: "",
//             icon: "",
//             link: "",
//             sections: [{ title: "", content: "" }],
//           });
//           setEditId(null);
//           setShowModal(true);
//         }}
//       >
//         ➕ Add Tutorial
//       </button>

//       {showModal && (
//         <div className="modal-overlay">
//           <div className="modall">
//             <span className="modal-close" onClick={() => setShowModal(false)}>
//               ×
//             </span>
//             <h2>{editId ? "Edit Tutorial" : "Add Tutorial"}</h2>
//             <form onSubmit={handleSubmit} className="modal-form">
//               <input
//                 type="text"
//                 placeholder="Title"
//                 value={form.title}
//                 onChange={(e) => setForm({ ...form, title: e.target.value })}
//                 required
//               />
//               <input
//                 type="text"
//                 placeholder="Description"
//                 value={form.desc}
//                 onChange={(e) => setForm({ ...form, desc: e.target.value })}
//                 required
//               />
//               <input
//                 type="text"
//                 placeholder="Icon (e.g., FaHtml5)"
//                 value={form.icon}
//                 onChange={(e) => setForm({ ...form, icon: e.target.value })}
//               />
//               <input
//                 type="text"
//                 placeholder="Link (e.g., /tutorial/html)"
//                 value={form.link}
//                 onChange={(e) => setForm({ ...form, link: e.target.value })}
//               />
//               <h3>Sections</h3>
//               {form.sections.map((s, i) => (
//   <div key={i} className="section-input">
//     <input
//       type="text"
//       placeholder="Section Title"
//       value={s.title}
//       onChange={(e) => handleSectionChange(i, "title", e.target.value)}
//       required
//     />

//     <ReactQuill
//       theme="snow"
//       value={s.content}
//       onChange={(value) => handleSectionChange(i, "content", value)}
//       modules={quillModules}
//       formats={quillFormats}
//     />

//     {/* Render preview of HTML content separately */}
//     <div
//       className="content"
//       dangerouslySetInnerHTML={{ __html: s.content }}
//     />

//     {form.sections.length > 1 && (
//       <button
//         type="button"
//         className="delete-section"
//         onClick={() => {
//           const updated = form.sections.filter((_, idx) => idx !== i);
//           setForm({ ...form, sections: updated });
//         }}
//       >
//         ❌ Delete Section
//       </button>
//     )}
//   </div>
// ))}


//               <button type="button" onClick={addSectionField}>
//                 + Add Section
//               </button>

//               <div className="modal-actions">
//                 <button type="submit">{editId ? "Update" : "Add"}</button>
//                 <button type="button" onClick={() => setShowModal(false)}>
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Tutorial List */}
//       <div className="admin-list">
//         {tutorials.map((t) => (
//           <div key={t._id} className="admin-cardd">
//             <h3>{t.title}</h3>
//             <p>{t.desc}</p>
//             <small>{t.link}</small>
//             <div className="actions">
//               <button onClick={() => navigate(`/edit-tutorial/${t._id}`)}>✏️ Edit</button>
//               <button onClick={() => handleDelete(t._id)}>🗑️ Delete</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default ManageTutorial;

import { useEffect, useState } from "react";
import {
  getTutorials,
  addTutorial,
  updateTutorial,
  deleteTutorial,
} from "../services/api.js";
import "./ManageTutorial.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "quill/modules/syntax";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import { useNavigate } from "react-router-dom";

// Optional: highlight code blocks in the preview
hljs.configure({ languages: ["javascript", "html", "css", "python"] });

function ManageTutorial() {
  const navigate = useNavigate();
  const [tutorials, setTutorials] = useState([]);
  const [form, setForm] = useState({
    title: "",
    desc: "",
    icon: "",
    link: "",
    sections: [{ title: "", content: "" }],
  });
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const quillModules = {
    syntax: true, // ✅ enable code-block
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["blockquote", "code-block"], // code-block button
      ["link"],
      ["clean"],
    ],
  };

  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "blockquote",
    "code-block",
    "link",
  ];

  useEffect(() => {
    fetchTutorials();
  }, []);

  useEffect(() => {
    hljs.highlightAll(); // highlight saved code blocks in preview
  }, [tutorials, form]);

  const fetchTutorials = async () => {
    try {
      const res = await getTutorials();
      setTutorials(res.data);
    } catch (err) {
      console.error("Error fetching tutorials:", err);
    }
  };

  const handleSectionChange = (index, field, value) => {
    const updatedSections = [...form.sections];
    updatedSections[index][field] = value;
    setForm({ ...form, sections: updatedSections });
  };

  const addSectionField = () => {
    setForm({
      ...form,
      sections: [...form.sections, { title: "", content: "" }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await updateTutorial(editId, form);
      } else {
        await addTutorial(form);
      }
      setForm({
        title: "",
        desc: "",
        icon: "",
        link: "",
        sections: [{ title: "", content: "" }],
      });
      setEditId(null);
      setShowModal(false);
      fetchTutorials();
    } catch (err) {
      console.error("Error saving tutorial:", err);
    }
  };

  const handleEdit = (tutorial) => {
    setForm({
      title: tutorial.title,
      desc: tutorial.desc,
      icon: tutorial.icon,
      link: tutorial.link,
      sections: tutorial.sections?.length
        ? tutorial.sections
        : [{ title: "", content: "" }],
    });
    setEditId(tutorial._id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this tutorial?"
    );
    if (!confirm) return;

    try {
      await deleteTutorial(id);
      fetchTutorials();
    } catch (err) {
      console.error("Error deleting tutorial:", err);
    }
  };

  return (
    <div className="admin-page">
      <h1>Manage Tutorials</h1>

      <button
        className="add-btn"
        onClick={() => {
          setForm({
            title: "",
            desc: "",
            icon: "",
            link: "",
            sections: [{ title: "", content: "" }],
          });
          setEditId(null);
          setShowModal(true);
        }}
      >
        ➕ Add Tutorial
      </button>

      {showModal && (
        <div className="modal-overlay">
          <div className="modall">
            <span className="modal-close" onClick={() => setShowModal(false)}>
              ×
            </span>
            <h2>{editId ? "Edit Tutorial" : "Add Tutorial"}</h2>
            <form onSubmit={handleSubmit} className="modal-form">
              <input
                type="text"
                placeholder="Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Description"
                value={form.desc}
                onChange={(e) => setForm({ ...form, desc: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Icon (e.g., FaHtml5)"
                value={form.icon}
                onChange={(e) => setForm({ ...form, icon: e.target.value })}
              />
              <input
                type="text"
                placeholder="Link (e.g., /tutorial/html)"
                value={form.link}
                onChange={(e) => setForm({ ...form, link: e.target.value })}
              />
              <h3>Sections</h3>
              {form.sections.map((s, i) => (
                <div key={i} className="section-input">
                  <input
                    type="text"
                    placeholder="Section Title"
                    value={s.title}
                    onChange={(e) =>
                      handleSectionChange(i, "title", e.target.value)
                    }
                    required
                  />

                  <ReactQuill
                    theme="snow"
                    value={s.content}
                    onChange={(value) =>
                      handleSectionChange(i, "content", value)
                    }
                    modules={quillModules}
                    formats={quillFormats}
                  />

                  <div
                    className="content"
                    dangerouslySetInnerHTML={{ __html: s.content }}
                  />

                  {form.sections.length > 1 && (
                    <button
                      type="button"
                      className="delete-section"
                      onClick={() => {
                        const updated = form.sections.filter(
                          (_, idx) => idx !== i
                        );
                        setForm({ ...form, sections: updated });
                      }}
                    >
                      ❌ Delete Section
                    </button>
                  )}
                </div>
              ))}

              <button type="button" onClick={addSectionField}>
                + Add Section
              </button>

              <div className="modal-actions">
                <button type="submit">{editId ? "Update" : "Add"}</button>
                <button type="button" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="admin-list">
        {tutorials.map((t) => (
          <div key={t._id} className="admin-cardd">
            <h3>{t.title}</h3>
            <p>{t.desc}</p>
            <small>{t.link}</small>
            <div className="actions">
              <button onClick={() => navigate(`/edit-tutorial/${t._id}`)}>
                ✏️ Edit
              </button>
              <button onClick={() => handleDelete(t._id)}>🗑️ Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageTutorial;
