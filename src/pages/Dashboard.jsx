// pages/Dashboard.jsx
import React from 'react';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  return (
    <div className="p-6 text-right">

      <iframe
        src="https://my-front-hecm.vercel.app/"
        width="100%"
        height="500px"
        style={{ border: 'none' }}
        title="Embedded Web Page"
      />
    </div>
  );
};

export default Dashboard;
