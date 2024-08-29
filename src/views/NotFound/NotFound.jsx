import React from 'react';
import Navbar from 'views/navbar/nav';

export const NotFound = () => {
return (
    <>
      <Navbar />
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: 'calc(100vh - 60px)',
        textAlign: 'center'
      }}>
        <h2> Error (404) </h2>
        <h2>Woah Woah Woah... Compass is not working here buddy!</h2>
        <p>The page you are looking for does not exist. Verify the link provided and try again!</p>
        <img
          width="100%"
          height="auto"
          alt="lost"
          src="http://localhost:3001/assets/giphy.webp"
          style={{ maxWidth: '600px', borderRadius: "0.75rem" }}
        />
      </div>
    </>
  )
}