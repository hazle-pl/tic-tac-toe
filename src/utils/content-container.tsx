import React from 'react';

interface ContentContainerProps {
  children: React.ReactNode;
}

const ContentContainer: React.FC<ContentContainerProps> = ({ children }) => (
  <div className="content-container">
    {children}
  </div>
);

export default ContentContainer;
