// src/pages/EditTutorial.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTutorialById, updateTutorial } from "../services/api";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import 'quill/dist/quill.core.css';
import 'highlight.js/styles/github.css';


hljs.configure({ languages: ["javascript", "html", "css", "python"] });

function EditTutorial() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    desc: "",
    icon: "",
    link: "",
    sections: [{ title: "", content: "" }],
  });

  useEffect(() => {
    const fetchTutorial = async () => {
      try {
        const res = await getTutorialById(id);
        setForm(res.data);
      } catch (err) {
        console.error("Error fetching tutorial:", err);
      }
    };
    fetchTutorial();
  }, [id]);

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
      await updateTutorial(id, form);
      navigate("/manage-tutorial"); // redirect after saving
    } catch (err) {
      console.error("Error updating tutorial:", err);
    }
  };

  return (
    <div className="edit-tutorial">
      <h1>Edit Tutorial</h1>
      <form onSubmit={handleSubmit}>
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
          placeholder="Icon"
          value={form.icon}
          onChange={(e) => setForm({ ...form, icon: e.target.value })}
        />
        <input
          type="text"
          placeholder="Link"
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
              onChange={(e) => handleSectionChange(i, "title", e.target.value)}
              required
            />
            <ReactQuill
              theme="snow"
              value={s.content}
              onChange={(value) => handleSectionChange(i, "content", value)}
            />
            <div
              className="content"
              dangerouslySetInnerHTML={{ __html: s.content }}
            />
            {form.sections.length > 1 && (
              <button
                type="button"
                onClick={() => {
                  const updated = form.sections.filter((_, idx) => idx !== i);
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
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default EditTutorial;
