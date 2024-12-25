'use client';

import React, { useEffect, useState } from 'react';

export default function LoginPage() {
  const [isVisible, setIsVisible] = useState(window.innerWidth >= 800);

  // Update visibility on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsVisible(window.innerWidth >= 800);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
          <form>
            <input type="text" placeholder="Username" style={inputStyle} />
            <input type="password" placeholder="Password" style={inputStyle} />
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
        </div>
      </div>
    </div>
  );
}
