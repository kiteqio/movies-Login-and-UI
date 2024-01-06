import Head from 'next/head'
import { useState } from 'react';
import clientPromise from '../../lib/mongodb';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'

type ConnectionStatus = {
  isConnected: boolean
}

export const getServerSideProps: GetServerSideProps<
  ConnectionStatus
> = async () => {
  try {
    await clientPromise

    return {
      props: { isConnected: true },
    }
  } catch (e) {
    console.error(e)
    return {
      props: { isConnected: false },
    }
  }
}

export default function Insertintomsgsdb({
  isConnected,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
   
  const [formData, setFormData] = useState({
    email: '',
    message: '',
    room: 'message'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const formSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch('../api/insertmsgapi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Data inserted successfully');
      } else {
        console.error('Failed to insert data');
      }
    } catch (error) {
      console.error('Error inserting data:', error);
    }
  };


  
  return (
    <div className="container">
     
      <form className="Form" onSubmit={(event) => formSubmit(event)}>
         <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
         <input
              type="text"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
            />
           <select onChange={handleInputChange} name="room">
            <option value="message">message</option>
            <option value="Introduction">Introduction</option>
           </select>

          
        <input type="submit" value="Insert" />
      </form>

    </div>
  )
}
