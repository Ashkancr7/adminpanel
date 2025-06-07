// src/components/AdminLayout.js
import { Outlet, NavLink } from 'react-router-dom';
import {
  HomeIcon,
  PlusCircleIcon,
  ListBulletIcon,
} from '@heroicons/react/24/solid';

const AdminLayout = () => {
  return (
    <div dir="rtl" className="flex min-h-screen bg-gray-100 font-vazir">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 space-y-8">
        <h1 style={{fontFamily:'Vazir, sans-serif'}} className="text-2xl font-bold text-indigo-600 mb-4">پنل مدیریت</h1>
        <nav className="flex flex-col gap-4">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded-md ${
                isActive ? 'bg-indigo-100 text-indigo-700 font-semibold' : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            <HomeIcon className="w-5 h-5" />
            داشبورد
          </NavLink>
          <NavLink
            to="/add-product"
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded-md ${
                isActive ? 'bg-indigo-100 text-indigo-700 font-semibold' : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            <PlusCircleIcon className="w-5 h-5" />
            افزودن محصول
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded-md ${
                isActive ? 'bg-indigo-100 text-indigo-700 font-semibold' : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            <ListBulletIcon className="w-5 h-5" />
            لیست محصولات
          </NavLink>
          <NavLink
            to="/user-table"
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded-md ${
                isActive ? 'bg-indigo-100 text-indigo-700 font-semibold' : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            <ListBulletIcon className="w-5 h-5" />
             لیست مشتری
          </NavLink>
          <NavLink
            to="/payments-table"
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded-md ${
                isActive ? 'bg-indigo-100 text-indigo-700 font-semibold' : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            <ListBulletIcon className="w-5 h-5" />
             لیست پرداخت
          </NavLink>
           <NavLink
            to="/orders"
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded-md ${
                isActive ? 'bg-indigo-100 text-indigo-700 font-semibold' : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            <ListBulletIcon className="w-5 h-5" />
             لیست سفارشها
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout