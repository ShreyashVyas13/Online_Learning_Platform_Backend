import { useState } from "react";
import './AdminTutorial.css'

function AdminTutorial() {
  const [form, setForm] = useState({
    title: "",
    desc: "",
    icon: "",
    link: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:5000/api/tutorials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    alert("Tutorial Added!");
    setForm({ title: "", desc: "", icon: "", link: "" });
  };

//   return (
//     <div style={{ padding: "2rem" }}>
//       <h2>Add New Tutorial</h2>
//       <form onSubmit={handleSubmit}>
//         <input placeholder="Title" value={form.title} 
//           onChange={(e) => setForm({ ...form, title: e.target.value })} /><br />
//         <input placeholder="Description" value={form.desc} 
//           onChange={(e) => setForm({ ...form, desc: e.target.value })} /><br />
//         <input placeholder="Icon (e.g. FaHtml5)" value={form.icon} 
//           onChange={(e) => setForm({ ...form, icon: e.target.value })} /><br />
//         <input placeholder="Link" value={form.link} 
//           onChange={(e) => setForm({ ...form, link: e.target.value })} /><br />
//         <button type="submit">Add Tutorial</button>
//       </form>
//     </div>
//   );
return (
    <div className="admin-container">
      <h2>Add New Tutorial</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Title" value={form.title} 
          onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <input placeholder="Description" value={form.desc} 
          onChange={(e) => setForm({ ...form, desc: e.target.value })} />
        <input placeholder="Icon (e.g. FaHtml5)" value={form.icon} 
          onChange={(e) => setForm({ ...form, icon: e.target.value })} />
        <input placeholder="Link" value={form.link} 
          onChange={(e) => setForm({ ...form, link: e.target.value })} />
        <button type="submit">Add Tutorial</button>
      </form>
    </div>
  );
}

export default AdminTutorial;
