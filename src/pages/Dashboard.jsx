// pages/Dashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen relative">
      <iframe
        src="https://my-front-hecm.vercel.app/"
        className="w-full h-full"
        style={{ border: 'none' }}
        title="Embedded Web Page"
      />

      {/* دکمه برگشت به پنل مدیریت */}
      <button
        onClick={() => navigate('/products')}
        className="absolute bottom-4 left-4 bg-indigo-600 text-white px-4 py-2 rounded-full shadow-md hover:bg-indigo-700 transition"
      >
        بازگشت به پنل
      </button>
    </div>
  );
};

export default Dashboard;
