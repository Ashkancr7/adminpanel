// src/components/AdminLayout.js
import { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import {
  HomeIcon,
  PlusCircleIcon,
  ListBulletIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/solid';

const AdminLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { to: '/dashboard', label: 'داشبورد', icon: HomeIcon },
    { to: '/add-product', label: 'افزودن محصول', icon: PlusCircleIcon },
    { to: '/products', label: 'لیست محصولات', icon: ListBulletIcon },
    { to: '/user-table', label: 'لیست مشتری', icon: ListBulletIcon },
    { to: '/payments-table', label: 'لیست پرداخت', icon: ListBulletIcon },
    { to: '/orders', label: 'لیست سفارشها', icon: ListBulletIcon },
  ];

  return (
    <div dir="rtl" className="flex flex-col md:flex-row min-h-screen bg-gray-100 font-vazir">
      {/* دکمه منو برای موبایل */}
      <div className="md:hidden bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-lg font-bold text-indigo-600">پنل مدیریت</h1>
        <button onClick={() => setIsOpen(!isOpen)} className="p-1 rounded text-indigo-600">
          {isOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
        </button>
      </div>

      {/* سایدبار */}
      <aside
        className={`${
          isOpen ? 'block' : 'hidden'
        } md:block bg-white w-full md:w-64 shadow-md p-6 space-y-8 z-20 md:relative absolute right-0 top-0 h-full md:h-auto`}
      >
        <h1 className="text-2xl font-bold text-indigo-600 hidden md:block">پنل مدیریت</h1>
        <nav className="flex flex-col gap-4">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setIsOpen(false)} // بسته شدن منو در موبایل
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

      {/* محتوای اصلی */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
