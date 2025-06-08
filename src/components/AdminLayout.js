// src/components/AdminLayout.js
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
    <div dir="rtl" className="flex min-h-screen bg-gray-100 font-vazir">
      {/* Sidebar */}
      <aside className={`fixed top-0 right-0 z-40 w-64 bg-white shadow-md p-6 h-full transition-transform transform lg:translate-x-0 ${menuOpen ? 'translate-x-0' : 'translate-x-full'} lg:static lg:block`}>
        <div className="flex items-center justify-between mb-8 lg:hidden">
          <h1 className="text-xl font-bold text-indigo-600">پنل مدیریت</h1>
          <button onClick={() => setMenuOpen(false)}>
            <XMarkIcon className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <h1 className="hidden lg:block text-2xl font-bold text-indigo-600 mb-6">پنل مدیریت</h1>
        <nav className="flex flex-col gap-4">
          {navItems.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded-md transition ${
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

      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setMenuOpen(true)}
        className="fixed top-4 right-4 z-50 p-2 rounded-md bg-indigo-600 text-white shadow-lg lg:hidden"
      >
        <Bars3Icon className="w-6 h-6" />
      </button>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:ml-64">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
