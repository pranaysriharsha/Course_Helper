'use client';

import React, { useState, useEffect } from 'react';
import axios from '../../components/axiosInstance';
import { useRouter } from 'next/navigation'; // Import from next/navigation
import Link from 'next/link';

export default function LoginPage() {
  const [isVisible, setIsVisible] = useState(false); // Initialize as false
  const [username, setUsername] = useState(''); // State to store username
  const [password, setPassword] = useState(''); // State to store password
  const [errorMessage, setErrorMessage] = useState(''); // State for error message
  const router = useRouter(); // Correct import

  // Check window width only on the client side
  useEffect(() => {
    const checkVisibility = () => {
      setIsVisible(window.innerWidth >= 800);
    };

    // Initial check
    checkVisibility();

    // Update visibility on window resize
    window.addEventListener('resize', checkVisibility);

    return () => {
      window.removeEventListener('resize', checkVisibility);
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('/auth/login', { username, password });

      if (response.data.accessToken) {
        localStorage.setItem('accessToken', response.data.accessToken);

        router.push('/'); // Redirect to home page
      } else {
        setErrorMessage('Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setErrorMessage('INVALID CREDENTIALS');
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '15px',
    marginBottom: '15px',
    boxSizing: 'border-box',
    fontSize: '1.2rem',
    border: '1px solid #ccc',
    borderRadius: '5px',
  };

  const buttonStyle = {
    width: '100%',
    padding: '15px',
    backgroundColor: 'blue',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1.2rem',
    borderRadius: '5px',
  };

  const formContainerStyle = {
    width: '100%',
    maxWidth: '500px',
    padding: '30px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'row',
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  };

  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    visibility: isVisible ? 'visible' : 'hidden', // Toggle visibility
  };

  return (
    <div style={containerStyle}>
      {/* Image container */}
      <div style={{ flex: 1 }}>
        <img
          src="course_helper_sticker.png"
          alt="Background"
          style={imageStyle}
        />
      </div>

      {/* Form container */}
      <div
        style={{
          flex: isVisible ? 1 : '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div style={formContainerStyle}>
          <h2>Login</h2>
          {errorMessage && <div style={{ color: 'red', marginBottom: '15px' }}>{errorMessage}</div>}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              style={inputStyle}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              style={inputStyle}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <input type="checkbox" id="rememberMe" />
              <label htmlFor="rememberMe" style={{ marginLeft: '5px' }}>
                Remember me
              </label>
            </div>
            <button type="submit" style={buttonStyle}>
              LOGIN
            </button>
          </form>
          <div style={{ marginTop: '15px', textAlign: 'center' }}>
            <Link href="/signup" style={{ color: 'blue', textDecoration: 'underline' }}>
              Don't have an account? Sign up here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
