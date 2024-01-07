import React, { useState } from 'react';

// Define the DocumentType interface
interface DocumentType {
  email: string;
  // other properties...
}

export default function GetData() {
  const [data, setData] = useState<DocumentType[]>([]); // Specify the type for the data state

  const fetchData = async () => {
    try {
      const response = await fetch('/api/movies', {
        method: 'GET',
      });

      if (response.ok) {
        const fetchedData: DocumentType[] = await response.json(); // Specify the type for fetchedData
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
      <button onClick={fetchData}>Show User Information</button>
      <ul>
        {data.map((document, index) => (
          <li key={index}>{`Email: ${document.email || 'N/A'}`}</li>
        ))}
      </ul>
      {/* You can continue using the DocumentType interface for other parts of your code */}
    </div>
  );
}
