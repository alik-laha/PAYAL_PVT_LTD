import React from 'react';
import './WelcomeImage.css'; // Import the CSS file for styling
import wimage from './DashboardImage.jpg'

const WelcomeImage: React.FC = () => {
  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <h1>Welcome to Our Dashboard</h1>
        <p>We're glad to have you here. Let's get started!</p>
      </div>
      <div className="welcome-image">
        <img src={wimage} alt="Welcome" />
      </div>
    </div>
  );
};

export default WelcomeImage;