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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const links = [
    { to: '/dashboard', label: 'داشبورد', icon: HomeIcon },
    { to: '/add-product', label: 'افزودن محصول', icon: PlusCircleIcon },
    { to: '/products', label: 'لیست محصولات', icon: ListBulletIcon },
    { to: '/user-table', label: 'لیست مشتری', icon: ListBulletIcon },
    { to: '/payments-table', label: 'لیست پرداخت', icon: ListBulletIcon },
    { to: '/orders', label: 'لیست سفارشها', icon: ListBulletIcon },
  ];

  return (
    <div dir="rtl" className="flex min-h-screen bg-gray-100 font-vazir">
      {/* موبایل - دکمه منو */}
      <div className="fixed top-4 right-4 md:hidden z-20">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-md bg-indigo-600 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? (
            <XMarkIcon className="w-6 h-6" />
          ) : (
            <Bars3Icon className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 right-0 h-full w-64 bg-white shadow-md p-6 space-y-8
          transform transition-transform duration-300 ease-in-out
          md:relative md:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}
          z-10
        `}
      >
        <h1 style={{ fontFamily: 'Vazir, sans-serif' }} className="text-2xl font-bold text-indigo-600 mb-4">
          پنل مدیریت
        </h1>
        <nav className="flex flex-col gap-4">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setSidebarOpen(false)} // بستن منو وقتی لینک زده شد (موبایل)
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

      {/* Main Content */}
      <main className="flex-1 p-6 md:mr-64">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
