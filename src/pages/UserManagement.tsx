import React, { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/core';
import './UserManagement.css';
import 'font-awesome/css/font-awesome.min.css';

interface User {
  username: string;
  role: string;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [newUsername, setNewUsername] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('pass123');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch the existing users when the component mounts
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const users = await invoke('get_users');
      //@ts-ignore
      setUsers(users);
    } catch (error) {
      console.log(error);
      setMessage('Error fetching users');
    }
  };
  console.log(users)

  const handleDeleteUser = async (username: string) => {
    try {
      const confirmed = window.confirm(`Are you sure you want to delete the user ${username}?`);
      if (confirmed) {
        await invoke('delete_user', { username });
        fetchUsers();
        setMessage('User deleted successfully');
      }
    } catch (error) {
      console.log(error);
      setMessage('Error deleting user');
    }
  };

  const handleAddUser = async () => {
    try {
      if (newUsername && newUserPassword) {
        await invoke('create_user', { username: newUsername, role: "user", password: newUserPassword });
        fetchUsers(); // Refresh the users list after adding a new user
        setMessage('User created successfully');
        setNewUsername('');
        setNewUserPassword('pass123');
      } else {
        setMessage('Please provide username');
      }
    } catch (error) {
      console.log(error);
      setMessage('Error creating user');
    }
  };

  return (
    <div className="user-management">
      <h2>User Management</h2>

      {/* Message display */}
      {message && <p className="message">{message}</p>}

      {/* Form to add a new user */}
      <div className="add-user-form">
        <h3>Create New User</h3>
        <input
          type="text"
          placeholder="Username"
          style={{margin:10}}
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="password"
          value={newUserPassword}
          disabled
          onChange={(e) => setNewUserPassword(e.target.value)}
        />
        <button onClick={handleAddUser}>Create User</button>
      </div>

      {/* Display users list */}
      <div className="user-list" style={{borderStyle: "dotted", marginTop: 20, padding: 10}}>
      <h3>Existing Users</h3>
      {users.length > 0 ? (
        <table className="user-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.username}</td>
                <td>{user.role}</td>
                <td>
                  {/* Only show delete button if user is not admin */}
                  {user.role !== 'admin' && (
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteUser(user.username)}
                    >
                      <i className="fa fa-trash"></i>
                    </button>
                    
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users found</p>
      )}
      </div>
    </div>
  );
};

export default UserManagement;
