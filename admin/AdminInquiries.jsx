import { useEffect, useState } from "react";
import { getInquiries } from "../services/api";
import "./AdminInquiries.css";

function AdminInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getInquiries();
        setInquiries(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch inquiries");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p>Loading inquiries...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="admin-inquiries">
      <h1>Customer Inquiries</h1>
      {inquiries.length === 0 ? (
        <p>No inquiries yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((inq) => (
              <tr key={inq._id}>
                <td>{inq.name}</td>
                <td>{inq.email}</td>
                <td>{inq.message}</td>
                <td>{new Date(inq.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminInquiries;
