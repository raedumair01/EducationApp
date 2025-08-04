import React, { createContext, useContext, useState } from 'react';

const HomeContext = createContext();

export const HomeProvider = ({ children }) => {
  const [userName, setUserName] = useState('');
  const [pendingTests, setPendingTests] = useState(4);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [userImage, setUserImage] = useState(null); 
  const [announcements] = useState([
    'New Chapter Added: Algebra - Practice Now!',
    'Live Session on Friday at 5 PM',
    'Update: Test Timings Changed for Science',
  ]);

  const [upcomingTests] = useState([
    { id: 1, title: 'Trigonometry Quiz', subject: 'Mathematics', deadline: 'Thu, 18 July' },
    { id: 2, title: 'Periodic Table Test', subject: 'Chemistry', deadline: 'Fri, 19 July' },
  ]);

  return (
    <HomeContext.Provider
      value={{
        userName, setUserName,
        email, setEmail,
        firstName, setFirstName,
        lastName, setLastName,
        phone, setPhone,
        userImage, setUserImage,
        pendingTests, setPendingTests,
        announcements,
        upcomingTests,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};

export const useHomeContext = () => useContext(HomeContext);
