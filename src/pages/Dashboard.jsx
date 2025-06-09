// pages/Dashboard.jsx
import React from 'react';
import { LogOut } from 'lucide-react';
import { href } from 'react-router-dom';

const Dashboard = () => {
  const stats = [
    { label: 'تعداد کاربران', value: 120, color: 'bg-blue-500' },
    { label: 'سفارشات امروز', value: 32, color: 'bg-green-500' },
    { label: 'پرداخت‌های موفق', value: 85, color: 'bg-indigo-500' },
    { label: 'محصولات موجود', value: 67, color: 'bg-yellow-500' },
  ];
  const removetoken = () => {
    localStorage.removeItem('admin_token');
    window.location.reload();
  }
  return (
    <div className="p-6 text-right font-vazir">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 text-center sm:text-right">
          داشبورد مدیریت
        </h1>

        <button
          onClick={() => removetoken()}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-800 rounded-lg transition duration-200 shadow-sm"
        >
          <span className="font-medium text-sm sm:text-base">خروج</span>
          <LogOut size={18} className="rotate-180" />
        </button>
      </div>



      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, index) => (
          <div
            key={index}
            className={`rounded-xl p-4 text-white shadow-md ${item.color}`}
          >
            <div className="text-sm">{item.label}</div>
            <div className="text-2xl font-bold mt-2">{item.value}</div>
          </div>
        ))}
      </div>

      <div className="mt-10 bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">آخرین فعالیت‌ها</h2>
        <ul className="text-sm space-y-2">
          <li>👤 کاربر جدید ثبت‌نام کرد</li>
          <li>📦 سفارش جدید ثبت شد</li>
          <li>💳 یک پرداخت موفق انجام شد</li>
          <li>🛠️ محصول جدید اضافه شد</li>
        </ul>
      </div>

    </div>
  );
};

export default Dashboard;
