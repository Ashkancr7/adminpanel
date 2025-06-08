// pages/Dashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <iframe
        src="https://my-front-hecm.vercel.app/"
        className="w-full h-full"
        style={{ border: 'none' }}
        title="Embedded Web Page"
      />

      {/* دکمه بازگشت با z-index بالا */}
      <button
        onClick={() => navigate('/products')}
        className="fixed bottom-4 left-4 z-50 bg-indigo-600 text-white px-4 py-2 rounded-full shadow-md hover:bg-indigo-700 transition"
      >
        بازگشت به پنل
      </button>
    </div>
  );
};

export default Dashboard;
