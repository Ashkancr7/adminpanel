import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const links = [
    { path: '/', label: 'داشبورد' },
    { path: '/products', label: 'لیست محصولات' },
    { path: '/products/add', label: 'افزودن محصول' },
    { path: '/categories', label: 'دسته‌بندی‌ها' },
  ];

  return (
    <aside className="w-64 min-h-screen bg-gradient-to-b from-blue-900 to-blue-700 text-white shadow-lg p-4">
      <h2 className="text-2xl font-bold mb-6 text-center border-b border-blue-400 pb-2">مدیریت فروشگاه</h2>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.path}>
            <Link
              to={link.path}
              className={`block py-2 px-4 rounded-lg transition-all duration-200 ${
                location.pathname === link.path
                  ? 'bg-white text-blue-900 font-semibold'
                  : 'hover:bg-blue-800'
              }`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
