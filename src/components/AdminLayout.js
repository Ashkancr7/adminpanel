// src/components/AdminLayout.jsx
import { Outlet, NavLink } from 'react-router-dom';
import {
  HomeIcon,
  PlusCircleIcon,
  ListBulletIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/solid';
import { useState } from 'react';

const AdminLayout = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { to: '/dashboard', label: 'داشبورد', icon: <HomeIcon className="w-5 h-5" /> },
    { to: '/add-product', label: 'افزودن محصول', icon: <PlusCircleIcon className="w-5 h-5" /> },
    { to: '/products', label: 'لیست محصولات', icon: <ListBulletIcon className="w-5 h-5" /> },
    { to: '/user-table', label: 'لیست مشتری‌ها', icon: <ListBulletIcon className="w-5 h-5" /> },
    { to: '/payments-table', label: 'لیست پرداخت‌ها', icon: <ListBulletIcon className="w-5 h-5" /> },
    { to: '/orders', label: 'سفارش‌ها', icon: <ListBulletIcon className="w-5 h-5" /> },
  ];

  return (
    <div dir="rtl" className="min-h-screen flex bg-gray-100 font-vazir relative">
      {/* پس‌زمینه تار در موبایل وقتی منو بازه */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 lg:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* دکمه باز کردن منو در موبایل */}
      {!menuOpen && (
        <button
          onClick={() => setMenuOpen(true)}
          className="absolute top-4 right-4 z-50 bg-indigo-600 text-white p-2 rounded lg:hidden"
        >
          <Bars3Icon className="w-3 h-3" />
        </button>
      )}

      {/* سایدبار */}
      <aside
        className={`fixed top-0 right-0 z-40 w-64 h-full bg-white shadow-md p-6 transition-transform duration-300 lg:static lg:translate-x-0 ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* دکمه بستن در موبایل */}
        <div className="flex justify-between items-center mb-6 lg:hidden">
          <h2 className="text-lg font-bold text-indigo-600">پنل مدیریت</h2>
          <button onClick={() => setMenuOpen(false)}>
            <XMarkIcon className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <h1 className="hidden lg:block text-2xl font-bold text-indigo-600 mb-6">پنل مدیریت</h1>

        <nav className="flex flex-col gap-3">
          {navItems.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)} // بستن منو بعد از کلیک در موبایل
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded-md ${
                  isActive
                    ? 'bg-indigo-100 text-indigo-700 font-semibold'
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              {icon}
              {label}
              
            </NavLink>
          ))}
         
        </nav>
      </aside>

      {/* محتوای اصلی */}
      <main className="flex-1 p-4 lg:ml-64 overflow-auto min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
