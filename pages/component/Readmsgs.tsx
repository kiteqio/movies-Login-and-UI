

// import React, { useState } from 'react';

// export default function Readmsgs() {
//   const [data, setData] = useState([]);

//   const fetchData = async () => {
//     try {
//       const response = await fetch('../api/insertmsgapi', {
//         method: 'GET',
//       });

//       if (response.ok) {
//         const fetchedData = await response.json();
//         setData(fetchedData);
//       } else {
//         console.error('Failed to fetch data');
//       }
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Fetched Data:</h2>
//       <button onClick={fetchData}>Get Messages</button>
//       <ul>
//         {data.map((document, index) => (
//           <li key={index}>{`Email: ${document.email || 'N/A'}`}</li>
//         ))}
//       </ul>
//       <ul>
//         {data.map((document, index) => (
//           <li key={index}>{`Message: ${document.message || 'N/A'}`}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }


import React, { useState } from 'react';

export default function Readmsgs() {
  const [data, setData] = useState([]);
  const [room, setRoom] = useState('Introduction'); // Set a default room

  const fetchData = async () => {
    try {
      const response = await fetch(`../api/insertmsgapi?room=${room}`, {
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
      <label>
        Select Room:
        <select value={room} onChange={(e) => setRoom(e.target.value)}>
          <option value="message">message</option>
          <option value="Introduction">Introduction</option>
          {/* Add more room options as needed */}
        </select>
      </label>
      <button onClick={fetchData}>Get Messages</button>
      <ul>
        {data.map((document, index) => (
          <li key={index}>{`Email: ${document.email || 'N/A'}`}</li>
        ))}
      </ul>
      <ul>
        {data.map((document, index) => (
          <li key={index}>{`Message: ${document.message || 'N/A'}`}</li>
        ))}
      </ul>
    </div>
  );
}
