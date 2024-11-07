import { useState } from 'react';
import './Settings.css';

const Settings = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handlePasswordUpdate = () => {
    // Basic validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      setMessage('All fields are required.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage('New passwords do not match.');
      return;
    }

    // Simulate a password update logic (you can replace this with an API call)
    // Here, you would call an API or use Tauri's invoke method to update the password.
    setMessage('Password updated successfully!');

    // Reset fields
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="settings-container">
      <h2>Update Password</h2>
      <div className="form-group">
        <label>Current Password</label>
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          placeholder="Enter current password"
        />
      </div>
      <div className="form-group">
        <label>New Password</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Enter new password"
        />
      </div>
      <div className="form-group">
        <label>Confirm New Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm new password"
        />
      </div>
      <button onClick={handlePasswordUpdate}>Update Password</button>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Settings;
