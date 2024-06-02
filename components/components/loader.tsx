import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="loader">
        <div className="spinner"></div>
      </div>
    </div>
  );
};

export default Loading;
