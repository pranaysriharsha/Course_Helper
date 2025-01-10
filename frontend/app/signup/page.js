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
        const response = await axios.post('/auth/register', { username, password });
      
        // Check if registration was successful (status 201)
        if (response.status === 201) {
          router.push('/login'); // Redirect to login page
        } else if (response.status === 400) {
          setErrorMessage('User already exists'); // Display error if the user already exists
        }else{
            setErrorMessage('Something went wrong. Please try again later.');
        }
      } catch (error) {
        console.error('Error registering user:', error);
        setErrorMessage('An error occurred. Please try again later.'); // Display a generic error message
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
          <h2>Sign Up</h2>
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
              Sign Up
            </button>
          </form>
          <div style={{ marginTop: '15px', textAlign: 'center' }}>
            <Link href="/login" style={{ color: 'blue', textDecoration: 'underline' }}>
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
