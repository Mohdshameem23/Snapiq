import React, { useEffect, useState } from 'react';

const App = () => {
  const [search, setSearch] = useState('');
  const [image, setImage] = useState('');

  const searchImage = async () => {
    if (!search.trim()) return;

    try {
      const res = await fetch(
        `https://api.pexels.com/v1/search?query=${search}&per_page=1`,
        {
          headers: {
            Authorization: import.meta.env.VITE_API_KEY
          }
        }
      );

      const data = await res.json();

      if (data.photos.length > 0) {
        setImage(data.photos[0].src.medium);
      } else {
        setImage('');
      }

    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      searchImage();
    }, 500);   // ✅ better debounce

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div style={{ padding: "20px" }}>
      <input
        placeholder="Enter animal name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div style={{ marginTop: "20px" }}>
        {image ? (
          <img src={image} alt="result" />
        ) : (
          search && <p>No image found</p>
        )}
      </div>
    </div>
  );
};

export default App;