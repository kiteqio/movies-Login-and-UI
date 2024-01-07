import Head from 'next/head'
import { useState } from 'react';
import clientPromise from '../lib/mongodb'
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import GetData from './component/GetData';
import CheckEmail from './component/CheckData';
import Insertintomsgsdb from './component/Insertintomsgsdb';
import Readmsgs from './component/Readmsgs';
import CreateAccount from './component/CreateAccount';
import styles from './indexstyle.module.css';

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
export default function Home({
  isConnected,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [formData, setFormData] = useState({
    email: '',
    id: '',
  });

  const [toggle, setToggle] = useState();
  const [correctEmail, setCorrectEmail] = useState('');
  const [welcome, setWelcome] = useState(true);
  const [createAccount, setCreateAccount] = useState(false);
  const [login, setLogin] = useState(false);
  const [correctRoom, setCorrectRoom] = useState('Introduction'); // Set a default room
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>({ isConnected: false });
  const handleCorrectEmail = (email: string) => {
    setCorrectEmail(email);
    setCreateAccount(false); // Assuming you want to switch to another section after email validation
    setLogin(false); // Set login to true to render the login section
    setWelcome(false)
  };

  const handleRoomChange = (selectedRoom: string) => {
    setCorrectRoom(selectedRoom);
  };

  const handleMessageSubmit = (message: string) => {
    console.log(`Message submitted for ${correctEmail}: ${message}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container">
      <style jsx global>{`
        body {
          margin: 0px;
          padding: 0px;
          background-color: #1e1f22;
        }
        * {
          border: 2px solid purple;
          color: white;
          font-family: system-ui;
          font-weight: 100;
        }
      `}</style>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.MainContainer}>
        {welcome && (
          // Render components when welcome is true
          <div className={styles.welcomePage}>
            <button className={styles.welcomeButton} onClick={() => { setLogin(true); setWelcome(false); } }>Login</button>
            <button className={styles.welcomeButton} onClick={() => {setCreateAccount(true); setWelcome(false); }}>Create Account</button>
          </div>
        )}
        {createAccount && <CreateAccount isConnected={connectionStatus.isConnected} />}
        {login && <CheckEmail onCorrectEmail={handleCorrectEmail} />}

        {(!createAccount && !login && !welcome) && (
          <>
            
            {/* <h1>Correct Room 2: {correctRoom}</h1> */}
            <Readmsgs onRoomChange={handleRoomChange} />
            <Insertintomsgsdb correctEmail={correctEmail} correctRoom={correctRoom} isConnected={connectionStatus.isConnected} />
          </>
        )}
      </main>
    </div>
  );
}