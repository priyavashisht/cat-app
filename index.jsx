import React, { useState, useEffect } from 'react';
import { FiRefreshCw } from 'react-icons/fi';
import axios from 'axios';

const Home = () => {
  const [catData, setCatData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchRandomCat = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://api.thecatapi.com/v1/images/search?has_breeds=1');
      const catId = response.data[0].id;
      const catDetails = await axios.get(`https://api.thecatapi.com/v1/images/${catId}`);
      setCatData(catDetails.data);
    } catch (error) {
      console.error('Error fetching cat data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomCat();
  }, []);

  return (
    <div className="container">
      <h1>Random Cat</h1>
      {loading ? (
        <p>Loading...</p>
      ) : catData ? (
        <div className="cat-data">
          <img src={catData.url} alt={catData.breeds[0].name} />
          <h2>{catData.breeds[0].name}</h2>
          <p>{catData.breeds[0].description}</p>
          <button onClick={fetchRandomCat}>
            <FiRefreshCw />
            Get another cat
          </button>
        </div>
      ) : (
        <p>No cat data found.</p>
      )}
    </div>
  );
};

export default Home;