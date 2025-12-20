import React, { useEffect, useState } from "react";
import axios from "axios";

const Storage = () => {
  const [storage, setStorage] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStorage = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/storage"
        );
        setStorage(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStorage();
  }, []);

  if (loading) {
    return <p>Loading storage data...</p>;
  }

  return (
    <div style={{ padding: 30 }}>
      <h1>🏬 Storage Availability</h1>

      {storage.map((s) => (
        <div
          key={s.crop}
          style={{
            border: "1px solid #ccc",
            padding: 15,
            marginBottom: 10,
          }}
        >
          <h3>{s.crop}</h3>
          <p>Location: {s.location}</p>
          <p>Capacity: {s.capacity} tons</p>
          <p>Used: {s.used} tons</p>
          <p><b>Available: {s.available} tons</b></p>
        </div>
      ))}
    </div>
  );
};

export default Storage;
