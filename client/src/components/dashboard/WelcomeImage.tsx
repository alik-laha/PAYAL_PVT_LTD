import React from 'react';
import './WelcomeImage.css'; // Import the CSS file for styling
import wimage from './DashboardImage.jpg'

const WelcomeImage: React.FC = () => {
  return (
    <div className="welcome-container">
     
      <div className="welcome-content">
        <h1>Welcome </h1>
        <p>We're glad to have you here. Let's get started!</p>
        <span className='text-red-500 pt-6 text-2xl'>N.B : This is Beta Version Of Software. All the datas reflecting here are used for development and testing purposes only </span>

      </div>
      <div className="welcome-image">
        <img src={wimage} alt="Welcome" />
      </div>
    </div>
  );
};

export default WelcomeImage;