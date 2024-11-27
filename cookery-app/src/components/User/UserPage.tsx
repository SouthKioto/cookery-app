import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { User } from '../Helpers/Interfaces';

export const UserPage = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    axios
      .get<User[]>('http://localhost:8081/users')
      .then(res => setUsers(res.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <>
      <h1>userPage</h1>

      <div>
        <table style={{ border: '1px solid black' }}>
          <tr style={{ border: '1px solid black' }}>
            <th>Id</th>
            <th>Name</th>
            <th>Surname</th>
            <th>Email</th>
            <th>Password</th>
          </tr>

          {users.map(user => (
            <tr key={user.id} style={{ border: '1px solid black' }}>
              <td>{user.id}</td>
              <td>{user.user_name}</td>
              <td>{user.user_surname}</td>
              <td>{user.user_email}</td>
              <td>{user.user_password}</td>
            </tr>
          ))}
        </table>
      </div>
    </>
  );
};
