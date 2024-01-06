

import React, { useState } from 'react';

export default function GetData() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/movies', {
        method: 'GET',
      });

      if (response.ok) {
        const fetchedData = await response.json();
        setData(fetchedData);
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <h2>Fetched Data:</h2>
      <button onClick={fetchData}>Get Data</button>
      <ul>
        {data.map((document, index) => (
          <li key={index}>{`Email: ${document.email || 'N/A'}`}</li>
        ))}
      </ul>
      <ul>
        {data.map((document, index) => (
          <li key={index}>{`Email 2: ${document.email || 'N/A'}`}</li>
        ))}
      </ul>
    </div>
  );
}


