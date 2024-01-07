

import React, { useState } from 'react';
import styles from './CheckData.module.css';
interface CheckEmailProps {
  onCorrectEmail: (email: string) => void;
}

// Define the DocumentType interface
interface DocumentType {
  email: string;
  id: string;
  // other properties...
}

export default function CheckEmail({ onCorrectEmail }: CheckEmailProps) {
  const [formData, setFormData] = useState({
    email: '',
    id: ''
  });
  const [data, setData] = useState([]);
  const [toggle, setToggle] = useState(false);

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
        // Your component code
const emailExists = fetchedData.some((document: DocumentType) =>
document.email === formData.email && document.id === formData.id
);

        if (emailExists) {
          alert('Email and Id matched');
          setToggle(true);
          onCorrectEmail(formData.email); // Send correct email to parent
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
     
      
      <form className={styles.Form} onSubmit={(event) => event.preventDefault()}>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className={styles.StyleInput}
        />

        <input
          type="text"
          name="id"
          value={formData.id}
          onChange={handleInputChange}
          className={styles.StyleInput}
        />
        <button className={styles.SignupButton} onClick={fetchData}>Login</button>
      </form>
      
    </div>
  );
}
