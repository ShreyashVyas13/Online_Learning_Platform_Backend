// import { useEffect, useState } from "react";
// import { getTutorials, addTutorial, updateTutorial, deleteTutorial } from "../services/api.js";
// import "./ManageTutorial.css";

// function ManageTutorial() {
//   const [tutorials, setTutorials] = useState([]);
//   const [form, setForm] = useState({ title: "", desc: "", icon: "", link: "" });
//   const [editId, setEditId] = useState(null);

//   useEffect(() => {
//     fetchTutorials();
//   }, []);

//   const fetchTutorials = async () => {
//     const res = await getTutorials();
//     setTutorials(res.data);
//   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (editId) {
// //       await updateTutorial(editId, form);
// //     } else {
// //       await addTutorial(form);
// //     }
// //     setForm({ title: "", desc: "", icon: "", link: "" });
// //     setEditId(null);
// //     fetchTutorials();
// //   };
// const handleSubmit = async (e) => {
//   e.preventDefault();

//   try {
//     if (editId) {
//       await updateTutorial(editId, form); // only update fields
//     } else {
//       await addTutorial(form);
//     }
//     setForm({ title: "", desc: "", icon: "", link: "" });
//     setEditId(null);
//     fetchTutorials();
//   } catch (err) {
//     console.error("Error saving tutorial:", err);
//   }
// };


// //   const handleEdit = (tutorial) => {
// //     setForm(tutorial);
// //     setEditId(tutorial._id);
// //   };
// const handleEdit = (tutorial) => {
//   // Only editable fields set karva (id alag thi rakhiye)
//   setForm({
//     title: tutorial.title,
//     desc: tutorial.desc,
//     icon: tutorial.icon,
//     link: tutorial.link,
//   });
//   setEditId(tutorial._id);
// };

// //   const handleDelete = async (id) => {
// //     await deleteTutorial(id);
// //     fetchTutorials();
// //   };
// const handleDelete = async (id) => {
//   const confirm = window.confirm("Are you sure you want to delete this tutorial?");
//   if (!confirm) return; // if user clicks Cancel, stop

//   try {
//     await deleteTutorial(id);
//     fetchTutorials();
//   } catch (err) {
//     console.error("Error deleting tutorial:", err);
//   }
// };


//   return (
//     <div className="admin-page">
//       <h1>Manage Tutorials</h1>

//       {/* Add/Edit Form */}
//       <form className="admin-form" onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Title"
//           value={form.title}
//           onChange={(e) => setForm({ ...form, title: e.target.value })}
//           required
//         />
//         <input
//           type="text"
//           placeholder="Description"
//           value={form.desc}
//           onChange={(e) => setForm({ ...form, desc: e.target.value })}
//           required
//         />
//         <input
//           type="text"
//           placeholder="Icon (e.g., FaHtml5)"
//           value={form.icon}
//           onChange={(e) => setForm({ ...form, icon: e.target.value })}
//         />
//         <input
//           type="text"
//           placeholder="Link (e.g., /tutorial/html)"
//           value={form.link}
//           onChange={(e) => setForm({ ...form, link: e.target.value })}
//         />
//         <button type="submit">{editId ? "Update" : "Add"} Tutorial</button>
//       </form>

//       {/* Tutorial List */}
//       <div className="admin-list">
//         {tutorials.map((t) => (
//           <div key={t._id} className="admin-card">
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

import { useEffect, useState } from "react";
import { getTutorials, addTutorial, updateTutorial, deleteTutorial } from "../services/api.js";
import "./ManageTutorial.css";

function ManageTutorial() {
  const [tutorials, setTutorials] = useState([]);
  const [form, setForm] = useState({ title: "", desc: "", icon: "", link: "" });
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false); // modal state

  useEffect(() => {
    fetchTutorials();
  }, []);

  const fetchTutorials = async () => {
    const res = await getTutorials();
    setTutorials(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await updateTutorial(editId, form);
      } else {
        await addTutorial(form);
      }
      setForm({ title: "", desc: "", icon: "", link: "" });
      setEditId(null);
      setShowModal(false); // close modal after submit
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
    });
    setEditId(tutorial._id);
    setShowModal(true); // open modal for edit
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this tutorial?");
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

      {/* Add Tutorial Button */}
      <button className="add-btn" onClick={() => { setForm({ title: "", desc: "", icon: "", link: "" }); setEditId(null); setShowModal(true); }}>
        ➕ Add Tutorial
      </button>

      {/* Modal */}
      {/* {showModal && (
        <div className="modal-overlay">
          <div className="modal">
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
              <div className="modal-actions">
                <button type="submit">{editId ? "Update" : "Add"}</button>
                <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )} */}

        {showModal && (
  <div className="modal-overlay">
    <div className="modal">
      <span className="modal-close" onClick={() => setShowModal(false)}>×</span>
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
        <div className="modal-actions">
          <button type="submit">{editId ? "Update" : "Add"}</button>
          <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
        </div>
      </form>
    </div>
  </div>
)}



      {/* Tutorial List */}
      <div className="admin-list">
        {tutorials.map((t) => (
          <div key={t._id} className="admin-card">
            <h3>{t.title}</h3>
            <p>{t.desc}</p>
            <small>{t.link}</small>
            <div className="actions">
              <button onClick={() => handleEdit(t)}>✏️ Edit</button>
              <button onClick={() => handleDelete(t._id)}>🗑️ Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageTutorial;
