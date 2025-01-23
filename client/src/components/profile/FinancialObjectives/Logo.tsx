import React from 'react';
import './Logo.css';

interface LogoProps {
  title?: string;
}

export const Logo: React.FC<LogoProps> = ({ 
  title = "Super iUPi, para que podamos ofrecerte las mejores recomendaciones de inversión, necesitamos conocer tus aspiraciones financieras. ¿Nos contás un poco más?"
}) => {
  return (
    <div className="logo-container">
      <div className="logo-content">
        <div className="logo-icons">
          <div className="dot-small">
            <img src="https://dashboard.codeparrot.ai/api/image/Z5IyxfA8XwfbJP9H/vector-9.png" alt="Small dot" />
          </div>
          <div className="dot-medium">
            <img src="https://dashboard.codeparrot.ai/api/image/Z5IyxfA8XwfbJP9H/vector-1.png" alt="Medium dot" />
          </div>
          <div className="dot-large">
            <img src="https://dashboard.codeparrot.ai/api/image/Z5IyxfA8XwfbJP9H/vector-1-2.png" alt="Large dot" />
          </div>
          <div className="logo-image">
            <img src="https://dashboard.codeparrot.ai/api/image/Z5IyxfA8XwfbJP9H/frame-42.png" alt="Logo" />
          </div>
        </div>
        <div className="title-text">
          {title}
        </div>
      </div>
    </div>
  );
};

export default Logo;