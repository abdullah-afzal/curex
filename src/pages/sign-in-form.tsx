import { useState } from 'react';
import { invoke } from "@tauri-apps/api/core";
import './SignInForm.css';

function SignIn({ onSignIn }: { onSignIn: (role: string) => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignIn = async () => {
    try {
      const isAuthenticated = await invoke('sign_in', { username, password });
      if (isAuthenticated) {
        const userRole = username === "admin" ? "admin" : "general";
        onSignIn(userRole);
        setMessage("Sign-in successful!");
      } else {
        setMessage("Failed to sign in");
      }
    } catch (error) {
      console.log(error)
      setMessage('Error signing in');
    }
  };

  return (
    <div className="sign-in-container">
      <div className="sign-in-form">
        <h2>Sign In to your CureX account</h2>
        
        {/* Username input field */}
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />

        {/* Password input field */}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />

        {/* Sign In button */}
        <button onClick={handleSignIn}>Sign In</button>

        {/* Message display */}
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default SignIn;
