import React, { useState, useEffect } from 'react';
import './Main.css';
import { registerUser, getUsers}  from '../services/usersService';

export default function Main() {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const [userList, setUserList] = useState([]);

  const handleSubmit = async e => {
    e.preventDefault();
    const { error } = await registerUser({ username, password });
    if (error) {
      setError(error)
    } else {
      setError("User created")
    }
  }

  const loadUsers = async e => {
    const { users } = await getUsers();
    setUserList(users)
  }

  useEffect(() => {
    loadUsers()
  },[]);

  return(
    <div className="wrapper">
      <div>
        <h2>Users</h2>
        <ul> 
        {userList.map((user, index) => (
          <li key={index}>{user}</li>
        ))}
        </ul>
      </div>
      <div className='registration-form'>
        <h2>Register new user</h2>
        <form onSubmit={handleSubmit}>
          <label>
            <p>Username</p>
            <input type="text" onChange={e => setUserName(e.target.value)}/>
          </label>
          <label>
            <p>Password</p>
            <input type="password" onChange={e => setPassword(e.target.value)}/>
          </label>
          <div>
            <button type="submit">Submit</button>
          </div>
          <div>
            <label>
              <p>{error}</p>
            </label>
          </div>
        </form>
      </div>
    </div>
  );
}