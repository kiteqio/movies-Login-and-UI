import React, { useState } from 'react';

export default function CheckEmail() {
  const [formData, setFormData] = useState({
    email: '',
    id: ''
  });
  const [data, setData] = useState([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const fetchData = async () => {
    try {
      const response = await fetch('/api/movies', {
        method: 'GET',
      });

      if (response.ok) {
        const fetchedData = await response.json();
        setData(fetchedData);

        // Check if the email exists in the fetched data
        const emailExists = fetchedData.some(
          (document) => document.email === formData.email && document.id === formData.id
        );

        if (emailExists) {
          alert('Email exists combined with id');
        } else {
          alert('Email does not exist');
        }
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
      <button onClick={fetchData}>Check Email and Id</button>
     
      <form className="Form" onSubmit={(event) => event.preventDefault()}>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />

        <input
          type="text"
          name="id"
          value={formData.id}
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
