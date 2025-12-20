import React, { useEffect, useState } from "react";
import axios from "axios";

const Marketplace = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMarketplace = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/marketplace");
        setItems(res.data);
      } catch (err) {
        setError("Failed to load marketplace data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMarketplace();
  }, []);

  if (loading) {
    return <p className="p-6">Loading marketplace...</p>;
  }

  if (error) {
    return <p className="p-6 text-red-500">{error}</p>;
  }

  // ✅ MAIN UI RETURN
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🛒 Marketplace</h1>

      {items.length === 0 ? (
        <p>No items available</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {items.map((item) => (
            <div
              key={item._id}
              className="border rounded-lg p-4 shadow"
            >
              <h3 className="font-semibold text-lg">{item.name}</h3>
              <p>Category: {item.category}</p>
              <p>Seller: {item.seller}</p>
              <p className="font-bold text-green-600">
                ₹{item.price}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ✅ EXPORT AT VERY END
export default Marketplace;

