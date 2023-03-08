import React, { useState } from 'react';
import './App.css';
import Main from './components/Main';
import Login from './components/Login';
import Navbar from './components/Navbar';
import useToken from './customHooks/useToken';

function App() {
  const { token, setToken } = useToken();

  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div>
      <Navbar userName={token.substring(5)}></Navbar>
      <Main></Main>
    </div>
  );
}

export default App;
