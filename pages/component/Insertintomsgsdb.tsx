import Head from 'next/head'
import { useState } from 'react';
import clientPromise from '../../lib/mongodb';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import styles from './Insertintomsgsdb.module.css';


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

interface InsertintomsgsdbProps {
  correctEmail: string;
  correctRoom: string;
  isConnected: boolean;
}
export default function Insertintomsgsdb({
  correctEmail,
  correctRoom,
  isConnected,
}: InsertintomsgsdbProps) {
  const [formData, setFormData] = useState({
    email: correctEmail,
    message: '',
    room: correctRoom
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
      const dataToSend = {
        email: correctEmail,
        message: formData.message,
        room: correctRoom
      };
  
      const response = await fetch('../api/insertmsgapi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });
  
      if (response.ok) {
        console.log('Data inserted successfully');
        console.log(dataToSend);
      } else {
        console.error('Failed to insert data');
      }
    } catch (error) {
      console.error('Error inserting data:', error);
    }
  };
  
  return (
    <div className={styles.FormsendContainer}>
      <form className={styles.formsend} onSubmit={(event) => formSubmit(event)}>
        <div className={styles.RoomsContainer}>
          <input
            type="text"
            name="room"
            value={correctRoom}
            readOnly // Make it read-only to prevent user input
            className={styles.inputemail}
          />
        </div>
        <input
          type="text"
          name="email"
          value={correctEmail}
          readOnly // Make it read-only to prevent user input
          className={styles.inputemail}
        />
        <div className={styles.sendContainer}>
          <input
            type="text"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            className={styles.sendElement}
          />
          {/* <p>correct {correctRoom} </p> */}
          <input className={styles.sendButton} type="submit" value=">" />
        </div>
      </form>
    </div>
  );
  
}
