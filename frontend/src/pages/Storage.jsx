import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../config/api";   // adjust path if needed

const Storage = () => {
  const [storage, setStorage] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStorage = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(`${API_URL}/api/storage`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setStorage(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load storage data. Please login again.");
      } finally {
        setLoading(false);
      }
    };

    fetchStorage();
  }, []);

  if (loading) return <p>Loading storage data...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: 30 }}>
      <h1>🏬 Storage Availability</h1>

      {storage.length === 0 && <p>No storage data found.</p>}

      {storage.map((s) => (
        <div
          key={s._id || s.crop}
          style={{
            border: "1px solid #ccc",
            padding: 15,
            marginBottom: 10,
            borderRadius: 6,
          }}
        >
          <h3>{s.crop}</h3>
          <p>Location: {s.location}</p>
          <p>Capacity: {s.capacity} tons</p>
          <p>Used: {s.used} tons</p>
          <p>
            <b>Available: {s.available} tons</b>
          </p>
        </div>
      ))}
    </div>
  );
};

export default Storage;

