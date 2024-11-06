import React from 'react';

interface InfoPanelProps {
  attempts: number;
  currentLevel: number;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ attempts, currentLevel }) => {
  return (
    <>
      <div>Network Traffic Monitor</div>
      <div>Login Attempts: {attempts}</div>
      <div>Status: Monitoring</div>
    </>
  );
};

export default InfoPanel;