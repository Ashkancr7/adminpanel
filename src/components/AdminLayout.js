// src/components/AdminLayout.js
import { useLocation } from 'react-router-dom';
import { Outlet, NavLink } from 'react-router-dom';
import { useState } from 'react';
import {
  HomeIcon,
  PlusCircleIcon,
  ListBulletIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/solid';

const AdminLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // اگر در مسیر داشبورد بود، فقط محتوای اصلی رو نشون بده
  if (location.pathname === '/dashboard') {
    return (
      <div className="w-screen h-screen">
        <Outlet />
      </div>
    );
  }

  const links = [
    { to: '/dashboard', label: 'داشبورد', icon: HomeIcon },
    { to: '/add-product', label: 'افزودن محصول', icon: PlusCircleIcon },
    { to: '/products', label: 'لیست محصولات', icon: ListBulletIcon },
    { to: '/user-table', label: 'لیست مشتری', icon: ListBulletIcon },
    { to: '/payments-table', label: 'لیست پرداخت', icon: ListBulletIcon },
    { to: '/orders', label: 'لیست سفارشها', icon: ListBulletIcon },
  ];

  return (
    <div dir="rtl" className="flex flex-col md:flex-row min-h-screen bg-gray-100 font-vazir relative">
      {/* موبایل منو */}
      <div className="md:hidden bg-white shadow p-4 flex justify-between items-center z-20">
        <h1 className="text-lg font-bold text-indigo-600">پنل مدیریت</h1>
        <button onClick={() => setIsOpen(!isOpen)} className="p-1 rounded text-indigo-600">
          {isOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
        </button>
      </div>

      {/* سایدبار با انیمیشن */}
      <aside
        className={`
          fixed top-0 right-0 h-full w-64 bg-white shadow-md p-6 space-y-8 z-30
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
          md:relative md:translate-x-0 md:block hidden
        `}
      >
        <h1 className="text-2xl font-bold text-indigo-600 hidden md:block">پنل مدیریت</h1>
        <nav className="flex flex-col gap-4">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded-md ${
                  isActive
                    ? 'bg-indigo-100 text-indigo-700 font-semibold'
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* اوت‌لت + محتوای اصلی */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-10 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <main className="flex-1 p-6 md:mr-64">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
