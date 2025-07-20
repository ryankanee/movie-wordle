// app/components/PosterTest.js

import { useState, useEffect } from "react";

export const PosterTest = () => {
  const [testPoster, setTestPoster] = useState(null);
  const [loading, setLoading] = useState(false);

  const testMovie = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/search-movie?query=Avatar&year=2009");
      const data = await response.json();
      setTestPoster(data.poster_url);
    } catch (error) {
      console.error("Test failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", border: "1px solid #ccc", margin: "10px" }}>
      <h3>Poster Test</h3>
      <button onClick={testMovie} disabled={loading}>
        {loading ? "Loading..." : "Test Avatar Poster"}
      </button>

      {testPoster && (
        <div style={{ marginTop: "10px" }}>
          <p>Poster URL: {testPoster}</p>
          <img
            src={testPoster}
            alt="Avatar poster test"
            style={{ width: "150px", height: "auto" }}
            onLoad={() => console.log("Test poster loaded successfully!")}
            onError={(e) => console.log("Test poster failed to load:", e)}
          />
        </div>
      )}
    </div>
  );
};
