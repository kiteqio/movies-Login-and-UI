import React, { useState } from 'react';
import styles from './Readmsgs.module.css';

interface ReadmsgsProps {
  onRoomChange: (selectedRoom: string) => void;
}

export default function Readmsgs({ onRoomChange }: ReadmsgsProps) {
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

  const handleRoomChange = (selectedRoom: string) => {
    setRoom(selectedRoom);
    fetchData();
    onRoomChange(selectedRoom);
  };

  return (
    <div className={styles.bodyContainer}>
      <div className={styles.menuContainer}>
        <p className={styles.roomTitle} onClick={() => handleRoomChange('Introduction')}>Introduction</p>
        <p className={styles.roomTitle} onClick={() => handleRoomChange('message')}>message</p>
      </div>
      {/* <button onClick={fetchData}>Get Messages</button> */}

      <div className={styles.parentMessages}>
        {data.map((document, index) => (
          <div className={styles.messageparentContainer} key={index}>
            <div className={styles.profileContainer}>
              <div className={styles.profilePic}></div>
            </div>
            <div className={styles.messageContainer}>
              <div className={styles.messageview} >
            <div className={styles.email}>{` ${document.email || 'N/A'}`}</div>
              <div className={styles.message}>{`${document.message || 'N/A'}`}</div>
            </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
