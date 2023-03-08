import React from 'react';
import './Navbar.css';
import PropTypes from 'prop-types';
import { logoutUser } from '../services/sessionService';

export default function Navbar({ userName }) {

  const handleLogout = () => {
    logoutUser()
  }

  return(
    <div className="navbar-wrapper">
      <h3>{userName}</h3>
      <button className="navbar-button" onClick={handleLogout}>Log out</button>
    </div>
  )
}

Navbar.propTypes = {
  userName: PropTypes.string.isRequired
}